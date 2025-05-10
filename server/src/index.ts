import Knex from "knex";
import { config } from "./config";
import { knexSnakeCaseMappers, Model } from "objection";
import express from "express";
// const knex = Knex({
//   client: "pg",
//   connection: config.get("db"),
//   ...knexSnakeCaseMappers(),
//   debug: true,
// });

// Model.knex(knex);

const app = express();

app.get("/kris", async (req, res) => {
  res.send("Hello World");
});

app.get("/", async (req, res) => {
  res.send("Hello ni66a!!!!!!");
});

app.listen(3000);

async function main() {}

main();
