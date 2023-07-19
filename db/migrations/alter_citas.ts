import {Knex} from 'knex';

export async function up(knex:Knex):Promise<void>{
    await knex.raw(
        `ALTER TABLE citas RENAME COLUMN identif TO identif_paciente;
         ALTER TABLE citas DROP COLUMN especialidad;`
    )
}

export async function down(knex:Knex):Promise<void> {
    await knex.raw(
        `DROP TABLE citas;`
    )
}