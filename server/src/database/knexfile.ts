import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    user: "root",
    password: "password",
    host: "127.0.0.1",
    port: 5432,
    database: "docker",
    ssl: false
  },
  useNullAsDefault: true,
  pool: { min: 0, max: 10 },
  migrations: {
    tableName: "migrations"
  }
};

export default config;
