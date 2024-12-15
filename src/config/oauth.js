// src/config/oauth.js
require("dotenv").config();
const { AuthorizationCode } = require("simple-oauth2");

const client = new AuthorizationCode({
  client: {
    id: process.env.QBO_CLIENT_ID,
    secret: process.env.QBO_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://oauth.platform.intuit.com",
    authorizeHost: "https://appcenter.intuit.com",
    authorizePath: "/connect/oauth2",
    tokenPath: "/oauth2/v1/tokens/bearer",
  },
});

module.exports = client;
