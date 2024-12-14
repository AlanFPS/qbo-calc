// src/server.js
require("dotenv").config();
const express = require("express");
const app = express();

// Basic Middleware
app.use(express.json());

// Basic Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
