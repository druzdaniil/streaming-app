import { Request, Response } from "express";
import { getAllFilms, getFilmById, searchFilms, getFilmsByGenre, getAllSeries, getSeriesById, searchSeries, getSeriesByGenre, getSeasonsBySeriesId, getEpisodeById, getAllGenres } from "../models/content.model";
import type { ContentWithMeta } from "../types/db.types";

function splitMeta(item: ContentWithMeta) {
   return {
      ...item,
      genres: item.genres ? item.genres.split(",") : [],
      directors: item.directors ? item.directors.split(",") : [],
      actors: item.actors ? item.actors.split(",") : [],
   };
}

export function getGenres(_req: Request, res: Response): void {
   const genres = getAllGenres();
   res.json({ genres });
}

export function getFilms(req: Request, res: Response): void {
   const search = req.query.search as string | undefined;
   const genre_id = req.query.genre_id as string | undefined;

   let films;

   if (search) {
      films = searchFilms(search);
   } else if (genre_id) {
      films = getFilmsByGenre(parseInt(genre_id));
   } else {
      films = getAllFilms();
   }

   res.json({ films: films.map(splitMeta) });
}

export function getFilm(req: Request, res: Response): void {
   const id = parseInt(req.params.id as string);

   if (isNaN(id)) {
      res.status(400).json({ error: "Невірний ID" });
      return;
   }

   const film = getFilmById(id);

   if (!film) {
      res.status(404).json({ error: "Фільм не знайдено" });
      return;
   }

   res.json({ film: splitMeta(film) });
}

export function getSeries(req: Request, res: Response): void {
   const search = req.query.search as string | undefined;
   const genre_id = req.query.genre_id as string | undefined;

   let series;

   if (search) {
      series = searchSeries(search);
   } else if (genre_id) {
      series = getSeriesByGenre(parseInt(genre_id));
   } else {
      series = getAllSeries();
   }

   res.json({ series: series.map(splitMeta) });
}

export function getOneSeries(req: Request, res: Response): void {
   const id = parseInt(req.params.id as string);

   if (isNaN(id)) {
      res.status(400).json({ error: "Невірний ID" });
      return;
   }

   const series = getSeriesById(id);

   if (!series) {
      res.status(404).json({ error: "Серіал не знайдено" });
      return;
   }

   const seasons = getSeasonsBySeriesId(id);
   res.json({ series: { ...splitMeta(series), seasons } });
}

export function getSeasons(req: Request, res: Response): void {
   const id = parseInt(req.params.id as string);

   if (isNaN(id)) {
      res.status(400).json({ error: "Невірний ID" });
      return;
   }

   const series = getSeriesById(id);
   if (!series) {
      res.status(404).json({ error: "Серіал не знайдено" });
      return;
   }

   const seasons = getSeasonsBySeriesId(id);
   res.json({ seasons });
}

export function getEpisode(req: Request, res: Response): void {
   const id = parseInt(req.params.id as string);

   if (isNaN(id)) {
      res.status(400).json({ error: "Невірний ID" });
      return;
   }

   const episode = getEpisodeById(id);

   if (!episode) {
      res.status(404).json({ error: "Серію не знайдено" });
      return;
   }

   res.json({ episode });
}
