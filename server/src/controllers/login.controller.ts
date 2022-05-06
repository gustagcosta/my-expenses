import { Request, Response } from 'express';
import { LoginService } from '../services';
import { HttpError } from '../helpers/http-error';

export class LoginController {
  static async execute(request: Request, response: Response) {
    const { email, password } = request.body;

    const result = await LoginService.execute({
      email,
      password,
    });

    if (result instanceof HttpError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
