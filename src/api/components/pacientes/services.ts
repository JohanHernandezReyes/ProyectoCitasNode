import {Paciente, newPaciente} from './model';
import { PacienteRepository } from './repository';

export interface PatientService{
    //getAllPatients():Paciente[];
    getAllPatients():Promise<Paciente[]>;
    //createPatient(patientReq:newPaciente):Paciente;
    createPatient(patientReq:newPaciente):Promise<Paciente>;
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
        const Paciente:Promise<Paciente>=this.patientRepository.createPatient(patientReq);
        return Paciente; 
    }
}
