export interface Paciente{
    id_paciente:number,
    nombre:string,
    apellido:string,
    identif:string,
    telefono?:number,
    createdAt?: Date
}

export interface newPaciente{
    nombre:string,
    apellido:string,
    identif:string,
    telefono?:number,
    createdAt?: Date
}