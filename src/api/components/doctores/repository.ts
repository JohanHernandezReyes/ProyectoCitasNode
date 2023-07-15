import { Doctor, newDoctor } from './model';
import { db } from './../../../config/database';

export class doctorRepository {
    
    public async createDoctor(doctor:newDoctor): Promise<Doctor>{
        try{
            //se debe definir la constante como tipo any[]
            const [createdDoctor] = await db('doctores').insert(doctor).returning('*');
            return createdDoctor;
        }
        catch(error){
            throw new Error("Error al crear un doctor: "+error)
        }
    }

    public async queryDoctors(): Promise<Doctor[]>{
        try{
            //se debe definir la constante como tipo any
            const listofDoctors:any =await db.select('*').from('doctores');
            return listofDoctors;
        }
        catch(error){
            throw new Error("Error al consultar la lista de doctores: "+error)
        }
    }
}
