import knex from "knex"
import configs from "./knexfile"

const config = configs[process.env.DB]

const db = knex(config)

export { db }
