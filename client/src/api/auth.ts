import { request } from "../utils/request";
import { setToken, removeToken } from "../utils/token";
import { setUser, clearUser } from "../utils/store";
import type { AuthResponse, RegisterBody, LoginBody, UserPublic } from "../types";

const BASE = "/api/auth";

export async function register(data: RegisterBody): Promise<AuthResponse> {
   const res = await request<AuthResponse>(`${BASE}/register`, {
      method: "POST",
      body: data,
   });
   setToken(res.token);
   setUser(res.user);
   return res;
}

export async function login(data: LoginBody): Promise<AuthResponse> {
   const res = await request<AuthResponse>(`${BASE}/login`, {
      method: "POST",
      body: data,
   });
   setToken(res.token);
   setUser(res.user);
   return res;
}

export async function getMe(): Promise<UserPublic> {
   const res = await request<{ user: UserPublic }>(`${BASE}/me`);
   setUser(res.user);
   return res.user;
}

export function logout(): void {
   removeToken();
   clearUser();
}
