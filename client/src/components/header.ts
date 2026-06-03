import { navigate } from "../router";
import { isLoggedIn, getUser } from "../utils/store";
import { logout } from "../api/auth";

export function renderHeader(): HTMLElement {
   const header = document.createElement("header");
   header.className = "header";

   const loggedIn = isLoggedIn();
   const user = getUser();

   const initials = user ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase() : "";

   header.innerHTML = `
    <div class="container">
      <div class="header__inner">

        <a href="/" class="header__logo">
          <span>Cine</span><span>morph</span>
        </a>

        <nav class="header__nav">
          <a href="/" class="header__nav-link">Головна</a>
          <a href="/catalog" class="header__nav-link">Каталог</a>
        </nav>

        <div class="header__actions">
          ${
             loggedIn
                ? `
            <a href="/profile" class="header__avatar" title="${user?.first_name} ${user?.last_name}">
              ${initials}
            </a>
            <button class="btn btn--ghost btn--sm" data-logout>Вийти</button>
          `
                : `
            <a href="/login" class="btn btn--ghost btn--sm">Увійти</a>
            <a href="/register" class="btn btn--primary btn--sm">Реєстрація</a>
          `
          }
        </div>

      </div>
    </div>
  `;

   const currentPath = location.pathname;
   header.querySelectorAll<HTMLAnchorElement>(".header__nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
         link.classList.add("header__nav-link--active");
      }
   });

   header.querySelector("[data-logout]")?.addEventListener("click", () => {
      logout();
      navigate("/");
   });

   return header;
}
