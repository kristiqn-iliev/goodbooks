import { transaction } from "objection";
import { Book } from "../models/book";
import { GenreService } from "./genre-service";
import { User } from "../models/user";
import { BookGenres } from "../models/book-genre";

interface CreateBookProps {
  title: string;
  author: string;
  publishedIn: Date;
  image: string;
  summary?: string;
  description?: string;
}

export class BookService {
  private genreService = new GenreService();

  async create(input: { book: CreateBookProps; user: User; genres: string[] }) {
    try {
      await Book.transaction(async (trx) => {
        const book = await Book.query(trx).insert({
          userId: input.user.id,
          ...input.book,
        });

        const genreIds = await Promise.all(
          input.genres.map(
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
      throw error;
    }
  }
}
