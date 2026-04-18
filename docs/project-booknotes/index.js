import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import db from "./db.js";

// Load .env variables early - before anything reads process.env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Fetch all books and render the homepage
app.get("/", async (req, res) => {
  const sort = req.query.sort || "recency";

  const sortOptions = {
    rating: "rating DESC NULLS LAST",
    recency: "date_read DESC NULLS LAST",
    title: "title ASC"
  };

  const orderBy = sortOptions[sort] || sortOptions.recency;

  try {
    const result = await db.query(
      `SELECT * FROM books ORDER BY ${orderBy}`
    );

    res.render("index", {
      books: result.rows,
      sort: sort
    });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).send("Something went wrong. Please try again.");
  }
});

// Show the blank "add a book" form
app.get("/add", (req, res) => {
  res.render("add");
});

// Receive form data, insert a new book, redirect to home
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
        date_read || null
      ]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error inserting book:", err.message);
    res.status(500).send("Failed to add book. Please try again.");
  }
});

// Fetch one specific book, show it in a pre-filled edit form
app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Book not found.")
    }

    res.render("edit", { book: result.rows[0] });
  } catch (err) {
    console.error("Error fetching book for edit:", err.message);
    res.status(500).send("Failed to load book. Please try again.");
  }
});

// Receive updated form data, update the book in the DB
app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, rating, notes, date_read } = req.body;

  try {
    await db.query(
      `UPDATE books
      SET title=$1, author=$2, isbn=$3, rating=$4, notes=$5, date_read=$6
      WHERE id=$7`,
      [title, author, isbn || null, rating || null, notes || null, date_read || null, id]
    );

    res.redirect("/");

  } catch (err) {
    console.error("Error uploading book:", err.message);
    res.status(500).send("Failed to update book. Please try again.")
  }
});

// Delete a specific book from the database
app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);

    res.redirect("/");

  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).send("Failed to delete book. Please try again.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`📚 Book Notes running at http://localhost:${PORT}`);
});