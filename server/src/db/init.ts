import fs from "fs";
import path from "path";
import db from "./connection";

const DB_PATH = path.resolve(__dirname, "../../database/database.sqlite");
const SCHEMA_PATH = path.resolve(__dirname, "../../sql/schema.sql");

export function initDatabase(): void {
   const dbExists = fs.existsSync(DB_PATH);

   try {
      const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");

      db.transaction(() => {
         db.exec(schema);
      })();

      const integrityCheck = db.pragma("integrity_check") as {
         integrity_check: string;
      }[];
      if (integrityCheck[0].integrity_check !== "ok") {
         throw new Error(`Перевірка цілісності БД не пройшла: ${JSON.stringify(integrityCheck)}`);
      }

      console.log(dbExists ? "Схему БД оновлено" : "БД успішно ініціалізовано");
   } catch (error) {
      if (!dbExists && fs.existsSync(DB_PATH)) {
         fs.unlinkSync(DB_PATH);
      }
      throw error;
   }
}
