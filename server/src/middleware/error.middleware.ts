import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
   if (process.env.NODE_ENV !== "production") {
      console.error(err.stack);
   } else {
      console.error(err.message);
   }

   res.status(500).json({
      error: "Внутрішня помилка сервера",
      ...(process.env.NODE_ENV !== "production" && { details: err.message }),
   });
}
