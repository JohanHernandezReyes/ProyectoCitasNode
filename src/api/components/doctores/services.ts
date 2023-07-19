import { DeleteInfoError, DoctorCreationError, RecordNotFoundError, UpdateInfoError } from '../../../config/customErrors';
import logger from '../../../utils/logger';
import {Doctor, newDoctor} from './model';
import { doctorRepository } from './repository';

export interface DoctorService{
    //getAllDoctors():Doctor[];
    getAllDoctors():Promise<Doctor[]>;
    //createDoctor(doctorReq:newDoctor):Doctor;
    createDoctor(doctorReq:newDoctor):Promise<Doctor>;

    GetDoctorById(id:number):Promise<Doctor>;
    UpdateDoctor(id:number, updates:Partial<Doctor>):Promise<Doctor>;
    DeleteDoctor(id:number):Promise<void>
}

export class DoctorServiceImp implements DoctorService{

    private doctorRepository: doctorRepository;

    constructor(doctorRepository:doctorRepository){
        this.doctorRepository = doctorRepository;
    }

    /*public getAllDoctors(): Doctor[] {  
        const doctores = [
            {id_doctor:1, nombre:'Jhon', apellido:'Rojas', especialidad:'Pediatria', consultorio:101, correo:'jhon.rojas23@gmail.com', created_at:new Date()},
            {id_doctor:2, nombre:'Sara', apellido:'Perez', especialidad:'Medicina General', consultorio:203, correo:'sarap_69@gmail.com', created_at:new Date()},
            {id_doctor:3, nombre:'Angela', apellido:'Sanchez', especialidad:'Medicina General', consultorio:205, created_at:new Date()}
        ]
        return doctores;
    }*/

    public async getAllDoctors():Promise<Doctor[]>{  
        const doctores:Promise<Doctor[]> = this.doctorRepository.queryDoctors();
        return doctores
    }

    
    /*public createDoctor(doctorReq:newDoctor):Doctor{
        const Doctor:Doctor ={
            id_doctor:4,
            nombre: doctorReq.nombre,
            apellido: doctorReq.apellido,
            especialidad: doctorReq.especialidad,
            consultorio: doctorReq.consultorio,
            correo: doctorReq.correo,
            created_at: doctorReq.created_at
        }
    }*/

    public async createDoctor(doctorReq:newDoctor):Promise<Doctor>{
        try{
            const Doctor:Promise<Doctor> = this.doctorRepository.createDoctor(doctorReq);
            return Doctor;
        }catch(error){
            throw new DoctorCreationError(`${error}`);
        }
    }    

    public async GetDoctorById(id:number):Promise<Doctor>{
        try{
            const DoctorX:Promise<Doctor> = this.doctorRepository.GetDoctorById(id);
            return DoctorX;
        }catch(error){
            throw new RecordNotFoundError(`${error}`);
        }
    } 
    
    public async UpdateDoctor(id:number, updates:Partial<newDoctor>):Promise<Doctor>{
        try{
            const ExistDoctor:Promise<Doctor> = this.doctorRepository.GetDoctorById(id);
            if(!ExistDoctor){
                throw new RecordNotFoundError("No existe el Id en la base de datos");
            }else{
                const updatedDoctor = {...ExistDoctor, ...updates};
                this.doctorRepository.UpdateDoctor(id, updatedDoctor);
                return updatedDoctor;
            }    
        }catch(error){
            logger.error(error.message);
            throw new UpdateInfoError(`${error}`);
        }
    } 

    public async DeleteDoctor(id:number):Promise<void>{
        try{
            const ExistDoctor:Promise<Doctor> = this.doctorRepository.GetDoctorById(id);
            if(!ExistDoctor){
                throw new RecordNotFoundError("No existe el Id en la base de datos");
            }else{
                this.doctorRepository.DeleteDoctor(id);
            }    
        }catch(error){
             logger.error(error.message);
            throw new DeleteInfoError(`${error}`);
        }
    } 
}
