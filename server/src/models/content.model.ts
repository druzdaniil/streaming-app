import db from "../db/connection";
import type { ContentWithMeta, FilmDetail, Season, Episode, Genre } from "../types/db.types";

const FILM_SELECT = `
  SELECT
   c.content_id,
   c.content_type,
   c.title,
   c.release_year,
   c.description,
   c.rating,
   c.poster_url,
   f.duration,
   f.video_url,
   GROUP_CONCAT(DISTINCT g.name)      AS genres,
    GROUP_CONCAT(DISTINCT d.full_name) AS directors,
    GROUP_CONCAT(DISTINCT a.full_name) AS actors
  FROM content c
  INNER JOIN films f ON c.content_id = f.film_id
  LEFT JOIN content_genres cg ON c.content_id = cg.content_id
  LEFT JOIN genres g ON cg.genre_id = g.genre_id
  LEFT JOIN content_directors cd ON c.content_id = cd.content_id
  LEFT JOIN directors d ON cd.director_id = d.director_id
  LEFT JOIN content_actors ca ON c.content_id = ca.content_id
  LEFT JOIN actors a ON ca.actor_id = a.actor_id
  WHERE c.content_type = 'film'
`;

const SERIES_SELECT = `
  SELECT
   c.content_id,
   c.content_type,
   c.title,
   c.release_year,
   c.description,
   c.rating,
   c.poster_url,
    GROUP_CONCAT(DISTINCT g.name) AS genres,
    GROUP_CONCAT(DISTINCT d.full_name) AS directors,
    GROUP_CONCAT(DISTINCT a.full_name) AS actors
  FROM content c
  INNER JOIN series s ON c.content_id = s.series_id
  LEFT JOIN content_genres cg ON c.content_id = cg.content_id
  LEFT JOIN genres g ON cg.genre_id = g.genre_id
  LEFT JOIN content_directors cd ON c.content_id = cd.content_id
  LEFT JOIN directors d ON cd.director_id = d.director_id
  LEFT JOIN content_actors ca ON c.content_id = ca.content_id
  LEFT JOIN actors a ON ca.actor_id = a.actor_id
  WHERE c.content_type = 'series'
`;

export function getAllFilms(): FilmDetail[] {
   return db
      .prepare(
         `
    ${FILM_SELECT}
    GROUP BY c.content_id
    ORDER BY c.rating DESC
  `,
      )
      .all() as FilmDetail[];
}

export function getFilmById(id: number): FilmDetail | undefined {
   return db
      .prepare(
         `
    ${FILM_SELECT}
      AND c.content_id = ?
    GROUP BY c.content_id
  `,
      )
      .get(id) as FilmDetail | undefined;
}

export function searchFilms(query: string): FilmDetail[] {
   return db
      .prepare(
         `
    ${FILM_SELECT}
      AND LOWER(c.title) LIKE LOWER(?)
    GROUP BY c.content_id
    ORDER BY c.rating DESC
  `,
      )
      .all(`%${query}%`) as FilmDetail[];
}

export function getFilmsByGenre(genreId: number): FilmDetail[] {
   return db
      .prepare(
         `
    ${FILM_SELECT}
      AND c.content_id IN (
        SELECT content_id FROM content_genres WHERE genre_id = ?
      )
    GROUP BY c.content_id
    ORDER BY c.rating DESC
  `,
      )
      .all(genreId) as FilmDetail[];
}

export function getAllSeries(): ContentWithMeta[] {
   return db
      .prepare(
         `
    ${SERIES_SELECT}
    GROUP BY c.content_id
    ORDER BY c.rating DESC
  `,
      )
      .all() as ContentWithMeta[];
}

export function getSeriesById(id: number): ContentWithMeta | undefined {
   return db
      .prepare(
         `
    ${SERIES_SELECT}
      AND c.content_id = ?
    GROUP BY c.content_id
  `,
      )
      .get(id) as ContentWithMeta | undefined;
}

export function searchSeries(query: string): ContentWithMeta[] {
   return db
      .prepare(
         `
    ${SERIES_SELECT}
      AND LOWER(c.title) LIKE LOWER(?)
    GROUP BY c.content_id
    ORDER BY c.rating DESC
  `,
      )
      .all(`%${query}%`) as ContentWithMeta[];
}

export function getSeriesByGenre(genreId: number): ContentWithMeta[] {
   return db
      .prepare(
         `
    ${SERIES_SELECT}
      AND c.content_id IN (
        SELECT content_id FROM content_genres WHERE genre_id = ?
      )
    GROUP BY c.content_id
    ORDER BY c.rating DESC
  `,
      )
      .all(genreId) as ContentWithMeta[];
}

export function getSeasonsBySeriesId(seriesId: number): Season[] {
   const seasons = db
      .prepare(
         `
    SELECT * FROM seasons
    WHERE series_id = ?
    ORDER BY season_number
  `,
      )
      .all(seriesId) as Season[];

   return seasons.map((season) => ({
      ...season,
      episodes: getEpisodesBySeasonId(season.season_id),
   }));
}

export function getEpisodesBySeasonId(seasonId: number): Episode[] {
   return db
      .prepare(
         `
    SELECT * FROM episodes
    WHERE season_id = ?
    ORDER BY episode_number
  `,
      )
      .all(seasonId) as Episode[];
}

export function getEpisodeById(episodeId: number): Episode | undefined {
   return db
      .prepare(
         `
    SELECT * FROM episodes WHERE episode_id = ?
  `,
      )
      .get(episodeId) as Episode | undefined;
}

export function getAllGenres(): Genre[] {
   return db
      .prepare(
         `
    SELECT * FROM genres ORDER BY name
  `,
      )
      .all() as Genre[];
}
