// src/services/calculationService.js

/**
 * calculateEstimateCosts - Applies overhead, labor costs, and profit calculations.
 *
 * @param {Object} estimate - The QBO estimate object.
 * @param {number} laborCost - The total labor cost.
 * @param {number} materialCost - The total material cost.
 * @param {number} overheadPercent - Percentage overhead.
 * @returns {Object} An object with calculated fields (finalPrice, etc.)
 */

function calculateEstimateCosts(
  estimate,
  laborCost = 50,
  materialCost = 500,
  overheadPercent = 10
) {
  // NOTE: Below is an example logic. Replace with actual calculation rules. Future values will be dynamic.

  // Sum all line item amounts from QBO estimate
  const baseAmount = estimate.Line.reduce(
    (sum, line) => sum + (line.Amount || 0),
    0
  );

  // Calculate overhead as a percentage of base amount
  const overhead = (overheadPercent / 100) * baseAmount;

  // Final price calculation
  const finalPrice = baseAmount + laborCost + materialCost + overhead;

  return {
    laborCost,
    materialCost,
    overheadPercent,
    finalPrice,
  };
}

module.exports = { calculateEstimateCosts };
