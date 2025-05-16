import { User as UserModel } from "../models/user";

export interface User {
  id: number;
  email: string;
  username: string;
}

export class UserTransformer {
  static toUserEntry(userFromDb: UserModel): User {
    return {
      id: userFromDb.id,
      email: userFromDb.email,
      username: userFromDb.username,
    };
  }
}
