const express = require("express");
const router = express.Router();

/**
 * PATH: /api/rider
 */

// GET all meals that being assigned
router.get("/meals/pending");

// PUT finish meal delivery
router.get("/meal/finish-delivery");

// GET all finish delivered meals
router.get("/meals");

module.exports = router;
