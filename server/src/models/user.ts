import { Model } from "objection";
import { BaseModel } from "./base-model";
import { Book } from "./book";
import { Comment } from "./comment";

export class User extends BaseModel {
  static get tableName() {
    return "users";
  }
  email!: string;
  username!: string;
  password!: string;

  books?: Book[];
  comments?: Comment[];

  static relationMappings = {
    books: {
      relation: Model.HasManyRelation,
      modelClass: Book,
      join: {
        from: "users.id",
        to: "books.userId",
      },
    },

    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: "users.id",
        to: "comments.userId",
      },
    },
  };
}
