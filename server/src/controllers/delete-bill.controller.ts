import { Request, Response } from 'express';
import { DeleteBillService } from '../services';
import { HttpError } from '../helpers/http-error';

export class DeleteBillController {
  static async execute(request: Request, response: Response) {
    const result = await DeleteBillService.execute(request.params.id);

    if (result instanceof HttpError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
