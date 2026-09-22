import { Request, Response, NextFunction } from "express";
import { error } from "../utils/response";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers["x-user-id"];

  if (!userId || typeof userId !== "string") {
    return error(res, "Não autorizado.", 401);
  }

  req.userId = userId;

  next();
}
