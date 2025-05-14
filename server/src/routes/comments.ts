import { Router } from "express";
import { CommentService } from "../services/comment-service";
import { requestHandler } from "../middlewares/request-handler";
import { BadRequestError } from "../errors";

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
