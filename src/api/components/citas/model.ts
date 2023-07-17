export interface Cita{
    horario:string,
    especialidad:string,
    consultorio: number,
    nombre_doctor:string,
    identif_paciente:string,
    nombre_paciente: string,
    createdAt?: Date
}

export interface newCita{
    horario:string,
    id_doctor:number,
    identif_paciente:string,
    createdAt?: Date
}


export interface ResponseCita{
    id_doctor: number,
    horario:string,
    especialidad:string,
    consultorio: number,
    nombre_doctor:string,
    identif_paciente:string,
    nombre_paciente: string,
    createdAt?: Date
}
