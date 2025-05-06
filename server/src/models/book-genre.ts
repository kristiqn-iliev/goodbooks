import { BaseModel } from "./base-model";

export class BookGenres extends BaseModel {
  static get tableName() {
    return "book-genres";
  }
  bookId!: number; //fk
  genreId!: number; //fk
}
