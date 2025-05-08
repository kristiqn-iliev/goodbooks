import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("books", (table) => {
    table.dropUnique(["user_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("books", (table) => {
    table.unique("user_id");
  });
}
