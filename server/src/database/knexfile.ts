import "../dotenv";
import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: process.env.PG_STRING,
  useNullAsDefault: true,
  pool: { min: 0, max: 10 },
  migrations: {
    tableName: "migrations"
  }
};

export default config;
