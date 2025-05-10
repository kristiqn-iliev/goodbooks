import { json, Router } from "express";

import { BookService, CreateBookProps } from "../services/book-service";
import { authMiddleware } from "../middlewares/auth";
import { BadRequestError, NotFoundError } from "../errors";
import { requestHandler } from "../middlewares/request-handler";

export const booksRouter = Router();
const bookService = new BookService();

booksRouter.use((req, res, next) => {
  console.log(req.headers);
  next();
});

booksRouter.get(
  "/:bookId",
  requestHandler(async (req) => {
    const { bookId } = req.params;

    const id = Number(bookId);

    if (Number.isNaN(id)) {
      throw new BadRequestError("Not an id!");
    }

    const book = await bookService.findById(id);
    if (!book) {
      throw new NotFoundError("Not found!");
    }
    return { book: book };
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
