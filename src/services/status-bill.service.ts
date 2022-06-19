import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';

export class StatusBillService {
  static async execute(
    bill_id: string,
    status: string
  ): Promise<void | HttpError> {
    try {
      console.log(status)
       
      if(+status !== 1 && +status !== 0){
        return new HttpError(400, 'Done value not valid');
      }

      const bill = await db('bills')
        .select('*')
        .where('id', '=', bill_id)
        .first();

      if (!bill) {
        return new HttpError(404, 'Bill with this id not found');
      }

      await db('bills')
        .update({ done: +status === 1 ? true : false })
        .where('id', '=', bill_id);
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
