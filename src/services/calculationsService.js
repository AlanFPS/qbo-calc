// src/services/calculationsService.js
const pool = require("../config/db");

/**
 * storeCalculation - Insert calculated details into the calculations table.
 *
 * @param {string} realmId - QBO realmId
 * @param {string} estimateId - QBO estimateId
 * @param {number} laborCost
 * @param {number} materialCost
 * @param {number} overheadPercent
 * @param {number} finalPrice
 */
async function storeCalculation(
  realmId,
  estimateId,
  laborCost,
  materialCost,
  overheadPercent,
  finalPrice
) {
  const query = `
    INSERT INTO calculations (realm_id, qbo_estimate_id, labor_cost, material_cost, overhead_percent, final_price)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    realmId,
    estimateId,
    laborCost,
    materialCost,
    overheadPercent,
    finalPrice,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = { storeCalculation };
