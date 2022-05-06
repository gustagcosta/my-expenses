import { Request, Response } from 'express';
import { CreateBillService } from '../services';
import { HttpError } from '../helpers/http-error';

export class CreateBillController {
  static async execute(request: Request, response: Response) {
    const { description, expire_date, value } = request.body;

    const userId = request.userId;

    const result = await CreateBillService.execute({
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

    return response.json(result);
  }
}
