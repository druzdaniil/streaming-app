import db from "../db/connection";
import type { Review, ReviewPublic } from "../types/db.types";

export function getReviewsByContentId(contentId: number): ReviewPublic[] {
   return db
      .prepare(
         `
    SELECT
      r.review_id,
      r.user_id,
      r.content_id,
      r.text,
      r.rating,
      r.created_at,
      u.first_name,
      u.last_name
    FROM reviews r
    INNER JOIN users u ON r.user_id = u.user_id
    WHERE r.content_id = ?
    ORDER BY r.created_at DESC
  `,
      )
      .all(contentId) as ReviewPublic[];
}

export function findExistingReview(userId: number, contentId: number): Review | undefined {
   return db
      .prepare(
         `
    SELECT * FROM reviews
    WHERE user_id = ? AND content_id = ?
  `,
      )
      .get(userId, contentId) as Review | undefined;
}

export function createReview(data: { user_id: number; content_id: number; text: string; rating: number }): number {
   const result = db
      .prepare(
         `
    INSERT INTO reviews (user_id, content_id, text, rating)
    VALUES (?, ?, ?, ?)
  `,
      )
      .run(data.user_id, data.content_id, data.text, data.rating);

   return result.lastInsertRowid as number;
}

export function getReviewById(reviewId: number): ReviewPublic | undefined {
   return db
      .prepare(
         `
    SELECT
      r.review_id,
      r.user_id,
      r.content_id,
      r.text,
      r.rating,
      r.created_at,
      u.first_name,
      u.last_name
    FROM reviews r
    INNER JOIN users u ON r.user_id = u.user_id
    WHERE r.review_id = ?
  `,
      )
      .get(reviewId) as ReviewPublic | undefined;
}

export function deleteReview(reviewId: number, userId: number): boolean {
   const result = db
      .prepare(
         `
    DELETE FROM reviews
    WHERE review_id = ? AND user_id = ?
  `,
      )
      .run(reviewId, userId);

   return result.changes > 0;
}
