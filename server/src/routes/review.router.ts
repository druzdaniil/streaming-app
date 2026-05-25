import { Router } from "express";
import { getReviews, createReviewHandler, deleteReviewHandler } from "../controllers/review.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/content/:contentId/reviews", getReviews);

router.post("/content/:contentId/reviews", authMiddleware, createReviewHandler);
router.delete("/reviews/:reviewId", authMiddleware, deleteReviewHandler);

export default router;
