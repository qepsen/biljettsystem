import dotenv from "dotenv";

// Växlar automatiskt mellan .env.development och .env.production
// beroende på NODE_ENV. Löser "dev vs. prod"-problemet i README.
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
