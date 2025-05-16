import { json, Router } from "express";
import {
  AuthService,
  registerUserDataSchema,
  loginUserDataSchema,
} from "../services/auth-service";
import { requestHandler } from "../middlewares/request-handler";
import { JwtService } from "../services/jwt-service";
import { BadRequestError } from "../errors";

export const authRouter = Router();

authRouter.use(json());

const authService = new AuthService();
const jwtService = new JwtService();

authRouter.post(
  "/register",
  requestHandler(async (req) => {
    const data = registerUserDataSchema.parse(req.body);

    const user = await authService.register(data);

    return user;
  })
);

authRouter.post(
  "/login",
  requestHandler(async (req) => {
    const data = loginUserDataSchema.parse(req.body);

    const user = await authService.login(data);

    const token = jwtService.sign({ userId: user.id });

    return { user, token };
  })
);
