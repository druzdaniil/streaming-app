import { login } from "../api/auth";
import { navigate } from "../router";
import { isLoggedIn } from "../utils/store";
import { renderHeader } from "../components/header";
import type { LoginBody } from "../types";

export async function renderLogin(): Promise<HTMLElement> {
   if (isLoggedIn()) {
      navigate("/");
      return document.createElement("div");
   }

   const page = document.createElement("div");
   page.className = "page";
   page.appendChild(renderHeader());

   const content = document.createElement("div");
   content.className = "page-content";
   content.innerHTML = `
    <div class="container">
      <div class="auth-form">
        <div class="auth-form__header">
          <h1 class="auth-form__title">Увійти</h1>
          <p class="auth-form__subtitle">Раді бачити вас знову</p>
        </div>

        <div id="auth-error" class="error-message" style="display:none"></div>

        <form class="auth-form__body" id="login-form" novalidate>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              class="input" type="email" id="email"
              name="email" placeholder="Введіть ваш email..." autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              class="input" type="password" id="password"
              name="password" placeholder="Введіть ваш пароль..." autocomplete="current-password"
            />
          </div>
          <button type="submit" class="btn btn--primary auth-form__submit" id="submit-btn">
            Увійти
          </button>
        </form>

        <p class="auth-form__footer">
          Немає акаунту? <a href="/register">Зареєструватись</a>
        </p>
      </div>
    </div>
  `;

   page.appendChild(content);

   const form = content.querySelector<HTMLFormElement>("#login-form")!;
   const errorEl = content.querySelector<HTMLDivElement>("#auth-error")!;
   const submitBtn = content.querySelector<HTMLButtonElement>("#submit-btn")!;

   function showError(msg: string): void {
      errorEl.textContent = msg;
      errorEl.style.display = "block";
   }

   form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorEl.style.display = "none";

      const data: LoginBody = {
         email: (form.email as HTMLInputElement).value.trim(),
         password: (form.password as HTMLInputElement).value,
      };

      if (!data.email || !data.password) {
         showError("Заповніть усі поля");
         return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Входимо...";

      try {
         await login(data);
         navigate("/");
      } catch (err) {
         showError(err instanceof Error ? err.message : "Помилка входу");
         submitBtn.disabled = false;
         submitBtn.textContent = "Увійти";
      }
   });

   return page;
}
