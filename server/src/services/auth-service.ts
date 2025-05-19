import { User } from "../models/user";
import { UserService } from "./user-service";
import bcrypt from "bcrypt";

import { z } from "zod";

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const registerUserDataSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string().regex(passwordRegex),
});

export const loginUserDataSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type RegisterUserData = z.infer<typeof registerUserDataSchema>;
type LoginUserData = z.infer<typeof loginUserDataSchema>;

export class AuthService {
  private userService = new UserService();

  async register({ email, username, password }: RegisterUserData) {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await this.userService.findByEmail(email);
    if (user) {
      throw new Error("This email is taken!");
    }
    user = await this.userService.findByName(username);
    if (user) {
      throw new Error("This username is taken!");
    }

    user = await User.query().insertAndFetch({
      email,
      username,
      password: hashedPassword,
    });

    console.log(
      `User ${user.username} registered successfully with id ${user.id}.`
    );

    return this.userService.toUserEntry(user);
  }

  async login({ email, password }: LoginUserData) {
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
