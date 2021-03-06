import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.enum('role', ['admin', 'user']).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('users');
}
