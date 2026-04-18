# 🌍 RestCountries Explorer

A web application built with Node.js, Express, Axios, and EJS that lets users search for any country and view useful information such as its flag, capital, population, languages, currency, and more.

## 🚀 How to Run This Project

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/restcountries-explorer.git
cd restcountries-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in your browser
Visit: http://localhost:3000

## 🛠️ Built With
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [EJS](https://ejs.co/)
- [REST Countries API](https://restcountries.com/)

## 📁 Project Structure
```
restcountries-explorer/
├── public/
│   └── styles/
│       └── main.css       # Stylesheet
├── views/
│   ├── index.ejs          # Home/search page
│   └── country.ejs        # Country result page
├── index.js               # Express server
├── package.json           # Project config & dependencies
└── README.md              # This file
```

## 💡 Features
- Search any country by name
- Displays flag, capital, population, region, languages, currency, timezone, and driving side
- Error handling for invalid country names
- Clean, responsive UI