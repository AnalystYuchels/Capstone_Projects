import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5,
  idleTimeoutMillis: 0, // 👈 IMPORTANT: disables client-side idle kill
  connectionTimeoutMillis: 10000
});

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err);
});

export default {
  query: (text, params) => pool.query(text, params),
};