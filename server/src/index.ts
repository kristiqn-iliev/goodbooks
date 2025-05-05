import Knex from "knex";
import { config } from "./config";

const knex = Knex({
  client: "pg",
  connection: config.get("db"),
});

async function main() {
  const a = await knex.select().table("users");
  console.log(a);
  knex.destroy();
}

main();
