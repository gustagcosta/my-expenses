import { db } from '../database/db';
import { Bill } from '../models/bill';
import moment from 'moment';
import { HttpError } from '../helpers/http-error';

type BillStoreRequestDTO = {
  description: string;
  expire_date: string;
  value: number;
  userId: string;
};

export class CreateBillService {
  static async execute({
    description,
    expire_date,
    value,
    userId,
  }: BillStoreRequestDTO): Promise<object | HttpError> {
    try {
      if (description.length < 3) {
        return new HttpError(
          400,
          'Description field must have more than 3 caracteres'
        );
      }

      if (value < 0) {
        return new HttpError(400, 'Value field must be greater than 0');
      }

      if (!moment(expire_date, 'YYYYMMDD', true).isValid()) {
        return new HttpError(400, 'Expire date field is invalid');
      }

      if (!Number(value)) {
        return new HttpError(400, 'value field must be a number');
      }

      const bill = new Bill();
      bill.description = description;
      bill.expire_date = expire_date;
      bill.value = value;
      bill.user_id = userId;

      await db('bills').insert(bill);

      return bill;
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
