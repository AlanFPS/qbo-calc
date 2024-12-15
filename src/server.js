// src/server.js
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json()); // This should be always before route registration

const authRoutes = require("./routes/auth");
const testQBORoutes = require("./routes/testQBO");
const calculationsRoutes = require("./routes/calculations");

app.use("/auth", authRoutes);
app.use("/test", testQBORoutes);
app.use("/calculations", calculationsRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
