import dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

const db = new Pool ({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// Test the connection when the server starts
db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB connection error:", err.message));

export default db;