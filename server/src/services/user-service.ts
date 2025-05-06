interface User {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserProps = Pick<User, "username" | "password">;

export class UserService {
  async register({ username, password }: UserProps) {
    /*Check if email is already registered*/
    /*Check if username is taken*/
    /*insert the user into the database*/
  }
}
