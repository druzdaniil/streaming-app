import { request } from "../utils/request";
import type { FilmDetail, SeriesDetail, ContentWithMeta, Episode, Genre } from "../types";

const BASE = "/api";

export async function getGenres(): Promise<Genre[]> {
   const res = await request<{ genres: Genre[] }>(`${BASE}/genres`);
   return res.genres;
}

export interface FilmsQuery {
   search?: string;
   genre_id?: number;
}

export async function getFilms(query: FilmsQuery = {}): Promise<FilmDetail[]> {
   const params = new URLSearchParams();
   if (query.search) params.set("search", query.search);
   if (query.genre_id) params.set("genre_id", String(query.genre_id));
   const qs = params.toString();
   const res = await request<{ films: FilmDetail[] }>(`${BASE}/films${qs ? `?${qs}` : ""}`);
   return res.films;
}

export async function getFilm(id: number): Promise<FilmDetail> {
   const res = await request<{ film: FilmDetail }>(`${BASE}/films/${id}`);
   return res.film;
}

export interface SeriesQuery {
   search?: string;
   genre_id?: number;
}

export async function getSeries(query: SeriesQuery = {}): Promise<ContentWithMeta[]> {
   const params = new URLSearchParams();
   if (query.search) params.set("search", query.search);
   if (query.genre_id) params.set("genre_id", String(query.genre_id));
   const qs = params.toString();
   const res = await request<{ series: ContentWithMeta[] }>(`${BASE}/series${qs ? `?${qs}` : ""}`);
   return res.series;
}

export async function getOneSeries(id: number): Promise<SeriesDetail> {
   const res = await request<{ series: SeriesDetail }>(`${BASE}/series/${id}`);
   return res.series;
}

export async function getEpisode(id: number): Promise<Episode> {
   const res = await request<{ episode: Episode }>(`${BASE}/episodes/${id}`);
   return res.episode;
}
