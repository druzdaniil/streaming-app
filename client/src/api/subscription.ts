import { request } from "../utils/request";
import type { Subscription, SubscriptionStatus, UserPublic } from "../types";

const BASE = "/api/subscription";

export async function getSubscriptions(): Promise<Subscription[]> {
   const res = await request<{ subscriptions: Subscription[] }>(BASE);
   return res.subscriptions;
}

export async function getStatus(): Promise<SubscriptionStatus> {
   return request<SubscriptionStatus>(`${BASE}/status`);
}

export async function activate(subscription_id: number): Promise<{ message: string; user: UserPublic }> {
   return request<{ message: string; user: UserPublic }>(`${BASE}/activate`, {
      method: "POST",
      body: { subscription_id },
   });
}
