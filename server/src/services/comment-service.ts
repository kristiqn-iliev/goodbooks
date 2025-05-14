import { Book } from "../models/book";
import { Comment } from "../models/comment";
import { User } from "../models/user";
import { UserService } from "./user-service";

export class CommentService {
  private userService = new UserService();

  async addComment(text: string, user: User, book: Book) {
    const comment = await Comment.query()
      .insert({
        userId: user.id,
        bookId: book.id,
        text,
      })
      .into("comments");
    console.log(`${user.username} added comment with id ${comment.id}!`);
  }

  async deleteComment(id: number, user: User) {
    const comment = await Comment.query().findById(id);
    if (!comment) {
      throw new Error(`Comment with ${id} not found!`);
    }
    if (user.id !== comment.userId) {
      throw new Error(`Unauthorized deletion attempt!`);
    }

    await Comment.query().deleteById(id);
    console.log(`Comment with index ${id} deleted successfully!`);
  }

  async editComment(text: string, id: number, user: User) {
    const comment = await Comment.query().findById(id);
    if (!comment) {
      throw new Error(`Comment with ${id} not found!`);
    }
    if (user.id !== comment.userId) {
      throw new Error(`Unauthorized update attempt!`);
    }
    await Comment.query().findById(id).patch({ text });
  }

  async allForBook(book: Book, page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const comments = await book.$relatedQuery("comments");
    return comments.slice(start, end);
  }

  async allFromUser(user: User, page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const comments = await user.$relatedQuery("comments");
    return comments.slice(start, end);
  }

  async allFromUserByName(username: string, page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    console.log("called");
    const user = await this.userService.findByName(username);
    if (!user) {
      throw new Error("No such user has been registered!");
    }
    const comments = await user.$relatedQuery("comments");
    return comments.slice(start, end);
  }

  async findById(id: number) {
    return await Comment.query().findById(id);
  }
}
