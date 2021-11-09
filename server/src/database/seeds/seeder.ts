import "../../dotenv"
import { Knex } from "knex"
import { User } from "../../entities/User"
import { hash } from "bcryptjs"
import {
  RoleRepository,
  UserRepository,
  UserRoleRepository,
} from "../../repositories"
import { Role } from "../../entities/Role"

export async function seed(knex: Knex): Promise<void> {
  await UserRoleRepository().del()
  await UserRepository().del()
  await RoleRepository().del()

  const adminRole = new Role("admin")
  const userRole = new Role("user")

  await RoleRepository().insert([adminRole, userRole])

  const passwordHash = await hash(process.env.ADMIN_PASSWORD, 8)

  const adminUser = new User(
    process.env.ADMIN_NAME,
    process.env.ADMIN_EMAIL,
    passwordHash
  )

  await UserRepository().insert(adminUser)

  await UserRoleRepository().insert({
    user_id: adminUser.id,
    role_id: adminRole.id,
  })

  await UserRoleRepository().insert({
    user_id: adminUser.id,
    role_id: userRole.id,
  })
}
