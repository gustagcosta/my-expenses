import { table } from 'console';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable(
    'bills',
    (table: Knex.AlterTableBuilder) => {
      table.boolean('done').notNullable().defaultTo(false);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable(
    'bills',
    (table: Knex.AlterTableBuilder) => {
      table.dropColumn('done');
    }
  );
}
