import { Request, Response } from "express";
import { getAllSubscriptions, getSubscriptionById, getActiveTransaction, activateSubscription } from "../models/subscription.model";
import { findById } from "../models/user.model";

export function getSubscriptions(_req: Request, res: Response): void {
   const subscriptions = getAllSubscriptions();
   res.json({ subscriptions });
}

export function getStatus(req: Request, res: Response): void {
   const user = findById(req.userId!);

   if (!user) {
      res.status(404).json({ error: "Користувача не знайдено" });
      return;
   }

   const transaction = getActiveTransaction(req.userId!);

   res.json({
      subscription_type: user.subscription_type,
      subscription_id: user.subscription_id,
      expires_at: transaction ? transaction.expires_at : null,
   });
}

export function activate(req: Request, res: Response): void {
   const rawId = req.body.subscription_id;

   const subscription_id = parseInt(rawId);
   if (!rawId || isNaN(subscription_id)) {
      res.status(400).json({ error: "subscription_id обов'язковий і має бути числом" });
      return;
   }

   const subscription = getSubscriptionById(subscription_id);
   if (!subscription) {
      res.status(404).json({ error: "Підписку не знайдено" });
      return;
   }

   const existing = getActiveTransaction(req.userId!);
   if (existing && existing.subscription_id === subscription_id) {
      res.status(409).json({ error: "Ця підписка вже активна" });
      return;
   }

   activateSubscription(req.userId!, subscription_id);

   const user = findById(req.userId!);
   res.json({ message: "Підписку активовано", user });
}
