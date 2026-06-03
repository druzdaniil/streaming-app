// pages/film.ts

import { getFilm } from "../api/content";
import { getReviews } from "../api/reviews";
import { renderLoader, createPage } from "../components/page";
import { renderReviewsSection } from "../components/reviews";
import { formatDuration, formatRating } from "../utils/format";
import type { FilmDetail, ReviewPublic } from "../types";

export async function renderFilm(id: number): Promise<HTMLElement> {
   const { page, content } = createPage();

   content.innerHTML = `<div class="container"><div id="film-inner"></div></div>`;
   const inner = content.querySelector<HTMLDivElement>("#film-inner")!;
   inner.appendChild(renderLoader());

   const [film, reviews] = await Promise.all([getFilm(id), getReviews(id).catch(() => [] as ReviewPublic[])]);

   inner.innerHTML = "";
   inner.appendChild(renderBack());
   inner.appendChild(renderFilmHero(film));
   inner.appendChild(renderPlayer(film));
   inner.appendChild(renderReviewsSection(id, reviews));

   return page;
}

function renderBack(): HTMLElement {
   const el = document.createElement("a");
   el.href = "/catalog";
   el.className = "content-detail__back";
   el.innerHTML = `← Назад`;
   return el;
}

function renderFilmHero(film: FilmDetail): HTMLElement {
   const FILM_ICON = `<svg width="56" height="56" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1"><rect x="2" y="2" width="20" height="20" rx="2"/>
    <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/></svg>`;

   const el = document.createElement("div");
   el.className = "content-detail__hero";
   el.innerHTML = `
    <div class="content-detail__poster">
      ${film.poster_url ? `<img src="${film.poster_url}" alt="${film.title}" />` : `<div class="content-detail__poster-icon">${FILM_ICON}</div>`}
    </div>
    <div class="content-detail__info">
      <h1>${film.title}</h1>
      <div class="content-detail__meta">
        <span class="content-detail__rating">${formatRating(film.rating)}/10</span>
        <span class="content-detail__dot"></span>
        <span>${film.release_year}</span>
        ${
           film.duration
              ? `
          <span class="content-detail__dot"></span>
          <span>${formatDuration(film.duration)}</span>
        `
              : ""
        }
      </div>
      <div class="content-detail__genres">
        ${film.genres.map((g) => `<span class="badge badge--genre">${g}</span>`).join("")}
      </div>
      ${film.description ? `<p class="content-detail__description">${film.description}</p>` : ""}
      <div class="content-detail__actions">
        <button class="btn btn--primary" id="watch-btn">▶ Дивитись</button>
      </div>
      <div class="content-detail__crew">
        ${film.directors.length ? `<div>Режисер: <span>${film.directors.join(", ")}</span></div>` : ""}
        ${film.actors.length ? `<div>Актори: <span>${film.actors.join(", ")}</span></div>` : ""}
      </div>
    </div>
  `;

   el.querySelector("#watch-btn")!.addEventListener("click", () => {
      document.getElementById("player-section")?.scrollIntoView({ behavior: "smooth" });
   });

   return el;
}

function renderPlayer(film: FilmDetail): HTMLElement {
   const section = document.createElement("div");
   section.className = "player";
   section.id = "player-section";

   if (!film.video_url) {
      section.innerHTML = `
      <div class="player__wrap">
        <div class="player__placeholder">
          <div class="player__label">Відео недоступне</div>
        </div>
      </div>
    `;
      return section;
   }

   section.innerHTML = `
    <div class="player__wrap">
      <div class="player__placeholder" id="player-placeholder">
        <div class="player__play-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <span class="player__label">Розпочати перегляд</span>
      </div>
    </div>
  `;

   section.querySelector("#player-placeholder")!.addEventListener(
      "click",
      () => {
         const wrap = section.querySelector(".player__wrap")!;
         wrap.innerHTML = `
      <video controls autoplay>
        <source src="${film.video_url}" />
        Ваш браузер не підтримує відтворення відео.
      </video>
    `;
      },
      { once: true },
   );

   return section;
}
