import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Pool } = pg;

// Create a pool instance and export it
const db = new Pool ({
  host: process.env.DB_HOST, // "localhost" - from your .env file
  port: process.env.DB_PORT, // 5432 - PostgreSQL's default port
  database: process.env.DB_NAME, // "book_notes"
  user: process.env.DB_USER, // your system username
  password: process.env.DB_PASSWORD // your postgres password
});

// Test the connection when the server starts
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL database.");
  }
});

export default db;