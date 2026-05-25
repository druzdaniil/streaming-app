import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = "7d";

if (!SECRET) {
   throw new Error("JWT_SECRET не встановлено у змінних середовища");
}

export interface JwtPayload {
   userId: number;
}

export function signToken(userId: number): string {
   return jwt.sign({ userId }, SECRET!, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload | null {
   try {
      return jwt.verify(token, SECRET!) as JwtPayload;
   } catch {
      return null;
   }
}
