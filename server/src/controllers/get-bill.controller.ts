import { Request, Response } from 'express';
import { GetBillService } from '../services';
import { HttpError } from '../helpers/http-error';

export class GetBillController {
  static async execute(request: Request, response: Response) {
    const result = await GetBillService.execute(
      request.params.id,
      request.userId
    );

    if (result instanceof HttpError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
