import { Model } from "objection";
import { BaseModel } from "./base-model";
import { Book } from "./book";
import { User } from "./user";

export class Comment extends BaseModel {
  static get tableName() {
    return "comments";
  }
  $beforeUpdate() {
    this.updatedAt = new Date();
  }
  userId!: number;
  bookId!: number;
  text!: string;

  user?: User;
  book?: Book;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.id",
          to: "users.id",
        },
      },
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: "comments.id",
          to: "books.id",
        },
      },
    };
  }
}
