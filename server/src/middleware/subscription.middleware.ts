import { Request, Response, NextFunction } from "express";
import { getFilmById, getSeriesById } from "../models/content.model";
import { findById } from "../models/user.model";
import { getActiveTransaction } from "../models/subscription.model";

const FREE_RATING_LIMIT = 8.5;

const SUBSCRIPTION_LEVEL: Record<number, number> = {
   1: 0,
   2: 1,
   3: 2,
};

function parseId(param: string | string[]): number {
   return parseInt(Array.isArray(param) ? param[0] : param);
}

export function subscriptionMiddleware(req: Request, res: Response, next: NextFunction): void {
   const contentId = parseId(req.params.id);
   if (isNaN(contentId)) {
      next();
      return;
   }

   const isSeriesRoute = req.path.includes("/series/");
   const content = isSeriesRoute ? getSeriesById(contentId) : getFilmById(contentId);

   if (!content) {
      next();
      return;
   }

   if (!req.userId) {
      res.status(401).json({
         error: "Необхідна реєстрація для перегляду контенту",
         content_type: content.content_type,
         content_title: content.title,
      });
      return;
   }

   const user = findById(req.userId);
   if (!user) {
      res.status(401).json({ error: "Користувача не знайдено" });
      return;
   }

   const transaction = getActiveTransaction(req.userId);
   const activeSubscriptionId = transaction?.subscription_id ?? user.subscription_id ?? 1;
   const userLevel = SUBSCRIPTION_LEVEL[activeSubscriptionId] ?? 0;

   if (content.content_type === "series") {
      if (userLevel < 2) {
         res.status(403).json({
            error: `Для перегляду серіалів потрібна підписка "Преміум"`,
            required_subscription: "Преміум",
            content_type: content.content_type,
            content_title: content.title,
         });
         return;
      }
      next();
      return;
   }

   if (content.rating > FREE_RATING_LIMIT && userLevel < 1) {
      res.status(403).json({
         error: `Для перегляду фільмів з рейтингом вище ${FREE_RATING_LIMIT} потрібна підписка "Базова" або вище`,
         required_subscription: "Базова",
         content_type: content.content_type,
         content_title: content.title,
      });
      return;
   }

   next();
}
