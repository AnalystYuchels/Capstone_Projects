import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App configuration
const app = express();
const port = process.env.port || 3000;

// Base URL for the REST Countries API
const api_base_url = "https://restcountries.com/v3.1";

// Middleware
// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());

// Tell express to use EJS and where to find views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Format raw country data from the API into a clean object
const formatCountryData = (data) => ({
  name: data.name?.common ?? "N/A",
  officialName: data.name?.official ?? "N/A",
  flag: data.flags?.svg ?? data.flags?.png ?? "",
  flagAlt: data.flags?.alt ?? `Flag of ${data.name?.common}`,
  capital: data.capital?.join(", ") ?? "N/A",
  region: data.region ?? "N/A",
  subregion: data.subregion ?? "N/A",
  population: data.population?.toLocaleString() ?? "N/A",
  languages: data.languages
    ? Object.values(data.languages).join(", ")
    : "N/A",
  currencies: data.currencies
    ? Object.values(data.currencies)
      .map((c) => `${c.name} (${c.symbol})`)
      .join(", ")
    : "N/A",
  timezone: data.timezones?.[0] ?? "N/A",
  drivingSide: data.car?.side ?? "N/A",
  independent: data.independent ? "Yes" : "No",
  unMember: data.independent ? "Yes" : "No",
  googleMaps: data.maps?.googleMaps ?? null,
});

// Routes
// GET / Home Page
app.get("/", (req, res) => {
  res.render("index", {error: null});
});

// POST / Handle search form submission
app.post("/search", async (req,res) => {
  const countryName = req.body.country?.trim();

  // if the input is empty, return early
  if (!countryName) {
    return res.render("index", {
      error: "Please enter a country name to search.",
    });
  }

  try {
    // Call the REST Countries API with the search term
    const { data } = await axios.get(
      `${api_base_url}/name/${encodeURIComponent(countryName)}`
    );
    
    // Format the first result from the returned array
    const country = formatCountryData(data[0]);

    // Render the country result page with the formatted data
    res.render("country", { country, error: null });

  } catch (error) {
    // Log the full error for the developer to debug
    console.error("API Error:", error.message);

    // Show a user-friendly message depending on the error type
    const userMessage = 
      error.response?.status === 404
        ? `No country found for "${countryName}". Check the spelling and try again.`
        : "Something went wrong. Please try again later.";

    res.render("index", { error: userMessage });
  }
});

// 404 Handler
// Catches any route that doesn't exist
app.use((req,res) => {
  res.status(404).render("index", {
    error: "Page not found. Let's get you back on track.",
  });
});

// Global Error Handler
// Catches any unexpected server errors
app.use((err, req,res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).render("index", {
    error: "An unexpected error occured. Please try again later.",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});