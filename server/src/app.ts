import express from "express";
import cors from "cors";

const app = express();

app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   }),
);

app.use(express.json());

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

export default app;
