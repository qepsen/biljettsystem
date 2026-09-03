import express from "express";
import cors from "cors";
import crypto from "crypto";
import db from "./db.js";

const app = express();

// CORS: bara den här origin får anropa API:et.
// Adressen kommer från .env, så den kan bytas mellan dev och prod
// utan att koden ändras. Se "Vanliga misstag" i README.
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));

app.use(express.json());

function generateCode() {
  return crypto.randomUUID().slice(0, 8).toUpperCase();
}

// Skapa en ny biljett
app.post("/api/tickets", (req, res) => {
  const code = generateCode();
  db.prepare("INSERT INTO tickets (code) VALUES (?)").run(code);
  res.status(201).json({ code });
});

// Lista alla biljetter
app.get("/api/tickets", (req, res) => {
  const tickets = db
    .prepare(
      "SELECT code, used, created_at, used_at FROM tickets ORDER BY created_at DESC"
    )
    .all();
  res.json(tickets);
});

// Använd en biljett (kan bara göras en gång)
app.post("/api/tickets/:code/use", (req, res) => {
  const { code } = req.params;
  const ticket = db.prepare("SELECT * FROM tickets WHERE code = ?").get(code);

  if (!ticket) {
    return res.status(404).json({ error: "Biljetten hittades inte" });
  }
  if (ticket.used) {
    return res.status(400).json({ error: "Biljetten är redan använd" });
  }

  db.prepare(
    "UPDATE tickets SET used = 1, used_at = datetime('now') WHERE code = ?"
  ).run(code);

  res.json({ message: "Biljetten är nu använd" });
});

// Radera en biljett, bara om den inte är använd
app.delete("/api/tickets/:code", (req, res) => {
  const { code } = req.params;
  const ticket = db.prepare("SELECT * FROM tickets WHERE code = ?").get(code);

  if (!ticket) {
    return res.status(404).json({ error: "Biljetten hittades inte" });
  }
  if (ticket.used) {
    return res.status(400).json({ error: "Använda biljetter kan inte raderas" });
  }

  db.prepare("DELETE FROM tickets WHERE code = ?").run(code);
  res.json({ message: "Biljetten raderad" });
});

export default app;
