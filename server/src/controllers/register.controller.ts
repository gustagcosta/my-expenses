import { Request, Response } from 'express';
import { RegisterService } from '../services';
import { HttpError } from '../helpers/http-error';

export class RegisterController {
  static async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const result = await RegisterService.execute({
      name,
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
