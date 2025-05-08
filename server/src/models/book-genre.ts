import { Model } from "objection";

export class BookGenres extends Model {
  static get tableName() {
    return "book_genres";
  }
  bookId!: number; //fk
  genreId!: number; //fk
}
