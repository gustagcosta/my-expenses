import { NextFunction, Request, Response } from "express"
import { UserRepository } from "../repositories"

export function admin() {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request

    const user = await UserRepository()
      .select("*")
      .where("email", "=", "admin")
      .first()

    if (user.id !== userId) {
      return response.status(400).json("User is not a admin")
    }

    return next()
  }
}
