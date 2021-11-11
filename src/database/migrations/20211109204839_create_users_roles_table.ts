import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(
    "users_roles",
    (table: Knex.TableBuilder) => {
      table.uuid("user_id").notNullable()
      table.uuid("role_id").notNullable()

      table.primary(["user_id", "role_id"])

      table.foreign("user_id", "fk_user_id").references("users.id")
      table.foreign("role_id", "fk_role_id").references("roles.id")
    }
  )
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("users_roles")
}
