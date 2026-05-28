import { request } from "../utils/request";
import type { ReviewPublic, CreateReviewBody } from "../types";

const BASE = "/api";

export async function getReviews(contentId: number): Promise<ReviewPublic[]> {
   const res = await request<{ reviews: ReviewPublic[] }>(`${BASE}/content/${contentId}/reviews`);
   return res.reviews;
}

export async function createReview(contentId: number, data: CreateReviewBody): Promise<ReviewPublic> {
   const res = await request<{ review: ReviewPublic }>(`${BASE}/content/${contentId}/reviews`, { method: "POST", body: data });
   return res.review;
}

export async function deleteReview(reviewId: number): Promise<void> {
   await request<{ message: string }>(`${BASE}/reviews/${reviewId}`, {
      method: "DELETE",
   });
}
