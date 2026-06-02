import { Request, Response } from "express";
import { findByEmail, createUser, findById } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import type { RegisterBody, LoginBody } from "../types/api.types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function register(req: Request, res: Response): Promise<void> {
   const { first_name, last_name, password } = req.body as RegisterBody;
   const email = req.body.email?.toLowerCase().trim();

   if (!first_name || !last_name || !email || !password) {
      res.status(400).json({ error: "Усі поля обов'язкові" });
      return;
   }

   if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: "Невірний формат email" });
      return;
   }

   const passwordError = validatePassword(password);
   if (passwordError) {
      res.status(400).json({ error: passwordError });
      return;
   }

   const existing = findByEmail(email);
   if (existing) {
      res.status(409).json({ error: "Користувач з таким email вже існує" });
      return;
   }

   const password_hash = await hashPassword(password);
   const userId = createUser({ first_name, last_name, email, password_hash });

   const token = signToken(userId);
   const user = findById(userId);

   if (!user) {
      res.status(500).json({ error: "Помилка створення користувача" });
      return;
   }

   res.status(201).json({ token, user });
}

export async function login(req: Request, res: Response): Promise<void> {
   const { password } = req.body as LoginBody;
   const email = req.body.email?.toLowerCase().trim();

   if (!email || !password) {
      res.status(400).json({ error: "Email та пароль обов'язкові" });
      return;
   }

   if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: "Невірний формат email" });
      return;
   }

   const user = findByEmail(email);
   if (!user) {
      res.status(401).json({ error: "Невірний email або пароль" });
      return;
   }

   const isValid = await comparePassword(password, user.password_hash);
   if (!isValid) {
      res.status(401).json({ error: "Невірний email або пароль" });
      return;
   }

   const token = signToken(user.user_id);
   const userPublic = findById(user.user_id);

   if (!userPublic) {
      res.status(500).json({ error: "Помилка отримання даних користувача" });
      return;
   }

   res.json({ token, user: userPublic });
}

export function getMe(req: Request, res: Response): void {
   const user = findById(req.userId!);

   if (!user) {
      res.status(404).json({ error: "Користувача не знайдено" });
      return;
   }

   res.json({ user });
}
