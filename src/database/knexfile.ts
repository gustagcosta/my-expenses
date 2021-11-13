import "../dotenv"
import { Knex } from "knex"

interface IKnexConfig {
  [key: string]: Knex.Config
}

const configs: IKnexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: "migrations",
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: "migrations",
    },
  },
}

export default configs
