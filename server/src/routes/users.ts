import { json, Router } from "express";
import { UserService } from "../services/user-service";
import { requestHandler } from "../middlewares/request-handler";
import { BadRequestError, BaseError, NotFoundError } from "../errors";

export const usersRouter = Router();

const userService = new UserService();

usersRouter.use(json());

usersRouter.get(
  "/:userId",
  requestHandler(async (req) => {
    const { userId } = req.params;

    const id = Number(userId);

    if (Number.isNaN(id)) {
      throw new BadRequestError("Not an id!");
    }

    const user = await userService.findById(Number(id));
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found!`);
    }

    return user;
  })
);

usersRouter.get(
  "/",
  requestHandler(async () => {
    const users = await userService.list();
    return users;
  })
);
