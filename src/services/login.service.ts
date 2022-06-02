import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';
import { User } from '../models/user';

type LoginRequest = {
  email: string;
  password: string;
};

type ResponseObject = {
  token: string;
  user: User;
};

export class LoginService {
  static async execute({
    email,
    password,
  }: LoginRequest): Promise<ResponseObject | HttpError> {
    try {
      if ([email, password].some((i) => i == undefined || i == null)) {
        return new HttpError(400, 'Missing data');
      }

      const user: User = await db('users')
        .select('*')
        .where('email', '=', email)
        .first();

      if (!user) {
        return new HttpError(404, 'User does not exists');
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return new HttpError(401, 'Invalid credetials');
      }

      if (!process.env.SECRET_JWT) {
        return new HttpError(500, 'No secret token found');
      }

      const token = sign({}, process.env.SECRET_JWT, {
        subject: user.id,
      });

      delete user.password;

      console.log(`Logging ${user.name}`);

      return { token, user };
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
