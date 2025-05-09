import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("book_genres", (table) => {
    table
      .integer("book_id")
      .references("id")
      .inTable("books")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("genre_id")
      .references("id")
      .inTable("genres")
      .onDelete("CASCADE")
      .notNullable();

    table.primary(["book_id", "genre_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("book_genres");
}
