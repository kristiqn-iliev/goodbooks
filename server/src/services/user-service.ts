import { User } from "../models/user";

type UserEntry = Pick<User, "id" | "email" | "username">;

export class UserService {
  async deleteUser(username: string) {
    const user = await this.findByName(username);
    if (!user) {
      throw new Error("User with this name does not exist!");
    }

    await User.query().deleteById(user.id);
    console.log(`User ${username} deleted successfully.`);
  }

  async findByName(username: string) {
    return User.query().where("username", username).first();
  }
  async findByEmail(email: string) {
    return User.query().where("email", email).first();
  }
  async findById(id: number) {
    const user = await User.query().findById(id);
    return user ? this.toUserEntry(user) : undefined;
  }

  async list() {
    const users = await User.query();
    return users.map((user) => this.toUserEntry(user));
  }

  toUserEntry(userFromDb: User): UserEntry {
    return {
      id: userFromDb.id,
      email: userFromDb.email,
      username: userFromDb.username,
    };
  }
}
