import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "./db.js";

dotenv.config();

process.on("unhandledRejection", (err) => {
  console.error("🔥 Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.get("/", async (req, res) => {
  const sort = req.query.sort || "recency";

  const sortOptions = {
    rating: "rating DESC NULLS LAST",
    recency: "date_read DESC NULLS LAST",
    title: "title ASC",
  };

  const orderBy = sortOptions[sort] || sortOptions.recency;

  try {
    const result = await db.query(
      `SELECT * FROM books ORDER BY ${orderBy}`
    );

    res.render("index", {
      books: result.rows,
      sort,
    });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).send("Something went wrong. Please try again.");
  }
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  const { title, author, isbn, rating, notes, date_read } = req.body;

  try {
    await db.query(
      `INSERT INTO books (title, author, isbn, rating, notes, date_read)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        title,
        author,
        isbn || null,
        rating || null,
        notes || null,
        date_read || null,
      ]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error inserting book:", err.message);
    res.status(500).send("Failed to add book.");
  }
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Book not found.");
    }

    res.render("edit", { book: result.rows[0] });
  } catch (err) {
    console.error("Error fetching book:", err.message);
    res.status(500).send("Failed to load book.");
  }
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, rating, notes, date_read } = req.body;

  try {
    await db.query(
      `UPDATE books
       SET title=$1, author=$2, isbn=$3, rating=$4, notes=$5, date_read=$6
       WHERE id=$7`,
      [
        title,
        author,
        isbn || null,
        rating || null,
        notes || null,
        date_read || null,
        id,
      ]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).send("Failed to update book.");
  }
});

app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).send("Failed to delete book.");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`📚 Book Notes running on port ${PORT}`);
});