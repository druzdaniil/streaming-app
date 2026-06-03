import { renderHeader } from "../components/header";

export function renderNotFound(): HTMLElement {
   const page = document.createElement("div");
   page.className = "page";
   page.appendChild(renderHeader());

   const content = document.createElement("div");
   content.className = "page-content not-found";
   content.innerHTML = `
    <div class="container">
      <div class="not-found__inner">
        <span class="not-found__code">404</span>
        <h1 class="not-found__title">Сторінку не знайдено</h1>
        <p class="not-found__text">Схоже, ця сторінка не існує або була переміщена.</p>
        <a href="/" class="btn btn--primary">На головну</a>
      </div>
    </div>
  `;

   page.appendChild(content);
   return page;
}
