const express = require("express");
const router = express.Router();

const donationController = require("../controller/donation.controller");

const donateValidation = require("../validation/donateValidation");

/**
 * PATH: /api/donation
 */

// POST donation
router.post("/", donateValidation, donationController.donate);

// GET all donation list
router.get("/", donationController.getDonations);

module.exports = router;
