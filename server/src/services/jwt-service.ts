import { config } from "../config";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
}

export class JwtService {
  sign(payload: JwtPayload) {
    const token = jwt.sign(payload, config.get("jwt.secretKey"));

    return token;
  }

  verify(token: string): JwtPayload {
    const decoded = jwt.verify(token, config.get("jwt.secretKey"));

    const payload = typeof decoded === "string" ? JSON.parse(decoded) : decoded;

    if (typeof payload.userId !== "number") {
      throw new Error("Invalid data!");
    }
    return payload;
  }
}
