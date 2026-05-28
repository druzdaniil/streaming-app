import { getToken, removeToken } from "./token";
import type { ApiError } from "../types";

export class ApiException extends Error {
   constructor(
      public readonly status: number,
      message: string,
   ) {
      super(message);
      this.name = "ApiException";
   }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
   body?: unknown;
}

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

   const response = await fetch(url, {
      ...rest,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
   });

   if (!response.ok) {
      if (response.status === 401) {
         removeToken();
      }

      let message = `HTTP ${response.status}`;
      try {
         const err = (await response.json()) as ApiError;
         if (err.error) message = err.error;
      } catch {}
      throw new ApiException(response.status, message);
   }

   if (response.status === 204) {
      return {} as T;
   }

   return response.json() as Promise<T>;
}
