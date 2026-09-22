import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Backend error:", err);

  if (res.headersSent) {
    return;
  }

  const message =
    err instanceof Error ? err.message : "Erro interno do servidor.";

  return res.status(500).json({
    success: false,
    error: message,
  });
}
