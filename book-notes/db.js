import pg from "pg";

const { Pool } = pg;

const db = new Pool ({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB connection failed:", err.message));

export default db;