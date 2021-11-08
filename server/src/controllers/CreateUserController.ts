import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const result = await new CreateUserService().execute({
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
