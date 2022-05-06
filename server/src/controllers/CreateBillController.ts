import { Request, Response } from 'express';
import BillService from '../services/BillService';
import { CustomError } from '../utils/customError';

export class CreateBillController {
  static async execute(request: Request, response: Response) {
    const { description, expire_date, value } = request.body;

    const userId = request.userId;

    const result = await BillService.store({
      description,
      expire_date,
      value,
      userId,
    });

    if (result instanceof CustomError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
