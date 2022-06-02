import { Request, Response } from 'express';
import { GetAllBillsService } from '../services';
import { HttpError } from '../helpers/http-error';

export class GetAllBillsController {
  static async execute(request: Request, response: Response) {
    const result = await GetAllBillsService.execute(request.userId);

    if (result instanceof HttpError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
