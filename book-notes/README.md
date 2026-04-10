# 📚 Book Notes

A personal book notes app inspired by [Derek Sivers' book list](https://sive.rs/book).

Track every book you read: covers, ratings, notes, and read dates.
Sort by rating, recency, or title. Full CRUD with a PostgreSQL database.

## Tech Stack

- Node.js + Express
- EJS (templating)
- PostgreSQL + `pg` driver
- Open Library Covers API (no key required)
- dotenv, Axios, nodemon

## Prerequisites

- Node.js v18+
- PostgreSQL installed and running locally

## First-Time Setup

### 1. Clone and install
```bash
git clone <your-repo-url>
cd book-notes
npm install
```

### 2. Create the database
Open your terminal and run:
```bash
psql postgres
```
Then inside the psql shell:
```sql
CREATE DATABASE book_notes;
\c book_notes
CREATE TABLE books (
  id        SERIAL PRIMARY KEY,
  title     TEXT NOT NULL,
  author    TEXT NOT NULL,
  isbn      TEXT,
  rating    INTEGER CHECK (rating >= 1 AND rating <= 10),
  notes     TEXT,
  date_read DATE
);
\q
```

### 3. Create your `.env` file
Create a file called `.env` in the project root:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=book_notes
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
PORT=3000

Run `whoami` in your terminal to find your postgres username.


### 4. File Structure
```
book-notes/
├── public/              ← Static files served directly to the browser
│   ├── styles.css
│   └── script.js
├── views/               ← EJS templates (HTML with injected data)
│   ├── index.ejs        ← Homepage — lists all books
│   ├── add.ejs          ← Form to add a new book
│   └── edit.ejs         ← Form to edit an existing book
├── .env                 ← Your secrets — DB credentials. NEVER commit this.
├── .gitignore           ← Tells Git what to ignore
├── db.js                ← PostgreSQL connection. One file, imported everywhere.
├── index.js             ← Express server — all your routes live here
├── package.json         ← Project metadata and dependency list
└── README.md            ← Instructions for running the project
```

### 5. Run the development server
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000)

## How to Find an ISBN

The ISBN is the 10 or 13-digit number on the back of the book under the barcode.
You can also find it by searching the book title at [openlibrary.org](https://openlibrary.org).