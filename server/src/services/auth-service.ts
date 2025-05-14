import { User } from "../models/user";
import { UserService } from "./user-service";
import bcrypt from "bcrypt";

type CreateUserProps = Pick<User, "email" | "username" | "password">;
type LoginProps = Pick<User, "email" | "password">;

export class AuthService {
  private userService = new UserService();

  async register({ email, username, password }: CreateUserProps) {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await this.userService.findByEmail(email);
    if (user) {
      throw new Error("This email is taken!");
    }
    user = await this.userService.findByName(username);
    if (user) {
      throw new Error("This username is taken!");
    }

    user = await User.query()
      .insertAndFetch({ email, username, password: hashedPassword })
      .into("users");

    console.log(
      `User ${user.username} registered successfully with id ${user.id}.`
    );

    return this.userService.toUserEntry(user);
  }

  async login({ email, password }: LoginProps) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error("No such user has been registered!");
    }
    console.log(user);

    const doesMatch = await bcrypt.compare(password, user.password);

    if (!doesMatch) {
      throw new Error(`Wrong password for user ${user.username}!`);
    }

    return this.userService.toUserEntry(user);
  }
}
