const express = require("express");
const router = express.Router();

/**
 * PATH: /api/volunteer
 */

// GET all work assigned
router.get("/works");

// PUT accept a volunteer job
router.get("/accept-job");

module.exports = router;
