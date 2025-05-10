import { json, Router } from "express";
import { AuthService } from "../services/auth-service";
import { requestHandler } from "../middlewares/request-handler";
import { JwtService } from "../services/jwt-service";

export const authRouter = Router();

authRouter.use(json());

const authService = new AuthService();
const jwtService = new JwtService();

authRouter.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).json({ error: "Bad request" });
    return;
  }

  const user = await authService.register({ email, username, password });

  res.status(201).json({ user: user });
});

authRouter.post(
  "/login",
  requestHandler(async (req) => {
    const user = await authService.login(req.body);

    const token = jwtService.sign({ userId: user.id });

    return { user, token };
  })
);
