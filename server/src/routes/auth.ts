import { json, Router } from "express";
import { UserService } from "../services/user-service";

export const authRouter = Router();

authRouter.use(json());

const userService = new UserService();

//dedicate auth router to register and login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  const user = await userService.login({ email, password });

  const token = `books-token-${user.id}`;

  res.status(200).json({ user, token });
});
