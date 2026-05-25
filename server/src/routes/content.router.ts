import { Router } from "express";
import { getGenres, getFilms, getFilm, getSeries, getOneSeries, getSeasons, getEpisode } from "../controllers/content.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/genres", getGenres);
router.get("/films", getFilms);
router.get("/series", getSeries);

router.get("/films/:id", authMiddleware, getFilm);
router.get("/series/:id", authMiddleware, getOneSeries);
router.get("/series/:id/seasons", authMiddleware, getSeasons);
router.get("/episodes/:id", authMiddleware, getEpisode);

export default router;
