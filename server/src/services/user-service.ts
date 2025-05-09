import { User } from "../models/user";

type UserProps = Pick<User, "email" | "username" | "password">;

export class UserService {
  async register({ email, username, password }: UserProps) {
    let user = await this.findByEmail(email);
    if (user) {
      throw new Error("This email is taken!");
    }
    user = await this.findByName(username);
    if (user) {
      throw new Error("This username is taken!");
    }

    user = await User.query()
      .insertAndFetch({ email, username, password })
      .into("users");

    console.log(
      `User ${user.username} registered successfully with id ${user.id}.`
    );
  }

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
    return User.query().findById(id);
  }
}
