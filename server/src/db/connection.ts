import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.resolve(__dirname, "../../database/database.sqlite");

const SCHEMA_PATH = path.resolve(__dirname, "../../database/schema.sql");

const db = new Database(DB_PATH);

db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
db.exec(schema);

export default db;
