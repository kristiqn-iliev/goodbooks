import { json, Router } from "express";
import { CommentService } from "../services/comment-service";
import { requestHandler } from "../middlewares/request-handler";
import { authMiddleware } from "../middlewares/auth";
import { z } from "zod";

export const commentsRouter = Router();
const commentService = new CommentService();

commentsRouter.use(json());

const getCommentsSchema = z.object({
  userId: z.coerce.number(),
  bookId: z.coerce.number(),
  text: z.string(),
});

const getCommentsPaginatedSchema = z.object({
  userId: z.coerce.number().optional(),
  bookId: z.coerce.number().optional(),
  page: z.coerce.number(),
  pageSize: z.coerce.number(),
});

const deleteCommentSchema = z.object({
  commentId: z.coerce.number(),
});

const editCommentSchema = z.object({
  commentId: z.coerce.number(),
  newText: z.string(),
});

commentsRouter.get(
  "/byUser/",
  requestHandler(async (req) => {
    const { userId, page, pageSize } = getCommentsPaginatedSchema.parse(
      req.query
    );

    const comments = await commentService.allFromUser(userId!, page, pageSize);
    return comments;
  })
);

commentsRouter.get(
  "/byBook/",
  requestHandler(async (req) => {
    const { bookId, page, pageSize } = getCommentsPaginatedSchema.parse(
      req.query
    );

    const comments = await commentService.allForBook(bookId!, page, pageSize);
    return comments;
  })
);

commentsRouter.get(
  "/",
  requestHandler(async (req) => {
    const { userId, bookId, page, pageSize } = getCommentsPaginatedSchema.parse(
      req.query
    );

    const comments = await commentService.allFromUserForBook(
      userId!,
      bookId!,
      page,
      pageSize
    );
    return comments;
  })
);

commentsRouter.post(
  "/:bookId",
  authMiddleware,
  requestHandler(async (req, res) => {
    const { bookId } = getCommentsSchema.parse(req.params.bookId);
    const { userId } = getCommentsSchema.parse(res.locals.user.id);
    const { text } = getCommentsSchema.parse(req.body);

    console.log(bookId, userId, text);

    const comment = await commentService.addComment({ bookId, userId, text });

    console.log(comment);
  })
);

commentsRouter.delete(
  "/:commentId",
  authMiddleware,
  requestHandler(async (req) => {
    const { commentId } = deleteCommentSchema.parse(req.params.id);
    await commentService.deleteComment(commentId);
  })
);

commentsRouter.patch(
  "/:commentId",
  authMiddleware,
  requestHandler(async (req) => {
    const { commentId, newText } = editCommentSchema.parse(req.params.id);
    await commentService.editComment(newText, commentId);
  })
);
