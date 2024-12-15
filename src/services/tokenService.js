// src/services/tokenService.js
const pool = require("../config/db");

async function storeTokens({ realmId, accessToken, refreshToken, expiresAt }) {
  const query = `
    INSERT INTO auth_tokens (realm_id, access_token, refresh_token, token_expires_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW())
    ON CONFLICT (realm_id)
    DO UPDATE SET
      access_token = EXCLUDED.access_token,
      refresh_token = EXCLUDED.refresh_token,
      token_expires_at = EXCLUDED.token_expires_at,
      updated_at = NOW()
    RETURNING *;
  `;

  // Replace realmId, accessToken, refreshToken, and expiresAt with the actual values obtained from OAuth callback
  const values = [realmId, accessToken, refreshToken, expiresAt];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getTokensByRealmId(realmId) {
  const query = `SELECT * FROM auth_tokens WHERE realm_id = $1`;
  const { rows } = await pool.query(query, [realmId]);
  return rows[0] || null;
}

module.exports = { storeTokens, getTokensByRealmId };
