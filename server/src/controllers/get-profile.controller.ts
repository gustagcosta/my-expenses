import { Request, Response } from 'express';
import { GetProfileService } from '../services';
import { HttpError } from '../helpers/http-error';

export class GetProfileController {
  static async execute(request: Request, response: Response) {
    const result = await GetProfileService.execute(request.userId);

    if (result instanceof HttpError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
