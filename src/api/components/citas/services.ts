import { AppointmentCreationError, RecordNotFoundError } from '../../../config/customErrors';
import {Cita, newCita} from './model';
import { citaRepository } from './repository';

export interface CitaService{
    //getAllAppointments():Cita[];
    getAllAppointments():Promise<Cita[]>;
    //createAppointment(citaReq:newCita):Cita;
    createAppointment(citaReq:newCita):Promise<Cita>;

    GetAppointmentById(id:number):Promise<Cita>;
}

export class CitaServiceImp implements CitaService{

    private citaRepository: citaRepository;

    constructor(citaRepository:citaRepository){
        this.citaRepository = citaRepository;
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
        const citas:Promise<Cita[]> = this.citaRepository.queryAppointments();
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

    public createAppointment(citaReq:newCita):Promise<Cita>{
        try{
            const cita:Promise<Cita> = this.citaRepository.createAppointment(citaReq);
            return cita;
        }catch(error){
            throw new AppointmentCreationError(`${error}`);
        }
    }

    public async GetAppointmentById(id:number):Promise<Cita>{
        try{
            const CitaX:Promise<Cita> = this.citaRepository.GetAppointmentById(id);
            return CitaX;
        }catch(error){
            throw new RecordNotFoundError(`${error}`);
        }
    } 
}
