import { db } from "../database/db"

export const UserRepository = () => {
  return db("users")
}

export const RoleRepository = () => {
  return db("roles")
}

export const UserRoleRepository = () => {
  return db("users_roles")
}
