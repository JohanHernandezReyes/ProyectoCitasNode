import { AppointmentCreationError, DeleteInfoError, RecordNotFoundError, UpdateInfoError } from '../../../config/customErrors';
import {Cita, ResponseCita, newCita} from './model';
import {citaRepository } from './repository';
import { doctorRepository } from './../doctores/repository';
import { Doctor } from '../doctores/model';
import { Paciente } from './../pacientes/model';
import { PacienteRepository } from './../pacientes/repository';
import logger from '../../../utils/logger';

export interface CitaService{
    //getAllAppointments():Cita[];
    getAllAppointments():Promise<Cita[]>;
    //createAppointment(citaReq:newCita):Cita;
    createAppointment(citaReq:newCita):Promise<Cita>;

    GetAppointmentById(id:number):Promise<Cita|null>;
    UpdateAppointment(id:number, updates:Partial<newCita>):Promise<Cita>;
    DeleteAppointment(id:number):Promise<void>;
}

export class CitaServiceImp implements CitaService{

    private citaRepo: citaRepository;
    private doctorRepo: doctorRepository;
    private pacienteRepo: PacienteRepository

    constructor(citaRepo:citaRepository, doctorRepo:doctorRepository, pacienteRepo:PacienteRepository){
        this.citaRepo = citaRepo;
        this.doctorRepo = doctorRepo;
        this.pacienteRepo = pacienteRepo;
    }


    /*public getAllAppointments(): Cita[] {
        
        const citas = [
            {id_cita:1, horario:'07:30am', especialidad:'Pediatria', id_doctor:1, identif_paciente: '1022221924', createdAt:new Date()},
            {id_cita:2, horario:'05:45pm', especialidad:'Medicina General', id_doctor:2, id_paciente: '39537569', createdAt:new Date()},
            {id_cita:3, horario:'07:45pm', especialidad:'Medicina General', id_doctor:2, id_paciente: '1014226860', createdAt:new Date()}
        ]
        return citas;
    }*/

    public async getAllAppointments(): Promise<Cita[]>{
        const citas:Promise<Cita[]> = this.citaRepo.queryAppointments();
        return citas;
    }

    /*public createAppointment(citaReq:newCita):Cita{
        const cita:Cita = {
            id_cita:4,
            horario: citaReq.horario,
            especialidad: citaReq.especialidad,
            id_doctor: citaReq.id_doctor,
            identif_paciente: citaReq.identif_paciente,
            createdAt: citaReq.createdAt
        };
        return cita;
    }*/

    public async createAppointment(citaReq:newCita):Promise<Cita>{
        try{
            const citaDb = await this.citaRepo.createAppointment(citaReq);
            const doctor = await this.doctorRepo.GetDoctorById(citaDb.id_doctor);
            const paciente = await this.pacienteRepo.GetPatientByIdentif(citaDb.identif_paciente);
            const cita = CitaDetalles(doctor, paciente, citaDb)
            return cita;
        }catch(error){
            throw new AppointmentCreationError(`${error}`);
        }
    }

    public async GetAppointmentById(id:number):Promise<Cita|null>{
        try{
            const citaDb = await this.citaRepo.GetAppointmentById(id);
            if(citaDb != null){
                const doctor = await this.doctorRepo.GetDoctorById(citaDb.id_doctor);
                const paciente = await this.pacienteRepo.GetPatientByIdentif(citaDb.identif_paciente);
                const CitaX = CitaDetalles(doctor, paciente, citaDb)
                return CitaX;
            }else{
                return null;
            }
        }catch(error){
            throw new RecordNotFoundError(`${error}`);
        }
    } 

    public async UpdateAppointment(id:number, updates:Partial<newCita>):Promise<Cita>{
        try{
            const ExistAppointment:Promise<Cita> = this.citaRepo.GetAppointmentById(id);
            if(!ExistAppointment){
                throw new RecordNotFoundError("No existe el Id en la base de datos");
            }else{
                const updatedAppointment = {...ExistAppointment, ...updates};
                this.citaRepo.UpdateAppointment(id, updatedAppointment);
                return updatedAppointment;
            }    
        }catch(error){
            logger.error(error.message);
            throw new UpdateInfoError(`${error}`);
        }
    } 

    public async DeleteAppointment(id:number):Promise<void>{
        try{
            const ExistAppointment:Promise<Cita> = this.citaRepo.GetAppointmentById(id);
            if(!ExistAppointment){
                throw new RecordNotFoundError("No existe el Id en la base de datos");
            }else{
                this.citaRepo.DeleteAppointment(id);
            }    
        }catch(error){
            logger.error(error.message);
            throw new DeleteInfoError(`${error}`);
        }
    } 
}


function CitaDetalles(doctor:Doctor, patient:Paciente, cita:ResponseCita):Cita{
    const citadetalle: Cita = {
        horario: cita.horario,
        nombre_doctor: `${doctor.nombre} ${doctor.apellido}`,
        especialidad: doctor.especialidad,
        nombre_paciente: `${patient.nombre} ${patient.apellido}`,
        consultorio: doctor.consultorio,    
        identif_paciente: cita.identif_paciente,
        createdAt: cita.createdAt
    };
    return citadetalle;
}