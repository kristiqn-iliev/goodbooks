import { Model } from "objection";
import { BaseModel } from "./base-model";
import { Book } from "./book";

export class Genre extends BaseModel {
  static get tableName() {
    return "genres";
  }
  name!: string;

  books?: Book[];

  static get relationMappings() {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "genres.id",
          through: {
            from: "book_genres.genreId",
            to: "book_genres.bookId",
          },
          to: "books.id",
        },
      },
    };
  }
}
