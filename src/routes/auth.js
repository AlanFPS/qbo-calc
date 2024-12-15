// src/routes/auth.js
const express = require("express");
const router = express.Router();
const oauthClient = require("../config/oauth");
const { storeTokens } = require("../services/tokenService");
require("dotenv").config();

router.get("/connect", (req, res) => {
  const authorizationUri = oauthClient.authorizeURL({
    redirect_uri: process.env.QBO_REDIRECT_URI,
    scope: "com.intuit.quickbooks.accounting",
    state: "randomStringForCSRF",
  });
  res.redirect(authorizationUri);
});

router.get("/callback", async (req, res) => {
  const { code, state, realmId } = req.query;

  if (!code || !realmId) {
    return res.status(400).send("Missing code or realmId in callback");
  }

  const options = {
    code,
    redirect_uri: process.env.QBO_REDIRECT_URI,
  };

  try {
    const accessTokenResponse = await oauthClient.getToken(options);
    const tokenData = accessTokenResponse.token;

    const realm = realmId;
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Store tokens in DB
    await storeTokens({
      realmId: realm,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: expiresAt,
    });

    res.send("OAuth Successful! Tokens stored in DB.");
  } catch (err) {
    console.error("Error exchanging code for tokens:", err.message);
    res.status(500).send("Authentication failed.");
  }
});

module.exports = router;
