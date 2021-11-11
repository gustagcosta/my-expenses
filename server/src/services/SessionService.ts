import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { hash } from "bcryptjs"
import { User } from "../models/User"
import { validateEmail } from "../utils/validateEmail"
import { db } from "../database/db"

type LoginRequest = {
  email: string
  password: string
}

class SessionService {
  async login({ email, password }: LoginRequest): Promise<object | Error> {
    if ([email, password].some((i) => i == undefined || i == null)) {
      return new Error("Missing data")
    }

    const user = await db("users").where("email", "=", email).first()

    if (!user) {
      return new Error("User does not exists")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return new Error("Invalid credetials")
    }

    if (!process.env.SECRET_JWT) {
      return new Error("No secret token found")
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    })

    return { token }
  }
}

export default new SessionService()
