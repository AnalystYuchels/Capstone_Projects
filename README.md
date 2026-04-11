# Capstone Projects

A collection of full-stack web development projects built while learning modern web development. Each project represents a distinct milestone, a new concept mastered, a new tool picked up, or a real problem solved through code.

This folder grows over time. Projects are listed in order of completion.

---

## Table of Contents

- [Tech Stack Overview](#tech-stack-overview)
- [Key Learnings](#key-learnings)
- [How to Run Any Project Locally](#how-to-run-any-project-locally)
- [Roadmap](#roadmap)

---

## Tech Stack Overview

These are the core technologies used across the projects so far. New tools will be added as the portfolio grows.

| Technology | What It Is | Projects Used In |
|---|---|---|
| **HTML/CSS/JS** | The fundamentals of the web | All projects |
| **Node.js** | Runs JavaScript outside the browser (on a server) | RestCountries, Book Notes |
| **Express** | A framework for building web servers with Node.js | RestCountries, Book Notes |
| **EJS** | Embeds JavaScript into HTML templates for server-side rendering | RestCountries, Book Notes |
| **Axios** | Makes HTTP requests to external APIs from Node.js | RestCountries |
| **PostgreSQL** | A powerful open-source relational database | Book Notes |
| **pg (node-postgres)** | Connects a Node.js app to a PostgreSQL database | Book Notes |
| **dotenv** | Keeps sensitive credentials out of source code | RestCountries, Book Notes |
| **Git & GitHub** | Version control and remote code storage | All projects |

---

## Key Learnings

A running log of the most important concepts and lessons picked up during these projects.

### Server-Side Rendering vs. Client-Side Rendering
In server-side rendering (SSR), the server builds the complete HTML page before sending it to the browser. In client-side rendering (CSR), the browser downloads JavaScript and builds the page itself. Both RestCountries and Book Notes use SSR via EJS.

### How Express Routing Works
Express listens for HTTP requests at specific URLs (routes) and runs a handler function when a match is found. For example, `app.get('/country', handler)` runs `handler` whenever someone visits `/country` in their browser.

### How to Consume a REST API from the Backend
Rather than calling an API directly from the browser (which can expose API keys), a backend server makes the request on the user's behalf, processes the data, and sends only what the frontend needs. Axios is the tool used to make those backend-to-API requests.

### CRUD and Databases
Every persistent web app at its core is doing four operations: **Create** (INSERT), **Read** (SELECT), **Update** (UPDATE), and **Delete** (DELETE). These SQL operations map directly to the four main HTTP methods: POST, GET, PUT/PATCH, DELETE.

### Environment Variables and Security
Sensitive data like API keys, database passwords, and port numbers should never be hardcoded in source code or committed to GitHub. The `dotenv` package loads them from a local `.env` file that is excluded from version control via `.gitignore`.

### Debugging Methodology
The debugging process developed across these projects:
1. Read the error message carefully — it usually tells you the file and line number
2. Check the most recent change made before the error appeared
3. `console.log()` is a powerful first tool — log variables at the point of failure
4. Search the exact error message if it's unfamiliar
5. Check common culprits: wrong paths, wrong variable names, wrong directory when running commands

---

## How to Run Any Project Locally

All projects in this folder follow the same general setup pattern:

```bash
# Step 1: Clone the repository (if you haven't already)
git clone https://github.com/YOUR_USERNAME/Capstone_Projects.git

# Step 2: Navigate into the specific project folder
cd Capstone_Projects/PROJECT_NAME

# Step 3: Install Node.js dependencies
npm install

# Step 4: Create a .env file — check the project's README section for the exact variables needed

# Step 5: Start the server
node index.js

# Step 6: Visit http://localhost:3000 in your browser
```

**Requirements for all Node.js projects:**
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

**Additional requirements for database projects (Book Notes):**
- [PostgreSQL](https://www.postgresql.org/) installed and running locally

---

## Roadmap

Future projects planned as learning continues:

- [ ] **Authentication App** — User login and registration with sessions or JWTs
- [ ] **REST API** — Build a backend API (without a frontend) for a to-do list or similar app
- [ ] **React Frontend** — Rebuild one of the existing projects using React on the client side
- [ ] **Full-Stack App with React + Express** — Connect a React frontend to an Express/PostgreSQL backend
