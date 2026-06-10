import { getMe } from "../api/auth";
import { getSubscriptions, getStatus, activate } from "../api/subscription";
import { setUser } from "../utils/store";
import { createPage } from "../components/page";
import { formatDate } from "../utils/format";
import { navigate } from "../router";
import type { Subscription, SubscriptionStatus, UserPublic } from "../types";

export async function renderProfile(): Promise<HTMLElement> {
   const { page, content } = createPage();

   content.innerHTML = `<div class="container"><div id="profile-inner"></div></div>`;
   const inner = content.querySelector<HTMLDivElement>("#profile-inner")!;

   const params = new URLSearchParams(location.search);
   const upgradeReason = params.get("reason");

   if (upgradeReason) {
      const banner = document.createElement("div");
      banner.className = "error-message";
      banner.textContent = decodeURIComponent(upgradeReason);
      inner.appendChild(banner);
   }

   const [user, status, subscriptions] = await Promise.all([
      getMe(),
      getStatus().catch(
         (): SubscriptionStatus => ({
            subscription_type: null,
            subscription_id: null,
            expires_at: null,
         }),
      ),
      getSubscriptions().catch(() => [] as Subscription[]),
   ]);

   setUser(user);

   inner.appendChild(renderProfileHeader(user, status));

   const grid = document.createElement("div");
   grid.className = "profile__grid";
   grid.appendChild(renderPersonalInfo(user));
   grid.appendChild(renderSubscriptionCard(user, status));
   inner.appendChild(grid);

   inner.appendChild(renderPlanPicker(subscriptions, user, status, inner));

   return page;
}

function renderProfileHeader(user: UserPublic, status: SubscriptionStatus): HTMLElement {
   const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

   const el = document.createElement("div");
   el.className = "profile__header";

   const subBadge = getSubBadge(user, status);

   el.innerHTML = `
    <div class="profile__avatar">${initials}</div>
    <div>
      <div class="profile__name">${user.first_name} ${user.last_name}</div>
      <div class="profile__email">${user.email}</div>
      ${subBadge}
    </div>
  `;

   return el;
}

function renderPersonalInfo(user: UserPublic): HTMLElement {
   const card = document.createElement("div");
   card.className = "profile__card";
   card.innerHTML = `
    <div class="profile__card-title">Особисті дані</div>
    <div class="profile__info-row">
      <span>Ім'я</span>
      <span>${user.first_name}</span>
    </div>
    <div class="profile__info-row">
      <span>Фамілія</span>
      <span>${user.last_name}</span>
    </div>
    <div class="profile__info-row">
      <span>Електронна пошта</span>
      <span>${user.email}</span>
    </div>
    <div class="profile__info-row">
      <span>Профіль створено</span>
      <span>${formatDate(user.created_at)}</span>
    </div>
  `;
   return card;
}

function renderSubscriptionCard(user: UserPublic, status: SubscriptionStatus): HTMLElement {
   const card = document.createElement("div");
   card.className = "profile__card";

   const hasActiveSub = status.subscription_id !== null && status.subscription_type !== "free";

   card.innerHTML = `
    <div class="profile__card-title">Підписка</div>
    <div class="profile__info-row">
      <span>Тип підписки</span>
      <span>${status.subscription_type ?? "—"}</span>
    </div>
    <div class="profile__info-row">
      <span>Ідентифікатор</span>
      <span>${status.subscription_id ?? "—"}</span>
    </div>
    <div class="profile__info-row">
      <span>Закінчується</span>
      <span>${status.expires_at ? formatDate(status.expires_at) : "—"}</span>
    </div>
    <div class="profile__sub-actions">
      <button class="btn btn--ghost btn--sm" id="change-plan-btn">
        Змінити план
      </button>
      ${
         hasActiveSub
            ? `
        <button class="btn btn--accent btn--sm" id="cancel-sub-btn">
          Скасувати
        </button>
      `
            : ""
      }
    </div>
  `;

   card.querySelector("#cancel-sub-btn")?.addEventListener("click", async () => {
      const btn = card.querySelector<HTMLButtonElement>("#cancel-sub-btn")!;
      btn.disabled = true;
      btn.textContent = "Скасовуємо...";
      try {
         await activate(1);
         navigate("/profile");
      } catch (err) {
         alert(err instanceof Error ? err.message : "Помилка скасування");
         btn.disabled = false;
         btn.textContent = "Скасувати";
      }
   });

   return card;
}

function renderPlanPicker(subscriptions: Subscription[], user: UserPublic, status: SubscriptionStatus, container: HTMLElement): HTMLElement {
   const picker = document.createElement("div");
   picker.className = "plan-picker";
   picker.id = "plan-picker";

   let selectedId: number = status.subscription_id ?? 1;

   picker.innerHTML = `
    <div class="plan-picker__title">Оберіть план</div>
    <div class="plan-picker__list" id="plan-list"></div>
    <div class="plan-picker__actions">
      <button class="btn btn--primary" id="confirm-plan-btn">Підтвердити</button>
      <button class="btn btn--ghost" id="cancel-picker-btn">Скасувати</button>
    </div>
  `;

   const planList = picker.querySelector<HTMLDivElement>("#plan-list")!;

   subscriptions.forEach((sub) => {
      const item = document.createElement("div");
      item.className = `plan-picker__item${sub.subscription_id === selectedId ? " plan-picker__item--selected" : ""}`;
      item.dataset.id = String(sub.subscription_id);
      item.innerHTML = `
      <div class="plan-picker__name">${sub.type}</div>
      <div class="plan-picker__price">
        ${sub.price === 0 ? "Безкоштовно" : `${sub.price} грн`}
      </div>
      ${sub.price > 0 ? `<div class="plan-picker__price-note">в місяць</div>` : ""}
    `;

      item.addEventListener("click", () => {
         planList.querySelectorAll(".plan-picker__item").forEach((i) => i.classList.remove("plan-picker__item--selected"));
         item.classList.add("plan-picker__item--selected");
         selectedId = sub.subscription_id;
      });

      planList.appendChild(item);
   });

   picker.querySelector("#confirm-plan-btn")!.addEventListener("click", async () => {
      const btn = picker.querySelector<HTMLButtonElement>("#confirm-plan-btn")!;
      btn.disabled = true;
      btn.textContent = "Активуємо...";
      try {
         await activate(selectedId);
         navigate("/profile");
      } catch (err) {
         alert(err instanceof Error ? err.message : "Помилка активації");
         btn.disabled = false;
         btn.textContent = "Підтвердити";
      }
   });

   picker.querySelector("#cancel-picker-btn")!.addEventListener("click", () => {
      picker.classList.remove("plan-picker--visible");
   });

   container.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "change-plan-btn") {
         picker.classList.toggle("plan-picker--visible");
         picker.scrollIntoView({ behavior: "smooth", block: "start" });
      }
   });

   return picker;
}

function getSubBadge(user: UserPublic, status: SubscriptionStatus): string {
   if (!status.subscription_id) {
      return `<span class="profile__sub-badge profile__sub-badge--none">Немає підписки</span>`;
   }
   if (status.subscription_type === "free") {
      return `<span class="profile__sub-badge profile__sub-badge--free">Безкоштовна</span>`;
   }
   const expires = status.expires_at ? ` (активна до ${formatDate(status.expires_at)})` : "";
   return `<span class="profile__sub-badge profile__sub-badge--active">
    ${status.subscription_type}${expires}
  </span>`;
}
