export interface Paciente{
    id_paciente:number,
    nombre:string,
    apellido:string,
    identif:string,
    telefono?:number,
    created_at?: Date,
    updated_at?: Date
}

export interface newPaciente{
    nombre:string,
    apellido:string,
    identif:string,
    telefono?:number,
    created_at?: Date,
    updated_at?: Date
}