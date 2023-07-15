import { Cita, newCita } from './model';
import { db } from './../../../config/database';

export class citaRepository {
    
    public async createAppointment(cita:newCita): Promise<Cita>{
        try{
            //se debe definir la constante como tipo any[]
            const [createdAppointment] = await db('citas').insert(cita).returning('*');
            return createdAppointment;
        }
        catch(error){
            throw new Error("Error al registrar la cita: "+error)
        }
    }

    public async queryAppointments(): Promise<Cita[]>{
        try{
            //se debe definir la constante como tipo any
            const listofAppointment:any =await db.select('*').from('citas');
            return listofAppointment;
        }
        catch(error){
            throw new Error("Error al consultar la lista de citas: "+error)
        }
    }
}
