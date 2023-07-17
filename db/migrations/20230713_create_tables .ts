import {Knex} from 'knex';

export async function up(knex:Knex):Promise<void>{
    await knex.raw(
        `CREATE TABLE IF NOT EXISTS doctores(
            id_doctor bigserial primary key,
            nombre varchar not null,
            apellido varchar not null,
            especialidad varchar not null,
            consultorio varchar,
            correo varchar,
            created_at timestamptz,
            updated_at timestamptz);
        
        CREATE TABLE IF NOT EXISTS pacientes(
            id_paciente bigserial primary key,
            nombre varchar not null,
            apellido varchar not null,
            identif_paciente varchar not null unique,
            telefono int, 
            created_at timestamptz,
            updated_at timestamptz);
        
        CREATE TABLE IF NOT EXISTS citas(
            id_cita bigserial primary key,
            horario varchar not null,
            especialidad varchar not null,
            id_doctor bigint not null,
            identif_paciente varchar not null,
            created_at timestamptz,
            updated_at timestamptz,
            constraint fk_doctores Foreign Key (id_doctor) references doctores(id_doctor),
            constraint fk_pacientes Foreign Key (identif_paciente) references pacientes(identif));`
    )
}


export async function down(knex:Knex):Promise<void> {
    await knex.raw(
        `DROP TABLE doctores;
        DROP TABLE pacientes;
        DROP TABLE citas;`
    )
}