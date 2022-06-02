import { Request, Response } from 'express';
import { UpdateBillService } from '../services';
import { HttpError } from '../helpers/http-error';

export class UpdateBillController {
  static async execute(request: Request, response: Response) {
    const { id, description, expire_date, value } = request.body;

    const userId = request.userId;

    const result = await UpdateBillService.execute({
      id,
      description,
      expire_date,
      value,
      userId,
    });

    if (result instanceof HttpError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.status(204).send();
  }
}
