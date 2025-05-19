import { config } from "../config";
import jwt from "jsonwebtoken";
import { z, ZodError } from "zod";
import { BadRequestError } from "../errors";

const jwtPayloadSchema = z.object({
  userId: z.number(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export class InvalidJwtPayloadError extends Error {}

export class JwtService {
  sign(payload: JwtPayload) {
    const token = jwt.sign(payload, config.get("jwt.secretKey"));

    return token;
  }

  verify(token: string): JwtPayload {
    const decoded = jwt.verify(token, config.get("jwt.secretKey"));

    try {
      return jwtPayloadSchema.parse(decoded);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new InvalidJwtPayloadError();
      }

      throw error;
    }
  }
}
