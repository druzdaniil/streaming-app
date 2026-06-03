// pages/home.ts

import { getFilms, getSeries, getGenres } from "../api/content";
import { renderContentCard } from "../components/content-card";
import { renderLoader, createPage } from "../components/page";
import { isLoggedIn } from "../utils/store";
import type { ContentWithMeta, FilmDetail, Genre } from "../types";

export async function renderHome(): Promise<HTMLElement> {
   const { page, content } = createPage();

   content.innerHTML = `<div class="container">
    <div id="home-inner"></div>
  </div>`;

   const inner = content.querySelector<HTMLDivElement>("#home-inner")!;
   inner.appendChild(renderLoader());

   const [films, series, genres] = await Promise.all([getFilms().catch(() => [] as FilmDetail[]), getSeries().catch(() => [] as ContentWithMeta[]), getGenres().catch(() => [] as Genre[])]);

   inner.innerHTML = "";
   inner.appendChild(renderHero());
   inner.appendChild(renderFilter(genres, films, series, inner));
   inner.appendChild(renderCatalogSection("Фільми", "/catalog?type=film", films.slice(0, 8)));
   inner.appendChild(renderCatalogSection("Серіали", "/catalog?type=series", series.slice(0, 8)));

   return page;
}

function renderHero(): HTMLElement {
   const loggedIn = isLoggedIn();
   const hero = document.createElement("div");
   hero.className = "hero";
   hero.innerHTML = `
    <div class="hero__tag">Новинка</div>
    <h1 class="hero__title">
      Дивись кіно<br>у <span>новому вимірі</span>
    </h1>
    <p class="hero__subtitle">
      Лише найкращі фільми та серіали. Пошук за назвою, фільтрація за жанром, потокове відтворення відео.
    </p>
    <div class="hero__actions">
      ${
         loggedIn
            ? `<a href="/catalog" class="btn btn--primary">▶ Каталог</a>`
            : `
          <a href="/register" class="btn btn--primary">▶ Почати перегляд</a>
          <a href="/catalog"  class="btn btn--ghost">Каталог</a>
        `
      }
    </div>
  `;
   return hero;
}

function renderFilter(genres: Genre[], films: FilmDetail[], series: ContentWithMeta[], container: HTMLElement): HTMLElement {
   const filter = document.createElement("div");
   filter.className = "genre-filter";

   const searchWrap = document.createElement("div");
   searchWrap.className = "genre-filter__search";
   const searchInput = document.createElement("input");
   searchInput.className = "input";
   searchInput.placeholder = "Пошук за назвою...";
   searchWrap.appendChild(searchInput);
   filter.appendChild(searchWrap);

   const allBtn = createGenreBtn("Всі", true);
   filter.appendChild(allBtn);

   genres.slice(0, 6).forEach((genre) => {
      filter.appendChild(createGenreBtn(genre.name, false));
   });

   let activeGenre = "";
   let searchQuery = "";

   function applyFilter(): void {
      const allContent: (FilmDetail | ContentWithMeta)[] = [...films, ...series];

      const filtered = allContent.filter((item) => {
         const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
         const matchGenre = !activeGenre || item.genres.some((g) => g.toLowerCase() === activeGenre.toLowerCase());
         return matchSearch && matchGenre;
      });

      container.querySelectorAll(".section, .empty-state").forEach((s) => s.remove());

      const filteredFilms = filtered.filter((i) => i.content_type === "film") as FilmDetail[];
      const filteredSeries = filtered.filter((i) => i.content_type === "series");

      if (filteredFilms.length) {
         container.appendChild(renderCatalogSection("Фільми", "/catalog?type=film", filteredFilms.slice(0, 6)));
      }
      if (filteredSeries.length) {
         container.appendChild(renderCatalogSection("Серіали", "/catalog?type=series", filteredSeries.slice(0, 6)));
      }
      if (!filteredFilms.length && !filteredSeries.length) {
         const empty = document.createElement("p");
         empty.className = "empty-state";
         empty.textContent = "Нічого не знайдено";
         container.appendChild(empty);
      }
   }

   let debounceTimer: ReturnType<typeof setTimeout>;
   searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
         searchQuery = searchInput.value.trim();
         applyFilter();
      }, 300);
   });

   filter.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".genre-filter__btn");
      if (!btn) return;

      filter.querySelectorAll(".genre-filter__btn").forEach((b) => b.classList.remove("genre-filter__btn--active"));
      btn.classList.add("genre-filter__btn--active");
      activeGenre = btn.dataset.genre ?? "";
      applyFilter();
   });

   return filter;
}

function createGenreBtn(label: string, active: boolean): HTMLButtonElement {
   const btn = document.createElement("button");
   btn.className = `genre-filter__btn${active ? " genre-filter__btn--active" : ""}`;
   btn.textContent = label;
   btn.dataset.genre = label === "Всі" ? "" : label;
   return btn;
}

function renderCatalogSection(title: string, seeAllHref: string, items: (FilmDetail | ContentWithMeta)[]): HTMLElement {
   const section = document.createElement("div");
   section.className = "section";

   const header = document.createElement("div");
   header.className = "section__header";
   header.innerHTML = `
    <h2 class="section__title">${title}</h2>
    <a href="${seeAllHref}" class="section__link">Всі →</a>
  `;

   const grid = document.createElement("div");
   grid.className = "content-grid";
   items.forEach((item) => grid.appendChild(renderContentCard(item)));

   section.appendChild(header);
   section.appendChild(grid);
   return section;
}
