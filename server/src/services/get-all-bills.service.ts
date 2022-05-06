import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';

export class GetAllBillsService {
  static async execute(userId: string): Promise<object | HttpError> {
    try {
      return await db('bills').select('*').where('user_id', '=', userId);
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
