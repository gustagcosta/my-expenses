import { NextFunction, Request, Response } from "express"
import { db } from "../database/db"

export const authorization = (roles: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request

    const userRoles = await db("users_roles")
      .where("user_id", "=", userId)
      .join("roles", { "roles.id": "users_roles.role_id" })
      .select("name")

    const matchRoles = userRoles.filter((userRole) =>
      roles.some((element, index, array) => element == userRole.name)
    )

    if (matchRoles.length > 0) {
      next()
    } else {
      return response.status(401).end()
    }
  }
}
