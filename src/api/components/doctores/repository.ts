import { Doctor, newDoctor } from './model';
import { db } from './../../../config/database';
import { DoctorCreationError, DoctorGetAllError, RecordNotFoundError } from '../../../config/customErrors';

export class doctorRepository {
    
    public async createDoctor(doctor:newDoctor): Promise<Doctor>{
        try{
            //se debe definir la constante como tipo any[]
            const [createdDoctor] = await db('doctores').insert(doctor).returning('*');
            return createdDoctor;
        }
        catch(error){                       
            throw new DoctorCreationError( `Error al crear nuevo doctor: ${error.message}`);
        }
    }

    public async GetDoctorById(id:number): Promise<Doctor>{
        try{
            const DoctorX:any = await db('doctores').where({id_doctor:id}).first();
            return DoctorX;
        }
        catch(error){
            throw new RecordNotFoundError(`Error al consultar el doctor especificado: ${error.message}`)
        }
    }

    public async queryDoctors(): Promise<Doctor[]>{
        try{
            const listofDoctors:any =await db.select('*').from('doctores');
            return listofDoctors;
        }
        catch(error){
            throw new DoctorGetAllError(`Error al consultar la lista de doctores: ${error.message}`)
        }
    }
}
