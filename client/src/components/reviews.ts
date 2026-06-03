import { createReview, deleteReview } from "../api/reviews";
import { isLoggedIn, getUser } from "../utils/store";
import { formatDateLong } from "../utils/format";
import type { ReviewPublic } from "../types";

export function renderReviewsSection(contentId: number, initialReviews: ReviewPublic[]): HTMLElement {
   const loggedIn = isLoggedIn();
   const user = getUser();

   const section = document.createElement("div");
   section.className = "reviews";
   section.innerHTML = `
    <h2 class="reviews__title">Відгуки</h2>
    <div id="review-form-wrap"></div>
    <div id="review-error" class="error-message" style="display:none"></div>
    <div class="reviews__list" id="reviews-list"></div>
  `;

   const formWrap = section.querySelector<HTMLDivElement>("#review-form-wrap")!;
   const errorEl = section.querySelector<HTMLDivElement>("#review-error")!;
   const reviewList = section.querySelector<HTMLDivElement>("#reviews-list")!;

   if (loggedIn) {
      formWrap.appendChild(renderReviewForm(contentId, errorEl, reviewList, user!.user_id));
   } else {
      formWrap.innerHTML = `
      <div class="reviews__login-prompt">
        <a href="/login">Увійдіть</a>, щоб залишити відгук
      </div>
    `;
   }

   renderReviewList(reviewList, initialReviews, user?.user_id ?? null);
   return section;
}

function renderReviewForm(contentId: number, errorEl: HTMLElement, listEl: HTMLElement, userId: number): HTMLElement {
   let rating = 8;

   const form = document.createElement("div");
   form.className = "reviews__form";
   form.innerHTML = `
    <span class="reviews__form-hint">Ваш відгук (рейтинг 1-10, до 1000 символів)</span>
    <textarea class="input" id="review-text" rows="3"
      placeholder="Напишіть свої враження..."></textarea>
    <div class="reviews__rating-row">
      <span class="reviews__rating-label">Оцінка</span>
      <div class="reviews__rating-controls">
        <button class="reviews__rating-btn" id="rating-minus">−</button>
        <span class="reviews__rating-value" id="rating-value">${rating}</span>
        <button class="reviews__rating-btn" id="rating-plus">+</button>
      </div>
      <button class="btn btn--primary btn--sm" id="submit-review">Надіслати</button>
    </div>
  `;

   const ratingValue = form.querySelector<HTMLSpanElement>("#rating-value")!;
   const textArea = form.querySelector<HTMLTextAreaElement>("#review-text")!;

   form.querySelector("#rating-minus")!.addEventListener("click", () => {
      if (rating > 1) {
         rating--;
         ratingValue.textContent = String(rating);
      }
   });
   form.querySelector("#rating-plus")!.addEventListener("click", () => {
      if (rating < 10) {
         rating++;
         ratingValue.textContent = String(rating);
      }
   });

   form.querySelector("#submit-review")!.addEventListener("click", async () => {
      const text = textArea.value.trim();
      errorEl.style.display = "none";

      if (!text) {
         errorEl.textContent = "Введіть текст відгуку";
         errorEl.style.display = "block";
         return;
      }
      if (text.length > 1000) {
         errorEl.textContent = "Текст не може перевищувати 1000 символів";
         errorEl.style.display = "block";
         return;
      }

      try {
         const review = await createReview(contentId, { text, rating });
         textArea.value = "";
         rating = 8;
         ratingValue.textContent = "8";
         const existing = listEl.querySelector(".reviews__item");
         const newItem = renderReviewItem(review, userId);
         existing ? listEl.insertBefore(newItem, existing) : listEl.appendChild(newItem);
      } catch (err) {
         errorEl.textContent = err instanceof Error ? err.message : "Помилка надсилання";
         errorEl.style.display = "block";
      }
   });

   return form;
}

function renderReviewList(listEl: HTMLElement, reviews: ReviewPublic[], currentUserId: number | null): void {
   if (!reviews.length) {
      listEl.innerHTML = `<p class="empty-state">Відгуків ще немає. Будьте першим!</p>`;
      return;
   }
   reviews.forEach((r) => listEl.appendChild(renderReviewItem(r, currentUserId)));
}

function renderReviewItem(review: ReviewPublic, currentUserId: number | null): HTMLElement {
   const initials = `${review.first_name[0]}${review.last_name[0]}`.toUpperCase();
   const isOwn = currentUserId === review.user_id;

   const el = document.createElement("div");
   el.className = "reviews__item";

   el.innerHTML = `
    <div class="reviews__item-header">
      <div class="reviews__avatar">${initials}</div>
      <div class="reviews__item-meta">
        <div class="reviews__item-name">${review.first_name} ${review.last_name}</div>
        <div class="reviews__item-date">${formatDateLong(review.created_at)}</div>
      </div>
      <span class="reviews__item-rating">${review.rating}/10</span>
      ${isOwn ? `<button class="reviews__delete" data-delete="${review.review_id}">Видалити</button>` : ""}
    </div>
  `;

   const textEl = document.createElement("p");
   textEl.className = "reviews__item-text";
   textEl.textContent = review.text;
   el.appendChild(textEl);

   if (isOwn) {
      el.querySelector("[data-delete]")!.addEventListener("click", async () => {
         try {
            await deleteReview(review.review_id);
            el.remove();
         } catch (err) {
            alert(err instanceof Error ? err.message : "Помилка видалення");
         }
      });
   }

   return el;
}
