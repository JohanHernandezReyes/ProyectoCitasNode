import { DeleteInfoError, PatientCreationError, RecordNotFoundError, UpdateInfoError } from '../../../config/customErrors';
import {Paciente, newPaciente} from './model';
import { PacienteRepository } from './repository';
import logger from '../../../utils/logger';

export interface PatientService{
    //getAllPatients():Paciente[];
    getAllPatients():Promise<Paciente[]>;
    //createPatient(patientReq:newPaciente):Paciente;
    createPatient(patientReq:newPaciente):Promise<Paciente>;

    GetPatientById(id:number):Promise<Paciente>;
    UpdatePatient(id:number, updates:Partial<newPaciente>):Promise<Paciente>;
    DeletePatient(id:number):Promise<void>;
}

export class PatientServiceImp implements PatientService{

    private patientRepository: PacienteRepository;

    constructor(PacienteRepo:PacienteRepository){
        this.patientRepository = PacienteRepo;
    }

    /*public getAllPatients(): Paciente[] {      
        const pacientes = [
            {id_paciente:1, nombre:'Matias', apellido:'Hernandez', identif:'1022222924', telefono:3123010050, createdAt:new Date()},
            {id_paciente:2, nombre:'Ana', apellido:'Reyes', identif:'39537569', telefono:3144756032, createdAt:new Date()},
            {id_paciente:3, nombre:'Juan David', apellido:'Avendaño', identif:'1023456789', createdAt:new Date()}
        ]
        return pacientes;
    }*/

    public async getAllPatients(): Promise<Paciente[]> {      
        const pacientes:Promise<Paciente[]> = this.patientRepository.queryPatients();
        return pacientes;
    }


    /*public createPatient(patientReq:newPaciente):Paciente{ 
        const Paciente:Paciente = {
            id_paciente:4,
            nombre: patientReq.nombre,
            apellido: patientReq.apellido,
            identif: patientReq.identif,
            telefono: patientReq.telefono,
            createdAt: patientReq.createdAt

        };
        return Paciente;
    }*/

    public async createPatient(patientReq:newPaciente):Promise<Paciente>{
        try{
            patientReq.created_at = new Date();
            const Paciente:Promise<Paciente>=this.patientRepository.createPatient(patientReq);
            return Paciente; 
        }catch(error){
            throw new PatientCreationError(`${error}`);
        }
    }

    public async GetPatientById(id:number):Promise<Paciente>{
        try{
            const PacienteX:Promise<Paciente> = this.patientRepository.GetPatientById(id);
            return PacienteX;
        }catch(error){
            throw new RecordNotFoundError(`${error}`);
        }
    } 

    public async UpdatePatient(id:number, updates:Partial<newPaciente>):Promise<Paciente>{
        try{
            const ExistPatient:Promise<Paciente> = this.patientRepository.GetPatientById(id);
            if(!ExistPatient){
                throw new RecordNotFoundError("No existe el Id en la base de datos");
            }else{
                updates.updated_at = new Date(); 
                const updatedPatient = {...ExistPatient, ...updates};
                this.patientRepository.UpdatePatient(id, updatedPatient);
                return updatedPatient;
            }    
        }catch(error){
            logger.error(error.message);
            throw new UpdateInfoError(`${error}`);
        }
    } 

    public async DeletePatient(id:number):Promise<void>{
        try{
            const ExistPatient:Promise<Paciente> = this.patientRepository.GetPatientById(id);
            if(!ExistPatient){
                throw new RecordNotFoundError("No existe el Id en la base de datos");
            }else{
                this.patientRepository.DeletePatient(id);
            }    
        }catch(error){
            logger.error(error.message);
            throw new DeleteInfoError(`${error}`);
        }
    } 
}
