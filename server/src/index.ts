import Knex from "knex";
import { config } from "./config";
import { knexSnakeCaseMappers, Model } from "objection";
import { error } from "console";
import { UserService } from "./services/user-service";
import { GenreService } from "./services/genre-service";
import { BookService } from "./services/book-service";
import { CommentService } from "./services/comment-service";

const knex = Knex({
  client: "pg",
  connection: config.get("db"),
  ...knexSnakeCaseMappers(),
  debug: true,
});

Model.knex(knex);

async function main() {}

main();
