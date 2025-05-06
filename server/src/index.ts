import Knex from "knex";
import { config } from "./config";
import { knexSnakeCaseMappers, Model } from "objection";
import { User } from "./models/user";
import { Book } from "./models/book";
import { Comment } from "./models/comment";

const knex = Knex({
  client: "pg",
  connection: config.get("db"),
  ...knexSnakeCaseMappers(),
  debug: true,
});

Model.knex(knex);

async function main() {
  const userWithRelations = await User.query()
    .findById(1)
    .withGraphFetched("[comments]");

  console.log(
    userWithRelations?.username,
    userWithRelations?.comments?.map((c) => c.text)
  );
  await knex.destroy();
}

main();
