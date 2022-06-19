import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(
    'bills_queue',
    (table: Knex.TableBuilder) => {
      table.uuid('id').primary().notNullable().unique();
      table.boolean('done').notNullable().defaultTo(0);
      table.uuid('bill_id').notNullable();
      table.timestamps(true, true);

      table.foreign('bill_id', 'fk_bill_bills_queue').references('bills.id');
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('bills_queue');
}
