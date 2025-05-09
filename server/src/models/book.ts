import { Model } from "objection";
import { BaseModel } from "./base-model";
import { User } from "./user";
import { Comment } from "./comment";
import { Genre } from "./genre";

export class Book extends BaseModel {
  static get tableName() {
    return "books";
  }
  userId!: number;
  title!: string;
  author!: string;
  publishedIn!: Date;
  image!: string;
  summary?: string;
  description?: string;

  creator?: User;
  comments?: Comment[];
  genres?: Genre[];

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "books.userId",
          to: "users.id",
        },
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "books.id",
          to: "comments.bookId",
        },
      },

      genres: {
        relation: Model.ManyToManyRelation,
        modelClass: Genre,
        join: {
          from: "books.id",
          through: {
            from: "book_genres.bookId",
            to: "book_genres.genreId",
          },
          to: "genres.id",
        },
      },
    };
  }
}
