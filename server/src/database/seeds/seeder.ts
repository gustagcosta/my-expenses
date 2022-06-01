import '../../helpers/dotenv';
import { Knex } from 'knex';
import { User } from '../../models/user';
import { hash } from 'bcryptjs';
import { db } from '../db';

export async function seed(knex: Knex): Promise<void> {
  await db('users').del();
  await db('bills').del();

  const passwordHash = await hash(process.env.ADMIN_PASSWORD, 8);

  const adminUser = new User(
    process.env.ADMIN_NAME,
    process.env.ADMIN_EMAIL,
    passwordHash,
    'admin'
  );

  await db('users').insert(adminUser);
}
