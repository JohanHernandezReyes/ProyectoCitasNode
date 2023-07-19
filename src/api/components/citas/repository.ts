import { Cita, ResponseCita, newCita } from './model';
import { db } from './../../../config/database';
import { AppointmentCreationError, AppointmentGetAllError, DeleteInfoError, RecordNotFoundError, UpdateInfoError } from '../../../config/customErrors';

export class citaRepository {
    
    public async createAppointment(cita:newCita): Promise<ResponseCita>{
        try{
            //se debe definir la constante como tipo any[]
            const [createdAppointment] = await db('citas').insert(cita).returning('*');
            return createdAppointment;
        }
        catch(error){
            throw new AppointmentCreationError("Error al registrar la cita: "+error.message)
        }
    }

    public async GetAppointmentById(id:number): Promise<ResponseCita>{
        try{
            const CitaX:any = await db('citas').where({id_cita:id}).first();
            return CitaX;
        }
        catch(error){
            throw new RecordNotFoundError(`Error al consultar la cita especificada: ${error.message}`, "citas")
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

    public async UpdateAppointment(id:number, updates:Partial<newCita>): Promise<void>{
        try{
            await db('citas').where({id_cita:id}).update(updates);
        }
        catch(error){
            throw new UpdateInfoError(`Error al actualizar la info de la cita: ${error.message}`, "citas")
        }
    }

    public async DeleteAppointment(id:number): Promise<void>{
        try{
            await db('citas').where({id_cita:id}).del();
        }
        catch(error){
            throw new DeleteInfoError(`Error al eliminar la cita especificada: ${error.message}`, "citas")
        }
    }
}
