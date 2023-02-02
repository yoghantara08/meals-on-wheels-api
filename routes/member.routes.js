const express = require("express");
const router = express.Router();

/**
 * PATH: /api/member
 */

// POST order meal :mealId
router.post("/order");

// GET list on order meal :status
router.get("/order/status");

// GET all complete ordered meals :status = "COMPLETED"
router.get("/meals");

module.exports = router;
