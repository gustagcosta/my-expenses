import { Request, Response } from "express"
import userService from "../services/UserService"

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body

    const result = await userService.store({
      name,
      email,
      password,
    })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}

export default new UserController()
