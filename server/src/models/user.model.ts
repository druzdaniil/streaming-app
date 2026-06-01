import db from "../db/connection";
import type { User, UserPublic } from "../types/db.types";

export function findByEmail(email: string): User | undefined {
   return db
      .prepare(
         `
    SELECT * FROM users WHERE email = ?
  `,
      )
      .get(email) as User | undefined;
}

export function findById(userId: number): UserPublic | undefined {
   return db
      .prepare(
         `
    SELECT
      u.user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.created_at,
      u.subscription_id,
      s.type AS subscription_type
    FROM users u
    LEFT JOIN subscriptions s ON u.subscription_id = s.subscription_id
    WHERE u.user_id = ?
  `,
      )
      .get(userId) as UserPublic | undefined;
}

export function createUser(data: { first_name: string; last_name: string; email: string; password_hash: string }): number {
   const result = db
      .prepare(
         `
    INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES (?, ?, ?, ?)
  `,
      )
      .run(data.first_name, data.last_name, data.email, data.password_hash);

   return result.lastInsertRowid as number;
}
