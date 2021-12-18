import { Request, Response } from "express";
import userService from "../services/UserService";
import { CustomError } from "../utils/customError";

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const result = await userService.store({
      name,
      email,
      password
    });

    if (result instanceof CustomError) {
      return response.status(result.statusCode).json(result.message);
    }

    return response.json(result);
  }
}

export default new UserController();
