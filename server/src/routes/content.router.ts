import { Router } from "express";
import { getGenres, getFilms, getFilm, getSeries, getOneSeries, getSeasons, getEpisode } from "../controllers/content.controller";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth.middleware";
import { subscriptionMiddleware } from "../middleware/subscription.middleware";

const router = Router();

router.get("/genres", getGenres);
router.get("/films", getFilms);
router.get("/series", getSeries);

router.get("/films/:id", optionalAuthMiddleware, subscriptionMiddleware, getFilm);
router.get("/series/:id", optionalAuthMiddleware, subscriptionMiddleware, getOneSeries);
router.get("/series/:id/seasons", authMiddleware, getSeasons);
router.get("/episodes/:id", authMiddleware, getEpisode);

export default router;
