import { Request, RequestHandler, Response } from "express";
import { BaseError } from "../errors";
import { ZodError } from "zod";

export const requestHandler = <T>(
  handler: (req: Request, res: Response) => Promise<T>
): RequestHandler => {
  return async (req, res) => {
    try {
      const result = await handler(req, res);

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.status).send({ message: error.message });
        return;
      }

      if (error instanceof ZodError) {
        res
          .status(400)
          .send({ message: "Bad request error!", errors: error.flatten() });
        return;
      }

      res.status(500).send({ message: "server error" });
    }
  };
};
