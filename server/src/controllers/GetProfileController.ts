import { Request, Response } from 'express';
import userService from '../services/UserService';
import { CustomError } from '../utils/customError';

export class GetProfileController {
  static async execute(request: Request, response: Response) {
    const result = await userService.profile(request.userId);

    if (result instanceof CustomError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
