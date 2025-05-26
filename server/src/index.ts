import Knex from "knex";
import { config } from "./config";
import { Model } from "objection";
import express, { json } from "express";
import { usersRouter } from "./routes/users";
import { booksRouter } from "./routes/books";
import { authRouter } from "./routes/auth";
import { commentsRouter } from "./routes/comments";
import { knexConfig } from "../knexfile";

const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();

app.use(json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/auth", authRouter);
app.use("/comments", commentsRouter);

app.listen(config.get("server.port"));

async function main() {}

main();
