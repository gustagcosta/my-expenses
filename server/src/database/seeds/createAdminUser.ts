import "../../dotenv"
import { Knex } from "knex"
import { User } from "../../entities/User"
import { hash } from "bcryptjs"
import { UserRepository } from "../../repositories"

export async function seed(knex: Knex): Promise<void> {
  await UserRepository().del();

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("Password admin is not defined");
  }

  if (!process.env.ADMIN_NAME) {
    throw new Error("Name of admin is not defined");
  }

  if (!process.env.ADMIN_EMAIL) {
    throw new Error("Email of admin is not defined");
  }

  const passwordHash = await hash(process.env.ADMIN_PASSWORD, 8);

  const adminUser = new User(process.env.ADMIN_NAME, process.env.ADMIN_EMAIL, passwordHash)

  await UserRepository().insert(adminUser)
}
