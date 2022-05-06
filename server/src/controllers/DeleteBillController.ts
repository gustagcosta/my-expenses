import { Request, Response } from 'express';
import BillService from '../services/BillService';
import { CustomError } from '../utils/customError';

export class DeleteBillController {
  static async execute(request: Request, response: Response) {
    const result = await BillService.destroy(request.params.id);

    if (result instanceof CustomError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
