const express = require("express");
const router = express.Router();

/**
 * PATH: /api/partner
 */

// GET all meals that being assigned
router.get("/meals/pending");

// PUT finish prepared meal
router.put("/meal-ready");

// GET all finish prepared meals
router.get("/meals");

module.exports = router;
