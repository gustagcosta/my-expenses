import { db } from '../database/db';
import { HttpError } from '../helpers/http-error';

export class GetProfileService {
  static async execute(id: string): Promise<object | HttpError> {
    try {
      const query = await db.raw(
        `
        select u.id, u.name, u.email, r.name as role 
        from users u, roles r 
        where r.id = u.role_id
        and u.id = '${id}'
      `
      );

      console.log(query);

      return { salve: true };
    } catch (error) {
      console.error(error);
      return new HttpError(500, 'Unknown error');
    }
  }
}
