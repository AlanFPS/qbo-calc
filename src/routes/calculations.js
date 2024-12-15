// src/routes/calculations.js
const express = require("express");
const router = express.Router();
const { getEstimate } = require("../services/qboService");
const { calculateEstimateCosts } = require("../services/calculationService");
const { storeCalculation } = require("../services/calculationsService");

/**
 * GET /calculations/run?realmId={realmId}&estimateId={estimateId}
 *
 * Steps:
 * 1. Fetch Estimate from QBO using realmId & estimateId.
 * 2. Calculate final price using calculationService.
 * 3. Store the result in DB.
 * 4. Return calculation result as JSON.
 *
 * NOTE: Replace realmId and estimateId with actual existing values from QBO sandbox.
 */
router.get("/run", async (req, res) => {
  // Extract parameters from query
  const { realmId, estimateId } = req.query;

  if (!realmId || !estimateId) {
    return res
      .status(400)
      .send("Missing realmId or estimateId query parameters.");
  }

  try {
    // Fetch QBO estimate
    const estimate = await getEstimate(realmId, estimateId);

    // Calculate costs
    // In the future, to pass dynamic values, add them as query params (e.g. &laborCost=...).
    // For now, using hardcoded values from calculationService.
    const { laborCost, materialCost, overheadPercent, finalPrice } =
      calculateEstimateCosts(estimate);

    // Store calculation in DB
    const calcRecord = await storeCalculation(
      realmId,
      estimateId,
      laborCost,
      materialCost,
      overheadPercent,
      finalPrice
    );

    // Respond with calculation details
    res.json({
      success: true,
      message: "Calculation stored",
      calculation: calcRecord,
    });
  } catch (err) {
    console.error("Error running calculation:", err.message);
    res.status(500).send("Error running calculation.");
  }
});

module.exports = router;
