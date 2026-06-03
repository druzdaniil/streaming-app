// pages/catalog.ts

import { getFilms, getSeries, getGenres } from "../api/content";
import { renderContentCard } from "../components/content-card";
import { renderLoader, createPage, renderEmpty } from "../components/page";
import type { ContentWithMeta, FilmDetail, Genre } from "../types";

type ContentType = "all" | "film" | "series";

export async function renderCatalog(): Promise<HTMLElement> {
   const { page, content } = createPage();

   const params = new URLSearchParams(location.search);
   const initType = (params.get("type") ?? "all") as ContentType;
   const initGenre = params.get("genre") ?? "";
   const initSearch = params.get("search") ?? "";

   content.innerHTML = `
    <div class="container">
      <div class="catalog__header">
        <h1>Каталог</h1>
        <p>Фільми та серіали на будь-який смак</p>
      </div>

      <div class="catalog__toolbar">
        <div class="catalog__search">
          <span class="catalog__search-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input class="input" id="search-input"
            placeholder="Пошук за назвою..."
            value="${initSearch}"
          />
        </div>

        <div class="catalog__tabs">
          <button class="catalog__tab ${initType === "all" ? "catalog__tab--active" : ""}" data-type="all">Всі</button>
          <button class="catalog__tab ${initType === "film" ? "catalog__tab--active" : ""}" data-type="film">Фільми</button>
          <button class="catalog__tab ${initType === "series" ? "catalog__tab--active" : ""}" data-type="series">Серіали</button>
        </div>
      </div>

      <div class="catalog__genres" id="genres-list"></div>
      <div class="catalog__count" id="count-label"></div>
      <div id="catalog-grid"></div>
    </div>
  `;

   page.appendChild(content);

   const searchInput = content.querySelector<HTMLInputElement>("#search-input")!;
   const genresList = content.querySelector<HTMLDivElement>("#genres-list")!;
   const countLabel = content.querySelector<HTMLDivElement>("#count-label")!;
   const grid = content.querySelector<HTMLDivElement>("#catalog-grid")!;

   grid.appendChild(renderLoader());

   const [films, series, genres] = await Promise.all([getFilms().catch(() => [] as FilmDetail[]), getSeries().catch(() => [] as ContentWithMeta[]), getGenres().catch(() => [] as Genre[])]);

   let activeType: ContentType = initType;
   let activeGenre: string = initGenre;
   let searchQuery: string = initSearch;

   const allGenreBtn = document.createElement("button");
   allGenreBtn.className = `catalog__genre-btn${!activeGenre ? " catalog__genre-btn--active" : ""}`;
   allGenreBtn.textContent = "Всі жанри";
   allGenreBtn.dataset.genre = "";
   genresList.appendChild(allGenreBtn);

   genres.forEach((g) => {
      const btn = document.createElement("button");
      btn.className = `catalog__genre-btn${activeGenre === g.name ? " catalog__genre-btn--active" : ""}`;
      btn.textContent = g.name;
      btn.dataset.genre = g.name;
      genresList.appendChild(btn);
   });

   function renderResults(): void {
      const allContent: (FilmDetail | ContentWithMeta)[] = [...(activeType !== "series" ? films : []), ...(activeType !== "film" ? series : [])];

      const filtered = allContent.filter((item) => {
         const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
         const matchGenre = !activeGenre || item.genres.some((g) => g.toLowerCase() === activeGenre.toLowerCase());
         return matchSearch && matchGenre;
      });

      countLabel.textContent = `Знайдено: ${filtered.length}`;

      grid.innerHTML = "";

      if (!filtered.length) {
         grid.appendChild(renderEmpty("Нічого не знайдено. Спробуйте змінити фільтри."));
         return;
      }

      const newGrid = document.createElement("div");
      newGrid.className = "content-grid";
      filtered.forEach((item) => newGrid.appendChild(renderContentCard(item)));
      grid.appendChild(newGrid);
   }

   content.querySelector(".catalog__tabs")!.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-type]");
      if (!btn) return;
      content.querySelectorAll(".catalog__tab").forEach((b) => b.classList.remove("catalog__tab--active"));
      btn.classList.add("catalog__tab--active");
      activeType = btn.dataset.type as ContentType;
      renderResults();
   });

   genresList.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-genre]");
      if (!btn) return;
      genresList.querySelectorAll(".catalog__genre-btn").forEach((b) => b.classList.remove("catalog__genre-btn--active"));
      btn.classList.add("catalog__genre-btn--active");
      activeGenre = btn.dataset.genre ?? "";
      renderResults();
   });

   let debounceTimer: ReturnType<typeof setTimeout>;
   searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
         searchQuery = searchInput.value.trim();
         renderResults();
      }, 300);
   });

   renderResults();

   return page;
}
