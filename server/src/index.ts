import Knex from "knex";
import { config } from "./config";
import { knexSnakeCaseMappers, Model } from "objection";
import express, { json } from "express";
import { usersRouter } from "./routes/users";
import { booksRouter } from "./routes/books";
import { authRouter } from "./routes/auth";
import { UserService } from "./services/user-service";
import { commentsRouter } from "./routes/comments";

const knex = Knex({
  client: "pg",
  connection: config.get("db"),
  ...knexSnakeCaseMappers(),
  debug: true,
});

Model.knex(knex);

const app = express();

app.use(json());

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/auth", authRouter);
app.use("/comments", commentsRouter);

app.listen(config.get("server.port"));

async function main() {}

main();
