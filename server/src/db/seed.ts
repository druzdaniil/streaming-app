import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.resolve(__dirname, "../../database/database.sqlite");
const SEED_PATH = path.resolve(__dirname, "../../database/seed.sql");

const TABLES_TO_CLEAR = ["reviews", "content_actors", "content_directors", "content_genres", "episodes", "seasons", "series", "films", "content", "transactions", "users", "genres", "actors", "directors", "subscriptions", "sqlite_sequence"] as const;

export function seedDatabase(): void {
   if (!fs.existsSync(DB_PATH)) {
      throw new Error("БД не знайдено. Спочатку запустіть init-db.ts для ініціалізації схеми.");
   }

   const db = new Database(DB_PATH);

   try {
      db.pragma("journal_mode = WAL");

      const seed = fs.readFileSync(SEED_PATH, "utf-8");

      db.transaction(() => {
         db.pragma("foreign_keys = OFF");

         for (const table of TABLES_TO_CLEAR) {
            db.exec(`DELETE FROM ${table};`);
         }

         db.pragma("foreign_keys = ON");

         db.exec(seed);
      })();

      const fkViolations = db.pragma("foreign_key_check") as unknown[];
      if (fkViolations.length > 0) {
         throw new Error(`Знайдено порушення зовнішніх ключів після seed:\n${JSON.stringify(fkViolations, null, 2)}`);
      }

      console.log("БД успішно заповнено тестовими даними");
   } finally {
      db.close();
   }
}

if (require.main === module) {
   seedDatabase();
}
