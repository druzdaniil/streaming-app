import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.resolve(__dirname, "../../database/database.sqlite");
const SEED_PATH = path.resolve(__dirname, "../../database/seed.sql");

const db = new Database(DB_PATH);
db.pragma("foreign_keys = ON");

const seed = fs.readFileSync(SEED_PATH, "utf-8");

const run = db.transaction(() => {
   db.exec(`
    DELETE FROM reviews;
    DELETE FROM content_actors;
    DELETE FROM content_directors;
    DELETE FROM content_genres;
    DELETE FROM episodes;
    DELETE FROM seasons;
    DELETE FROM series;
    DELETE FROM films;
    DELETE FROM content;
    DELETE FROM transactions;
    DELETE FROM users;
    DELETE FROM genres;
    DELETE FROM actors;
    DELETE FROM directors;
    DELETE FROM subscriptions;
    DELETE FROM sqlite_sequence;
  `);

   db.exec(seed);
});

run();
console.log("БД успішно заповнено тестовими даними");
db.close();
