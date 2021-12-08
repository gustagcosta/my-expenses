import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { db } from "../database/db";

type LoginRequest = {
  email: string;
  password: string;
};

class SessionService {
  async login({ email, password }: LoginRequest): Promise<object | Error> {
    try {
      if ([email, password].some((i) => i == undefined || i == null)) {
        return new Error("Missing data");
      }

      const queryResult = await db.raw(
        `
        select u.id, u.name, u.email, u.password, r.name as role 
        from users u, roles r 
        where r.id = u.role_id
        and u.email = '${email}'
      `
      );

      const user = queryResult.rows[0]

      if (!user) {
        return new Error("User does not exists");
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return new Error("Invalid credetials");
      }

      if (!process.env.SECRET_JWT) {
        return new Error("No secret token found");
      }

      const token = sign({}, process.env.SECRET_JWT, {
        subject: user.id
      });

      delete user.password;

      return { token, user };
    } catch (error) {
      console.error(error);
      return new Error("Error trying to login");
    }
  }
}

export default new SessionService();
