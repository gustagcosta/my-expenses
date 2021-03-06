import { db } from '../database/db';
import { Bill } from '../models/bill';
import { HttpError } from '../helpers/http-error';
import { isValid } from 'date-fns';

type BillUpdateRequestDTO = {
  description: string;
  expire_date: string;
  value: number;
  userId: string;
  id: string;
  done?: boolean;
};

export class UpdateBillService {
  static async execute({
    id,
    description,
    expire_date,
    value,
    userId,
    done,
  }: BillUpdateRequestDTO): Promise<void | HttpError> {
    try {
      if ([description, expire_date, value].some((i) => !i)) {
        return new HttpError(400, 'Missing data');
      }

      if (description.length < 3) {
        return new HttpError(
          400,
          'Description field must have more than 3 caracteres'
        );
      }

      if (value < 0) {
        return new HttpError(400, 'Value field must be greater than 0');
      }

      const bill = await db('bills')
        .select('*')
        .where('user_id', '=', userId)
        .where('id', '=', id)
        .first();

      if (!bill) {
        return new HttpError(404, 'Bill with this id not found');
      }

      if (!isValid(new Date(expire_date))) {
        return new HttpError(400, 'Expire date field must is invalid');
      }

      if (!Number(value)) {
        return new HttpError(400, 'value field must be a number');
      }

      console.log(done)

      await db('bills')
        .update({
          description,
          expire_date,
          value,
          updated_at: new Date(),
          done: done ? true : false,
        })
        .where('id', '=', id);
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
