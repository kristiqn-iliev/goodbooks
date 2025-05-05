import { Knex } from "knex";
import { config } from "./src/config";

const connection = config.get("db");

export default {
  client: "pg",
  connection,
} as Knex.Config;
