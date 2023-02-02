const express = require("express");
const router = express.Router();

/**
 * PATH: /api/donation
 */

// POST donation
router.post("/donate");

// GET all donation list
router.get("/");

module.exports = router;
