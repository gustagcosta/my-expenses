import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("bills", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique()
    table.string("description").notNullable()
    table.date("expire_date").notNullable()
    table.decimal("value", 5, 2).notNullable()
    table.uuid("user_id").notNullable()
    table.timestamps(true, true)

    table.foreign("user_id", "fk_user_bills").references("users.id")
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("bills")
}
