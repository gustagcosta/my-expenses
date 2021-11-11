import "../../dotenv"
import { Knex } from "knex"
import { User } from "../../models/User"
import { hash } from "bcryptjs"
import { Role } from "../../models/Role"
import { db } from "../db"

export async function seed(knex: Knex): Promise<void> {
  await db("users_roles").del()
  await db("users").del()
  await db("roles").del()

  const adminRole = new Role("admin")
  const userRole = new Role("user")

  await db("roles").insert([adminRole, userRole])

  const passwordHash = await hash(process.env.ADMIN_PASSWORD, 8)

  const adminUser = new User(
    process.env.ADMIN_NAME,
    process.env.ADMIN_EMAIL,
    passwordHash
  )

  await db("users").insert(adminUser)

  await db("users_roles").insert({
    user_id: adminUser.id,
    role_id: adminRole.id,
  })

  await db("users_roles").insert({
    user_id: adminUser.id,
    role_id: userRole.id,
  })
}
