import { Request, Response } from 'express';
import userService from '../services/UserService';
import { CustomError } from '../utils/customError';

export class RegisterController {
  static async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const result = await userService.store({
      name,
      email,
      password,
    });

    if (result instanceof CustomError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
