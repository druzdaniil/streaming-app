import { getToken, removeToken } from "./token";
import type { ApiError } from "../types";

export class ApiException extends Error {
   constructor(
      public readonly status: number,
      message: string,
      public readonly required_subscription?: string,
      public readonly content_title?: string,
   ) {
      super(message);
      this.name = "ApiException";
   }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
   body?: unknown;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
   const { body, headers: extraHeaders, ...rest } = options;

   const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(extraHeaders as Record<string, string>),
   };

   const token = getToken();
   if (token) {
      headers["Authorization"] = `Bearer ${token}`;
   }

   const response = await fetch(`${API_BASE}${url}`, {
      ...rest,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
   });

   if (!response.ok) {
      if (response.status === 401) {
         removeToken();
      }

      let message = `HTTP ${response.status}`;
      let required_subscription: string | undefined;
      let content_title: string | undefined;

      try {
         const err = (await response.json()) as ApiError & {
            required_subscription?: string;
            content_title?: string;
         };
         if (err.error) message = err.error;
         required_subscription = err.required_subscription;
         content_title = err.content_title;
      } catch {}

      throw new ApiException(response.status, message, required_subscription, content_title);
   }

   if (response.status === 204) {
      return {} as T;
   }

   return response.json() as Promise<T>;
}
