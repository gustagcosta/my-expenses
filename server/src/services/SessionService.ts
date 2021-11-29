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

      const user = await db("users").where("email", "=", email).first();

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
      delete user.created_at;
      delete user.updated_at;

      const roles = await db.raw(
        `select roles.name from users_roles, roles where 
        user_id = '${user.id}' and users_roles.role_id = roles.id;`
      );

      user.roles = roles.rows.map((r: any) => r.name);

      return { token, user };
    } catch (error) {
      console.error(error);
      return new Error("Error trying to login");
    }
  }
}

export default new SessionService();
