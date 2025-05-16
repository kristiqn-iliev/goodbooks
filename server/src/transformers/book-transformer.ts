import { string } from "zod";
import { Book as BookModel } from "../models/book";
import { User, UserTransformer } from "./user-transformer";

interface Book {
  id: number;
  title: string;
  userId: number;
  author: string;
  publishedIn: Date;
  image: string;
  summary?: string;
  description?: string;
  creator?: User;
}

export class BookTransformer {
  static toBookEntry(bookFromDb: BookModel): Book {
    return {
      id: bookFromDb.id,
      title: bookFromDb.title,
      userId: bookFromDb.userId,
      author: bookFromDb.author,
      publishedIn: bookFromDb.publishedIn,
      image: bookFromDb.image,
      summary: bookFromDb.summary ?? undefined,
      description: bookFromDb.description ?? undefined,
      creator: bookFromDb.creator
        ? UserTransformer.toUserEntry(bookFromDb.creator)
        : undefined,
    };
  }
}
