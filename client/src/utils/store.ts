import type { AppState, UserPublic } from "../types";

const state: AppState = {
   user: null,
   isAuthChecked: false,
};

export function getUser(): UserPublic | null {
   return state.user;
}

export function setUser(user: UserPublic | null): void {
   state.user = user;
}

export function isAuthChecked(): boolean {
   return state.isAuthChecked;
}

export function setAuthChecked(): void {
   state.isAuthChecked = true;
}

export function isLoggedIn(): boolean {
   return state.user !== null;
}

export function clearUser(): void {
   state.user = null;
}
