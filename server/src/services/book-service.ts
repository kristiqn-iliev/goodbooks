import { Book } from "../models/book";
import { GenreService } from "./genre-service";
import { User } from "../models/user";
import { BookGenres } from "../models/book-genre";
import { BookTransformer } from "../transformers/book-transformer";
import { z } from "zod";

export const createBookDataSchema = z.object({
  title: z.string().nonempty(),
  userId: z.number().positive(),
  author: z.string().nonempty(),
  publishedIn: z.date(),
  image: z.string().url(),
  summary: z.string().optional(),
  description: z.string().optional(),
});

export type CreateBookData = z.infer<typeof createBookDataSchema>;

export class BookService {
  private genreService = new GenreService();

  async create(input: CreateBookData, genres: string[]) {
    try {
      await Book.transaction(async (trx) => {
        const book = await Book.query(trx).insertAndFetch(input);

        const genreIds = await Promise.all(
          genres.map(
            async (genre) =>
              (
                await this.genreService.findOrCreate(genre, trx)
              ).id
          )
        );

        await Promise.all(
          genreIds.map((id) =>
            BookGenres.query(trx)
              .insert({ bookId: book.id, genreId: id })
              .returning("*")
          )
        );
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async list() {
    return await Book.query();
  }

  async delete(id: number, user: User) {
    const book = await Book.query().findById(id);
    const owner = await book?.$relatedQuery("creator");
    if (user !== owner) {
      throw new Error(`Unauthorized deletion attempt by user ${user.id}`);
    }
    await Book.query().deleteById(id);
    console.log(`Book with id ${id} deleted successfully.`);
  }

  async findById(id: number) {
    const book = await Book.query().withGraphFetched("creator").findById(id);
    if (!book) {
      throw new Error("Not Found!");
    }

    return BookTransformer.toBookEntry(book);
  }
}
