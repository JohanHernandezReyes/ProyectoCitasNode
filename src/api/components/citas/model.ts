export interface Cita{
    id_cita:number,
    horario:string,
    especialidad:string,
    id_doctor:number,
    id_paciente:number,
    createdAt: Date
}

export interface newCita{
    horario:string,
    especialidad:string,
    id_doctor:number,
    id_paciente:number,
    createdAt: Date
}