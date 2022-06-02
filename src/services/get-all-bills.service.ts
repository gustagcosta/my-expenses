import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';
import { Bill } from '../models/bill';

export class GetAllBillsService {
  static async execute(userId: string): Promise<Bill[] | HttpError> {
    try {
      return await db('bills').select('*').where('user_id', '=', userId);
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
