import { renderHeader } from "./header";

export function renderLoader(): HTMLElement {
   const el = document.createElement("div");
   el.className = "loader";
   el.innerHTML = `<div class="loader__spinner"></div>`;
   return el;
}

export function createPage(): {
   page: HTMLElement;
   content: HTMLElement;
} {
   const page = document.createElement("div");
   page.className = "page";
   page.appendChild(renderHeader());

   const content = document.createElement("div");
   content.className = "page-content";
   page.appendChild(content);

   return { page, content };
}

export function renderEmpty(message: string): HTMLElement {
   const el = document.createElement("div");
   el.className = "empty-state";
   el.innerHTML = `<p>${message}</p>`;
   return el;
}
