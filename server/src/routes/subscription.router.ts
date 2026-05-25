import { Router } from "express";
import { getSubscriptions, getStatus, activate } from "../controllers/subscription.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getSubscriptions);

router.get("/status", authMiddleware, getStatus);
router.post("/activate", authMiddleware, activate);

export default router;
