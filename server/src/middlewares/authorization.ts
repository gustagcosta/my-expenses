import { NextFunction, Request, Response } from "express"
import { decode, verify } from "jsonwebtoken"
import { UserRepository, UserRoleRepository } from "../repositories"

export const authorization = (roles: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request

    const user = await UserRepository().where("id", "=", userId).first()

    const userRoles = await UserRoleRepository()
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
