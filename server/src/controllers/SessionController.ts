import { Request, Response } from "express";
import sessionService from "../services/SessionService";
import { CustomError } from "../utils/customError";

class SessionController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const result = await sessionService.login({
      email,
      password
    });

    if (result instanceof CustomError) {
      return response.status(result.statusCode).json(result.message);
    }

    return response.json(result);
  }
}

export default new SessionController();
