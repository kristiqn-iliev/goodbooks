import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .index()
      .notNullable()
      .references("id")
      .inTable("users");
    table.integer("book_id").notNullable().references("id").inTable("books");
    table.text("text").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("comments");
}
