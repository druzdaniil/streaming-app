import db from "../db/connection";
import type { Subscription, Transaction } from "../types/db.types";

export function getAllSubscriptions(): Subscription[] {
   return db
      .prepare(
         `
    SELECT * FROM subscriptions ORDER BY price
  `,
      )
      .all() as Subscription[];
}

export function getSubscriptionById(id: number): Subscription | undefined {
   return db
      .prepare(
         `
    SELECT * FROM subscriptions WHERE subscription_id = ?
  `,
      )
      .get(id) as Subscription | undefined;
}

export function getActiveTransaction(userId: number): Transaction | undefined {
   db.prepare(
      `
    UPDATE transactions
    SET status = 'expired'
    WHERE user_id = ?
      AND status = 'active'
      AND expires_at <= datetime('now')
  `,
   ).run(userId);

   return db
      .prepare(
         `
    SELECT * FROM transactions
    WHERE user_id = ?
      AND status = 'active'
    ORDER BY started_at DESC
    LIMIT 1
  `,
      )
      .get(userId) as Transaction | undefined;
}

export function activateSubscription(userId: number, subscriptionId: number): void {
   const activate = db.transaction(() => {
      db.prepare(
         `
      UPDATE transactions
      SET status = 'expired'
      WHERE user_id = ? AND status = 'active'
    `,
      ).run(userId);

      db.prepare(
         `
      INSERT INTO transactions (user_id, subscription_id, expires_at, status)
      VALUES (?, ?, datetime('now', '+30 days'), 'active')
    `,
      ).run(userId, subscriptionId);

      db.prepare(
         `
      UPDATE users SET subscription_id = ? WHERE user_id = ?
    `,
      ).run(subscriptionId, userId);
   });

   activate();
}
