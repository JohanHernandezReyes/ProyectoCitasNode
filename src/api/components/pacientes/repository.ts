import { Paciente, newPaciente } from './model';
import { db } from './../../../config/database';
import { DeleteInfoError, PatientCreationError, PatientGetAllError, RecordNotFoundError, UpdateInfoError } from '../../../config/customErrors';

export class PacienteRepository {
    public async createPatient(paciente:newPaciente): Promise<Paciente>{
        try{
            //se debe definir la constante como tipo any[]
            const [createdPatient] = await db('pacientes').insert(paciente).returning('*');
            return createdPatient;
        }
        catch(error){
            throw new PatientCreationError("Error al crear un paciente: "+error.message)
        }
    }

    public async GetPatientById(id:number): Promise<Paciente>{
        try{
            const PacienteX:any = await db('pacientes').where({id_paciente:id}).first();
            return PacienteX;
        }
        catch(error){
            throw new RecordNotFoundError(`Error al consultar el paciente especificado: ${error.message}`, "pacientes")
        }
    }


    public async GetPatientByIdentif(identif:string): Promise<Paciente>{
        try{
            const PacienteX:any = await db('pacientes').where({identif:identif}).first();
            return PacienteX;
        }
        catch(error){
            throw new RecordNotFoundError(`Error al consultar el paciente especificado: ${error.message}`, "pacientes")
        }
    }    
    
    public async queryPatients(): Promise<Paciente[]>{
        try{
            //se debe definir la constante como tipo any
            const listofPatients:any =await db.select('*').from('pacientes')
            return listofPatients;
        }
        catch(error){
            throw new PatientGetAllError("Error al consultar la lista de pacientes: "+error.message)
        }
    }

    public async UpdatePatient(id:number, updates:Partial<newPaciente>): Promise<void>{
        try{
            await db('pacientes').where({id_paciente:id}).update(updates);
        }
        catch(error){
            throw new UpdateInfoError(`Error al actualizar la info del paciente: ${error.message}`, "pacientes")
        }
    }

    public async DeletePatient(id:number): Promise<void>{
        try{
            await db('pacientes').where({id_paciente:id}).del();
        }
        catch(error){
            throw new DeleteInfoError(`Error al eliminar el paciente especificado: ${error.message}`, "pacientes")
        }
    }
}
