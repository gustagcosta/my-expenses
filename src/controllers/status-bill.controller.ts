import { Request, Response } from 'express';
import { HttpError } from '../helpers/http-error';
import { StatusBillService } from '../services';

export class StatusBillController {
  static async execute(request: Request, response: Response) {    
    const result = await StatusBillService.execute(
      request.params.id,
      request.params.done
    );

    if (result instanceof HttpError) {
      return response
        .status(result.statusCode)
        .json({ message: result.message });
    }

    return response.status(200).send();
  }
}
