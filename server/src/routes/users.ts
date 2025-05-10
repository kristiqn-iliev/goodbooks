import { json, Router } from "express";
import { UserService } from "../services/user-service";

export const usersRouter = Router();

const userService = new UserService();

usersRouter.use(json());

usersRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const id = Number(userId);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const user = await userService.findById(Number(id));
  if (!user) {
    res.status(404).json({ error: `User with id ${id} not found!` });
    return;
  }
  res.status(200).json({ user: user });
});

usersRouter.post("/", async (req, res) => {
  const { email, username, password } = req.body;
  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  const user = await userService.register({ email, username, password });

  res.status(201).json({ user: user });
});

usersRouter.get("/", async (req, res) => {
  const users = await userService.list();
  res.json({ users: users });
});
