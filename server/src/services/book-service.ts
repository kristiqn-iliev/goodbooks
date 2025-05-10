import { Book } from "../models/book";
import { GenreService } from "./genre-service";
import { User } from "../models/user";
import { BookGenres } from "../models/book-genre";

export interface CreateBookProps {
  title: string;
  userId: number;
  author: string;
  publishedIn: Date;
  image: string;
  summary?: string;
  description?: string;
}

export class BookService {
  private genreService = new GenreService();

  async create(
    {
      title: title,
      userId: userId,
      author: author,
      publishedIn: publishedIn,
      image: image,
      summary: summary,
      description: description,
    }: CreateBookProps,
    genres: string[]
  ) {
    try {
      await Book.transaction(async (trx) => {
        const book = await Book.query(trx).insert({
          title: title,
          userId,
          author,
          publishedIn,
          image,
          summary,
          description,
        });

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
    return await Book.query().findById(id);
  }
}
