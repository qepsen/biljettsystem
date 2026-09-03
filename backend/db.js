import Database from "better-sqlite3";

// Tester körs mot en databas i minnet, så de aldrig påverkar tickets.db
const dbFile = process.env.NODE_ENV === "test" ? ":memory:" : "tickets.db";

const db = new Database(dbFile);

db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    used INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    used_at TEXT
  )
`);

export default db;
