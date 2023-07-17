import { Cita, newCita } from './model';
import { db } from './../../../config/database';
import { AppointmentCreationError, AppointmentGetAllError, RecordNotFoundError } from '../../../config/customErrors';

export class citaRepository {
    
    public async createAppointment(cita:newCita): Promise<Cita>{
        try{
            //se debe definir la constante como tipo any[]
            const [createdAppointment] = await db('citas').insert(cita).returning('*');
            return createdAppointment;
        }
        catch(error){
            throw new AppointmentCreationError("Error al registrar la cita: "+error.message)
        }
    }

    public async GetAppointmentById(id:number): Promise<Cita>{
        try{
            const CitaX:any = await db('citas').where({id_cita:id}).first();
            return CitaX;
        }
        catch(error){
            throw new RecordNotFoundError(`Error al consultar la cita especificada: ${error.message}`)
        }
    }

    public async queryAppointments(): Promise<Cita[]>{
        try{
            //se debe definir la constante como tipo any
            const listofAppointment:any =await db.select('*').from('citas');
            return listofAppointment;
        }
        catch(error){
            throw new AppointmentGetAllError("Error al consultar la lista de citas: "+error.message)
        }
    }
}
