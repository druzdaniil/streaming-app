import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
   console.error(err.message);

   res.status(500).json({
      error: "Внутрішня помилка сервера",
   });
}
