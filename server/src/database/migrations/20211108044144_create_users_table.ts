import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique()
    table.string("name").notNullable()
    table.string("email").notNullable().unique()
    table.string("password").notNullable()
    table.uuid("role_id").notNullable()
    table.timestamps(true, true)

    table.foreign("role_id", "fk_users_roles").references("roles.id")
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("users")
}
