import { Request, Response } from "express";
import { getReviewsByContentId, findExistingReview, createReview, deleteReview, getReviewById } from "../models/review.model";
import type { CreateReviewBody } from "../types/api.types";

const MAX_REVIEW_LENGTH = 1000;

export function getReviews(req: Request, res: Response): void {
   const contentId = parseInt(req.params.contentId as string);

   if (isNaN(contentId)) {
      res.status(400).json({ error: "Невірний ID" });
      return;
   }

   const reviews = getReviewsByContentId(contentId);
   res.json({ reviews });
}

export function createReviewHandler(req: Request, res: Response): void {
   const contentId = parseInt(req.params.contentId as string);
   const { text } = req.body as CreateReviewBody;

   const rating = Number(req.body.rating);

   if (isNaN(contentId)) {
      res.status(400).json({ error: "Невірний ID" });
      return;
   }

   if (!text || req.body.rating === undefined) {
      res.status(400).json({ error: "Текст та оцінка обов'язкові" });
      return;
   }

   if (text.length > MAX_REVIEW_LENGTH) {
      res.status(400).json({ error: `Текст відгуку не може перевищувати ${MAX_REVIEW_LENGTH} символів` });
      return;
   }

   if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
      res.status(400).json({ error: "Оцінка має бути цілим числом від 1 до 10" });
      return;
   }

   const existing = findExistingReview(req.userId!, contentId);
   if (existing) {
      res.status(409).json({ error: "Ви вже залишили відгук для цього контенту" });
      return;
   }

   const reviewId = createReview({
      user_id: req.userId!,
      content_id: contentId,
      text,
      rating,
   });

   const review = getReviewById(reviewId);

   res.status(201).json({ review });
}

export function deleteReviewHandler(req: Request, res: Response): void {
   const reviewId = parseInt(req.params.reviewId as string);

   if (isNaN(reviewId)) {
      res.status(400).json({ error: "Невірний ID" });
      return;
   }

   const deleted = deleteReview(reviewId, req.userId!);

   if (!deleted) {
      res.status(404).json({ error: "Відгук не знайдено або він належить іншому користувачу" });
      return;
   }

   res.json({ message: "Відгук видалено" });
}
