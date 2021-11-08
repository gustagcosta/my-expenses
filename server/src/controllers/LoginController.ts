import { Request, Response } from "express"
import { LoginService } from "../services/LoginService"

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const result = await new LoginService().execute({
      email,
      password,
    })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
