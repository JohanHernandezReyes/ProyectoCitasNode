import { Paciente, newPaciente } from './model';
import { db } from './../../../config/database';

export class PacienteRepository {
    public async createPatient(paciente:newPaciente): Promise<Paciente>{
        try{
            //se debe definir la constante como tipo any[]
            const [createdPatient] = await db('pacientes').insert(paciente).returning('*');
            return createdPatient;
        }
        catch(error){
            throw new Error("Error al crear un paciente: "+error)
        }
    }

    public async queryPatients(): Promise<Paciente[]>{
        try{
            //se debe definir la constante como tipo any
            const listofPatients:any =await db.select('*').from('pacientes')
            return listofPatients;
        }
        catch(error){
            throw new Error("Error al consultar la lista de pacientes: "+error)
        }
    }
}
