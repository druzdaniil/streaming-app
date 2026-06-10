import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
   namespace Express {
      interface Request {
         userId?: number;
      }
   }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Необхідна авторизація" });
      return;
   }

   const token = authHeader.split(" ")[1];
   const payload = verifyToken(token);

   if (!payload) {
      res.status(401).json({ error: "Токен недійсний або прострочений" });
      return;
   }

   req.userId = payload.userId;
   next();
}

export function optionalAuthMiddleware(req: Request, _res: Response, next: NextFunction): void {
   const authHeader = req.headers.authorization;
   if (authHeader?.startsWith("Bearer ")) {
      const payload = verifyToken(authHeader.split(" ")[1]);
      if (payload) req.userId = payload.userId;
   }
   next();
}
