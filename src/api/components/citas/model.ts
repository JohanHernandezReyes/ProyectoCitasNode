export interface Cita{
    id_cita:number,
    horario:string,
    especialidad:string,
    id_doctor:number,
    identif_paciente:string,
    createdAt?: Date
}

export interface newCita{
    horario:string,
    especialidad:string,
    id_doctor:number,
    identif_paciente:string,
    createdAt?: Date
}