import { json, Router } from "express";

import { BookService } from "../services/book-service";
import { UserService } from "../services/user-service";

export const booksRouter = Router();

booksRouter.use((req, res, next) => {
  console.log(req.headers);
  next();
});

const bookService = new BookService();
const userService = new UserService();

booksRouter.post("/", async (req, res) => {
  const { book } = req.body;

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("books-token-")) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  const userId = Number(authHeader.substring("books-token-".length));

  if (Number.isNaN(userId)) {
    res.status(400).send({ error: "Unauthorized" });
    return;
  }
  if (book.userId != userId) {
    res.status(401).send({ error: `Unauthorized user with id ${userId}` });
    return;
  }

  res.status(201).send({ status: ":)", userId });
});
