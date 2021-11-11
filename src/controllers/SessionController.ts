import { Request, Response } from "express"
import sessionService from "../services/SessionService"

class SessionController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body

    const result = await sessionService.login({
      email,
      password,
    })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}

export default new SessionController()
