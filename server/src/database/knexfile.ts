import '../helpers/dotenv';
import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
  useNullAsDefault: true,
  pool: { min: 0, max: 10 },
  migrations: {
    tableName: 'migrations',
  },
};

export default config;
