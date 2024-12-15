// src/routes/testQBO.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// TEMPORARY in-memory storage (Phase 3 will move this to DB)
let accessToken;
let realmId;

router.post("/setTokens", (req, res) => {
  // For testing: you’ll POST tokens and realmId from Postman or temporary code
  const { token, realm } = req.body;
  if (!token || !realm) return res.status(400).send("Missing token or realm");
  accessToken = token;
  realmId = realm;
  res.send("Tokens set");
});

router.get("/companyinfo", async (req, res) => {
  if (!accessToken || !realmId)
    return res.status(400).send("Missing tokens or realmId");

  const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/companyinfo/${realmId}?minorversion=65`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching company info:",
      error.response?.data || error.message
    );
    res.status(500).send("Error fetching company info");
  }
});

module.exports = router;
