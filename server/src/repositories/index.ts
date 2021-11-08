import { db } from "../database/db" 

export const UserRepository = () => {
  return db("users")
}
