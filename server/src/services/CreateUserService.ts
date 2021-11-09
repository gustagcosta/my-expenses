import { hash } from "bcryptjs"
import { User } from "../entities/User"
import {
  RoleRepository,
  UserRepository,
  UserRoleRepository,
} from "../repositories"
import { validateEmail } from "../utils/validateEmail"

type UserRequest = {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ name, email, password }: UserRequest): Promise<User | Error> {
    if ([name, email, password].some((i) => i == undefined || i == null)) {
      return new Error("Missing data")
    }

    const existUser = await UserRepository().where("email", "=", email).first()

    if (existUser) {
      return new Error("User already exists")
    }

    if (!validateEmail(email)) {
      return new Error("Email is not valid")
    }

    if (name.length <= 3) {
      return new Error("Name field must have more than 3 caracteres")
    }

    if (password.length <= 3) {
      return new Error("Password field must have more than 3 caracteres")
    }

    const passwordHash = await hash(password, 8)

    const newUser = new User(name, email, passwordHash)

    await UserRepository().insert(newUser)

    const userRole = await RoleRepository().where("name", "=", "user").first()

    await UserRoleRepository().insert({
      user_id: newUser.id,
      role_id: userRole.id,
    })

    return newUser
  }
}
