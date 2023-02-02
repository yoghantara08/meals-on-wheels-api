const express = require("express");
const router = express.Router();

/**
 * PATH: /api/meals
 */

// GET all meals
router.get("/");

// GET meal details
router.get("/:mealId");

// GET featured meals
router.get("/featured");

// GET searched meal search?meal=""
router.get("/search");

module.exports = router;
