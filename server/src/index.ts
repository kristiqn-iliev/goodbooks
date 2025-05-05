import { config } from "./config";
import Knex from "knex";
const knex = Knex({
  client: "pg",
  connection: config.get("db"),
});

async function main() {
  const a = await knex.select().table("books");
  console.log(a);
}

main();
