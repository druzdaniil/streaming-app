import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router";
import contentRouter from "./routes/content.router";
import subscriptionRouter from "./routes/subscription.router";
import reviewRouter from "./routes/review.router";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(
   cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
   }),
);

app.use(express.json({ limit: "50kb" }));

app.use("/api/auth", authRouter);
app.use("/api", contentRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api", reviewRouter);

app.use((_req, res) => {
   res.status(404).json({
      error: "Маршрут не знайдено",
   });
});

app.use(errorMiddleware);

export default app;
