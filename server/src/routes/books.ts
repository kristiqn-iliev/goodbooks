import { json, Router } from "express";

import { BookService, CreateBookProps } from "../services/book-service";
import { authMiddleware } from "../middlewares/auth";
import { BadRequestError, NotFoundError } from "../errors";
import { requestHandler } from "../middlewares/request-handler";
import { z } from "zod";

export const booksRouter = Router();
const bookService = new BookService();

const getBookSchema = z.object({
  bookId: z.coerce.number(),
});

booksRouter.get(
  "/:bookId",
  requestHandler(async (req) => {
    const { bookId } = getBookSchema.parse(req.params);

    const book = await bookService.findById(bookId);
    if (!book) {
      throw new NotFoundError("Not found!");
    }
    return { book: book };
  })
);

booksRouter.get(
  "/",
  requestHandler(async (req) => {
    const books = await bookService.list();
    return books;
  })
);

booksRouter.post(
  "/create",
  authMiddleware,
  requestHandler(async (req) => {
    let book: CreateBookProps = req.body;
    console.log(book.author);
    console.log(book.title);
    await bookService.create(book, ["kris"]);
    return book;
  })
);
