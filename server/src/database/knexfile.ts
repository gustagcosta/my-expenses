import "../dotenv"
import { Knex } from "knex"

interface IKnexConfig {
  [key: string]: Knex.Config
}

const configs: IKnexConfig = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DB_STRING,
      ssl: false,
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 10 },
    migrations: {
      tableName: "migrations",
    },
  },
}

export default configs