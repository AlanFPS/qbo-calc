// src/services/qboService.js

const axios = require("axios");
const { getTokensByRealmId } = require("./tokenService");

/**
 * Fetch an estimate from QBO given an estimateId and realmId.
 *
 * @param {string} realmId - The QBO Realm ID stored in the database.
 * @param {string} estimateId - The QBO Estimate ID to fetch.
 * @returns {Object} The Estimate object from QBO.
 */
async function getEstimate(realmId, estimateId) {
  // Retrieve tokens from DB
  const tokenData = await getTokensByRealmId(realmId);

  if (!tokenData) {
    throw new Error(`No tokens found for realmId: ${realmId}`);
  }

  // Construct QBO API URL
  // NOTE: If sandbox, use 'sandbox-quickbooks.api.intuit.com'.
  // If production, use 'quickbooks.api.intuit.com'
  const baseUrl = "https://sandbox-quickbooks.api.intuit.com";
  const url = `${baseUrl}/v3/company/${realmId}/estimate/${estimateId}?minorversion=73`;

  const headers = {
    Authorization: `Bearer ${tokenData.access_token}`, // tokenData.access_token comes from DB
    Accept: "application/json",
  };

  const response = await axios.get(url, { headers });
  return response.data.Estimate;
}

module.exports = { getEstimate };
