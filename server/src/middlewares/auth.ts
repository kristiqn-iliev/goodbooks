import { RequestHandler } from "express";
import { UserService } from "../services/user-service";
import { JwtService } from "../services/jwt-service";
import { TokenExpiredError } from "jsonwebtoken";

const userService = new UserService();
const jwtService = new JwtService();

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log({ authHeader });

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.substring("Bearer ".length);

  let payload;
  try {
    payload = jwtService.verify(token);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).send({ error: "Token expired!" });
      return;
    }

    res.status(401).send({ error: "Unauthorized!" });
    return;
  }

  const userId = payload.userId;

  if (Number.isNaN(userId)) {
    res.status(401).send({ error: "Unauthorized!" });
    return;
  }

  const user = await userService.findById(userId);

  if (!user) {
    res.status(401).send({ error: "Unauthorized!" });
    return;
  }

  res.locals.user = user;

  next();
};
