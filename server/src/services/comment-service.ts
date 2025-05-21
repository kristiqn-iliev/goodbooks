import { z } from "zod";
import { Comment } from "../models/comment";

const commentDataSchema = z.object({
  userId: z.number().positive(),
  bookId: z.number().positive(),
  text: z.string(),
});

type CommentData = z.infer<typeof commentDataSchema>;

export class CommentService {
  async addComment(input: CommentData) {
    const comment = await Comment.query()
      .insertAndFetch(input)
      .into("comments");
    console.log(`${input.userId} added comment with id ${comment.id}!`);

    return comment;
  }

  async deleteComment(commentId: number) {
    const comment = await Comment.query().findById(commentId);
    if (!comment) {
      throw new Error(`Comment with ${commentId} not found!`);
    }

    await Comment.query().deleteById(commentId);
    console.log(`Comment with index ${commentId} deleted successfully!`);
  }

  async editComment(text: string, commentId: number) {
    const comment = await Comment.query().findById(commentId);
    if (!comment) {
      throw new Error(`Comment with ${commentId} not found!`);
    }

    await Comment.query().findById(commentId).patch({ text });
  }

  async allForBook(bookId: number, page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const comments = await Comment.query().where("bookId", bookId);
    return comments.slice(start, end);
  }

  async allFromUser(userId: number, page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const comments = await Comment.query().where("userId", userId);
    return comments.slice(start, end);
  }

  async allFromUserForBook(
    userId: number,
    bookId: number,
    page: number,
    pageSize: number
  ) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const comments = await Comment.query()
      .where("userId", userId)
      .where("bookId", bookId);
    return comments.slice(start, end);
  }

  async findById(id: number) {
    return await Comment.query().findById(id);
  }
}
