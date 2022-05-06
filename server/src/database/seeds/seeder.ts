import "../../helpers/dotenv";
import { Knex } from "knex";
import { User } from "../../models/user";
import { hash } from "bcryptjs";
import { Role } from "../../models/role";
import { db } from "../db";

export async function seed(knex: Knex): Promise<void> {
  await db("users").del();
  await db("roles").del();
  await db("bills").del();

  const adminRole = new Role("admin");
  const userRole = new Role("user");

  await db("roles").insert([adminRole, userRole]);

  const passwordHash = await hash(process.env.ADMIN_PASSWORD, 8);

  const adminUser = new User(
    process.env.ADMIN_NAME,
    process.env.ADMIN_EMAIL,
    passwordHash,
    adminRole.id
  );

  await db("users").insert(adminUser);
}
