import { Router } from "express";
import { CommentService } from "../services/comment-service";
import { requestHandler } from "../middlewares/request-handler";
import { BadRequestError } from "../errors";
import { authMiddleware } from "../middlewares/auth";

export const commentsRouter = Router();
const commentService = new CommentService();

commentsRouter.get(
  "/",
  requestHandler(async (req) => {
    const body = req.body;
    const username = body.username;

    if (typeof username !== "string") {
      throw new BadRequestError("Not a valid username format!");
    }

    const comments = await commentService.allFromUserByName(username, 1, 10);
    return comments;
  })
);
commentsRouter.post(
  "/:bookId",
  authMiddleware,
  requestHandler(async (req, res) => {
    const bookId = parseInt(req.params.bookId);
    console.log(bookId);
    const userId = res.locals.user.id;
    const comment = await commentService.addComment(
      "very nice",
      userId,
      bookId
    );
    console.log(comment.id, userId);
  })
);

commentsRouter.delete(
  "/:commentId",
  authMiddleware,
  requestHandler(async (req, res) => {
    const commentId = parseInt(req.params.id);

    commentService.deleteComment(commentId);
  }) //crashes when trying to delete an inexistent comment.
);
