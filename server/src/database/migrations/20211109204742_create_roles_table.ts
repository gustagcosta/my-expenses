import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("roles", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique()
    table.string("name").notNullable().unique()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("roles")
}
