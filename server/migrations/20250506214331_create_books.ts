import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("books", (table) => {
    table.increments("id");
    table.integer("user_id").unique().index().notNullable();
    table.string("title").index().notNullable();
    table.string("author").index().notNullable();
    table.date("published_in").notNullable();
    table.string("image").notNullable();
    table.string("summary");
    table.text("description");
    table.timestamps(true, true);

    table.unique(["title", "author"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("books");
}
