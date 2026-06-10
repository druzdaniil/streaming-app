import type { ContentWithMeta, FilmDetail } from "../types";
import { formatRating, formatDuration } from "../utils/format";
import { ApiException } from "../utils/request";
import { getFilm, getOneSeries } from "../api/content";
import { isLoggedIn } from "../utils/store";
import { navigate } from "../router";

const FILM_ICON = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/></svg>`;
const SERIES_ICON = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`;

export function renderContentCard(item: ContentWithMeta | FilmDetail): HTMLAnchorElement {
   const isFilm = item.content_type === "film";
   const href = isFilm ? `/film/${item.content_id}` : `/serial/${item.content_id}`;
   const duration = isFilm ? (item as FilmDetail).duration : null;
   const icon = isFilm ? FILM_ICON : SERIES_ICON;

   const card = document.createElement("a");
   card.className = "content-card";
   card.href = href;

   card.innerHTML = `
    <div class="content-card__poster">
      ${item.poster_url ? `<img src="${item.poster_url}" alt="${item.title}" loading="lazy" />` : `<div class="content-card__poster-icon">${icon}</div>`}
      <span class="content-card__rating">${formatRating(item.rating)}</span>
      ${!isFilm ? `<span class="content-card__badge badge badge--series">Серіал</span>` : ""}
    </div>
    <div class="content-card__info">
      <div class="content-card__title">${item.title}</div>
      <div class="content-card__meta">
        <span>${item.release_year}</span>
        ${duration ? `<span>·</span><span>${formatDuration(duration)}</span>` : ""}
      </div>
    </div>
  `;

   card.addEventListener("click", async (e) => {
      e.preventDefault();

      if (!isLoggedIn()) {
         navigate("/register");
         return;
      }

      try {
         const isFilm = item.content_type === "film";
         if (isFilm) {
            await getFilm(item.content_id);
         } else {
            await getOneSeries(item.content_id);
         }
         navigate(href);
      } catch (err) {
         if (err instanceof ApiException && (err.status === 403 || err.status === 401)) {
            const required = err.required_subscription ?? "вищого рівня";
            const title = err.content_title ?? "цього контенту";
            navigate(`/profile?upgrade=1&reason=${encodeURIComponent(`Для перегляду "${title}" потрібна підписка ${required}`)}`);
         } else {
            navigate(href);
         }
      }
   });

   return card;
}
