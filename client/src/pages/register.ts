// pages/register.ts

import { register } from "../api/auth";
import { navigate } from "../router";
import { isLoggedIn } from "../utils/store";
import { renderHeader } from "../components/header";
import type { RegisterBody } from "../types";

function validatePassword(password: string): string | null {
   if (password.length < 8) {
      return "Пароль має містити щонайменше 8 символів";
   }
   if (!/[0-9]/.test(password)) {
      return "Пароль має містити щонайменше одну цифру";
   }
   if (!/[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(password)) {
      return "Пароль має містити щонайменше одну літеру";
   }
   if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Пароль має містити щонайменше один спецсимвол";
   }
   return null;
}

export async function renderRegister(): Promise<HTMLElement> {
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
          <h1 class="auth-form__title">Реєстрація</h1>
          <p class="auth-form__subtitle">Створіть акаунт, щоб почати перегляд</p>
        </div>

        <div id="auth-error" class="error-message" style="display:none"></div>

        <form class="auth-form__body" id="register-form" novalidate>
          <div class="auth-form__row">
            <div class="form-group">
              <label for="first_name">Ім'я</label>
              <input class="input" type="text" id="first_name" name="first_name" placeholder="Введіть ваше ім'я..." />
            </div>
            <div class="form-group">
              <label for="last_name">Прізвище</label>
              <input class="input" type="text" id="last_name" name="last_name" placeholder="Введіть ваше прізвище..." />
            </div>
          </div>
          <div class="form-group">
            <label for="email">Електронна пошта</label>
            <input class="input" type="email" id="email" name="email" placeholder="Введіть ваш email..." />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input class="input" type="password" id="password" name="password" placeholder="Введіть пароль (мінімум 6 символів)..." />
          </div>
          <button type="submit" class="btn btn--primary auth-form__submit" id="submit-btn">
            Створити акаунт
          </button>
        </form>

        <p class="auth-form__footer">
          Вже є акаунт? <a href="/login">Увійти</a>
        </p>
      </div>
    </div>
  `;

   page.appendChild(content);

   const form = content.querySelector<HTMLFormElement>("#register-form")!;
   const errorEl = content.querySelector<HTMLDivElement>("#auth-error")!;
   const submitBtn = content.querySelector<HTMLButtonElement>("#submit-btn")!;

   function showError(msg: string): void {
      errorEl.textContent = msg;
      errorEl.style.display = "block";
   }

   form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorEl.style.display = "none";

      const data: RegisterBody = {
         first_name: (form.first_name as HTMLInputElement).value.trim(),
         last_name: (form.last_name as HTMLInputElement).value.trim(),
         email: (form.email as HTMLInputElement).value.trim(),
         password: (form.password as HTMLInputElement).value,
      };

      if (!data.first_name || !data.last_name || !data.email || !data.password) {
         showError("Заповніть усі поля");
         return;
      }

      const passwordError = validatePassword(data.password);
      if (passwordError) {
         showError(passwordError);
         return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Створюємо акаунт...";

      try {
         await register(data);
         navigate("/");
      } catch (err) {
         showError(err instanceof Error ? err.message : "Помилка реєстрації");
         submitBtn.disabled = false;
         submitBtn.textContent = "Створити акаунт";
      }
   });

   return page;
}
