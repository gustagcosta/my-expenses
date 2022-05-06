import { Request, Response } from 'express';
import BillService from '../services/BillService';
import { CustomError } from '../utils/customError';

export class GetAllBillsController {
  static async execute(request: Request, response: Response) {
    const result = await BillService.index(request.userId);

    if (result instanceof CustomError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.json(result);
  }
}
