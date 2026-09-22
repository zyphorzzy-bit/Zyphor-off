import express from "express";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    service: "Zyphor Cloud API",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Zyphor Cloud API rodando na porta ${env.PORT}`);
});
