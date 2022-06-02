import { hash } from 'bcryptjs';
import { User } from '../models/user';
import { validateEmail } from '../helpers/validate-email';
import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

export class RegisterService {
  static async execute({
    name,
    email,
    password,
  }: UserRequest): Promise<void | HttpError> {
    try {
      if ([name, email, password].some((i) => i == undefined || i == null)) {
        return new HttpError(400, 'Missing data');
      }

      const existUser = await db('users').where('email', '=', email).first();

      if (existUser) {
        return new HttpError(409, 'User already exists');
      }

      if (!validateEmail(email)) {
        return new HttpError(400, 'Email is not valid');
      }

      if (name.length <= 3) {
        return new HttpError(
          400,
          'Name field must have more than 3 caracteres'
        );
      }

      if (password.length <= 3) {
        return new HttpError(
          400,
          'Password field must have more than 3 caracteres'
        );
      }

      const passwordHash = await hash(password, 8);

      const newUser = new User(name, email, passwordHash, 'user');

      await db('users').insert(newUser);

      console.log(`Registering ${name}`);
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
