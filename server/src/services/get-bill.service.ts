import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';
import { Bill } from '../models/bill';

export class GetBillService {
  static async execute(id: string, userId: string): Promise<Bill | HttpError> {
    try {
      const bill: Bill = await db('bills')
        .select('*')
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .first();

      if (!bill) {
        return new HttpError(404, 'Bill not found');
      }

      return bill;
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
