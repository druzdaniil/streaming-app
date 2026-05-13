import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
   }),
);

app.use(express.json({ limit: '100kb' }));

app.use("/api/auth", authRouter);

app.get("/api/health", (_req, res) => {
   res.json({
      status: "ok",
      message: "Сервер працює",
   });
});

app.use((_req, res) => {
   res.status(404).json({
      error: "Маршрут не знайдено",
   });
});

app.use(errorMiddleware);

export default app;
