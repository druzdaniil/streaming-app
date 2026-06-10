import { getOneSeries, getEpisode } from "../api/content";
import { getReviews } from "../api/reviews";
import { renderLoader, createPage } from "../components/page";
import { renderReviewsSection } from "../components/reviews";
import { formatDuration, formatRating } from "../utils/format";
import type { SeriesDetail, Episode, ReviewPublic } from "../types";

export async function renderSerial(id: number): Promise<HTMLElement> {
   const { page, content } = createPage();

   content.innerHTML = `<div class="container"><div id="serial-inner"></div></div>`;
   const inner = content.querySelector<HTMLDivElement>("#serial-inner")!;
   inner.appendChild(renderLoader());

   const [series, reviews] = await Promise.all([getOneSeries(id), getReviews(id).catch(() => [] as ReviewPublic[])]);

   inner.innerHTML = "";
   inner.appendChild(renderBack());
   inner.appendChild(renderSerialHero(series));

   const playerContainer = document.createElement("div");
   playerContainer.id = "player-container";
   inner.appendChild(playerContainer);

   inner.appendChild(renderSeasons(series, playerContainer));
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

function renderSerialHero(series: SeriesDetail): HTMLElement {
   const SERIES_ICON = `<svg width="56" height="56" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1">
     <rect x="2" y="3" width="20" height="14" rx="2"/>
     <path d="M8 21h8M12 17v4"/>
  </svg>`;

   const totalEpisodes = series.seasons.reduce((sum, s) => sum + s.episodes.length, 0);

   const poster = series.poster_url ? `<img src="${series.poster_url}" alt="${series.title}" />` : `<div class="content-detail__poster-icon">${SERIES_ICON}</div>`;

   const meta = `
     <div class="content-detail__meta">
        <span class="content-detail__rating">${formatRating(series.rating)}/10</span>
        <span class="content-detail__dot"></span>
        <span>${series.release_year}</span>
        <span class="content-detail__dot"></span>
        <span>Серіал</span>
        <span class="content-detail__dot"></span>
        <span>Сезонів: ${series.seasons.length}</span>
        <span class="content-detail__dot"></span>
        <span>Серій: ${totalEpisodes}</span>
     </div>
  `;

   const genres = `
     <div class="content-detail__genres">
        ${series.genres.map((g) => `<span class="badge badge--genre">${g}</span>`).join("")}
     </div>
  `;

   const crew = `
     <div class="content-detail__crew">
        ${series.directors.length ? `<div>Режисер: <span>${series.directors.join(", ")}</span></div>` : ""}
        ${series.actors.length ? `<div>Актори: <span>${series.actors.join(", ")}</span></div>` : ""}
     </div>
  `;

   const el = document.createElement("div");
   el.className = "content-detail__hero";
   el.innerHTML = `
     <div class="content-detail__top">
        <div class="content-detail__poster">${poster}</div>
        <div class="content-detail__short-meta">
           <h1>${series.title}</h1>
           ${meta}
           ${genres}
        </div>
     </div>
     <div class="content-detail__info">
        <h1>${series.title}</h1>
        ${meta}
        ${genres}
        ${series.description ? `<p class="content-detail__description">${series.description}</p>` : ""}
        ${crew}
     </div>
  `;

   return el;
}

function renderEpisodePlayer(episode: Episode): HTMLElement {
   const section = document.createElement("div");
   section.className = "player";

   if (!episode.video_url) {
      section.innerHTML = `
      <div class="player__wrap">
        <div class="player__placeholder">
          <span class="player__label">Відео недоступне</span>
        </div>
      </div>
    `;
      return section;
   }

   section.innerHTML = `
    <div class="player__wrap">
      <video controls autoplay>
        <source src="${episode.video_url}" />
        Ваш браузер не підтримує відтворення відео.
      </video>
    </div>
  `;

   return section;
}

function renderSeasons(series: SeriesDetail, playerContainer: HTMLElement): HTMLElement {
   const section = document.createElement("div");
   section.className = "seasons";
   section.innerHTML = `<h2 class="seasons__title">Сезони та серії</h2>`;

   const list = document.createElement("div");
   list.className = "seasons__list";

   let activeEpisodeId: number | null = null;

   series.seasons.forEach((season, idx) => {
      const seasonEl = document.createElement("div");
      seasonEl.className = "season";

      const episodeCount = season.episodes.length;
      const isOpen = idx === 0;

      seasonEl.innerHTML = `
      <div class="season__header">
        <div>
          <span class="season__title">
            ${season.title ?? `Сезон ${season.season_number}`}
          </span>
          <span class="season__count"> · (${episodeCount} серій)</span>
        </div>
        <svg class="season__chevron ${isOpen ? "season__chevron--open" : ""}"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
      <div class="season__episodes ${isOpen ? "" : "season__episodes--hidden"}"></div>
    `;

      const header = seasonEl.querySelector<HTMLDivElement>(".season__header")!;
      const episodes = seasonEl.querySelector<HTMLDivElement>(".season__episodes")!;
      const chevron = seasonEl.querySelector<SVGElement>(".season__chevron")!;

      header.addEventListener("click", () => {
         const isHidden = episodes.classList.toggle("season__episodes--hidden");
         chevron.classList.toggle("season__chevron--open", !isHidden);
      });

      season.episodes.forEach((ep) => {
         const epEl = document.createElement("div");
         epEl.className = "episode";
         epEl.dataset.episodeId = String(ep.episode_id);

         epEl.innerHTML = `
        <span class="episode__number">${String(ep.episode_number).padStart(2, "0")}</span>
        <div class="episode__info">
          <div class="episode__title">${ep.title}</div>
          ${ep.duration ? `<div class="episode__duration">${formatDuration(ep.duration)}</div>` : ""}
        </div>
        <button class="episode__play" aria-label="Відтворити">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      `;

         epEl.addEventListener("click", async () => {
            section.querySelectorAll(".episode--active").forEach((e) => e.classList.remove("episode--active"));

            playerContainer.innerHTML = "";
            playerContainer.appendChild(renderLoader());

            playerContainer.scrollIntoView({ behavior: "smooth", block: "start" });

            try {
               if (activeEpisodeId !== ep.episode_id) {
                  activeEpisodeId = ep.episode_id;
                  const fullEpisode = await getEpisode(ep.episode_id);
                  playerContainer.innerHTML = "";
                  playerContainer.appendChild(renderEpisodePlayer(fullEpisode));
               }

               epEl.classList.add("episode--active");

               section.querySelectorAll(".episode__playing").forEach((e) => e.remove());
               const playingLabel = document.createElement("div");
               playingLabel.className = "episode__playing";
               playingLabel.textContent = "переглядається";
               epEl.querySelector(".episode__info")!.appendChild(playingLabel);
            } catch {
               playerContainer.innerHTML = "";
               const errEl = document.createElement("p");
               errEl.className = "error-message";
               errEl.textContent = "Не вдалось завантажити серію";
               playerContainer.appendChild(errEl);
            }
         });

         episodes.appendChild(epEl);
      });

      list.appendChild(seasonEl);
   });

   section.appendChild(list);
   return section;
}
