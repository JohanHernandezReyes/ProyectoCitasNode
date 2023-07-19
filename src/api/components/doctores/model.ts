export interface Doctor{
    id_doctor:number,
    nombre:string,
    apellido:string,
    especialidad:string,
    consultorio:number,
    correo?:string, //dato opcional
    created_at?: Date,
    updated_at?:Date
}

export interface newDoctor{
    nombre:string,
    apellido:string,
    especialidad:string,
    consultorio:number,
    correo?:string, //dato opcional
    created_at?: Date,
    updated_at?:Date
}