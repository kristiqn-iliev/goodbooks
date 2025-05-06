import { Model } from "objection";
import { BaseModel } from "./base-model";
import { User } from "./user";
import { Comment } from "./comment";

export class Book extends BaseModel {
  static get tableName() {
    return "books";
  }
  userId!: number; //foreign key, user that posted the book
  title!: string;
  author!: string;
  publishedIn!: Date;
  image!: string;
  summary?: string;
  description?: string;

  creator?: User;
  comments?: Comment[];

  static relationMappings = {
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
        to: "comments.id",
      },
    },
  };
}
