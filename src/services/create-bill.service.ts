import { db } from '../database/db';
import { Bill } from '../models/bill';
import { HttpError } from '../helpers/http-error';
import { isValid } from 'date-fns';

type BillStoreRequestDTO = {
  description: string;
  expire_date: string;
  value: number;
  userId: string;
  done?: boolean;
};

export class CreateBillService {
  static async execute({
    description,
    expire_date,
    value,
    userId,
    done,
  }: BillStoreRequestDTO): Promise<void | HttpError> {
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

      if (!isValid(new Date(expire_date))) {
        return new HttpError(400, 'Expire date field is invalid');
      }

      if (!Number(value)) {
        return new HttpError(400, 'value field must be a number');
      }

      if (!done) {
        done = false;
      }

      const bill = new Bill();
      bill.description = description;
      bill.expire_date = expire_date;
      bill.value = value;
      bill.user_id = userId;
      bill.done = done ? true : false;

      await db('bills').insert(bill);
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
