import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';

export class DeleteBillService {
  static async execute(id: string): Promise<void | HttpError> {
    try {
      await db('bills').where('id', '=', id).del();
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unkown error');
    }
  }
}
