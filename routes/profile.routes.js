const express = require("express");
const router = express.Router();

const usersController = require("../controller/profile.controller");
const isAuth = require("../middleware/isAuth");

/**
 * PATH: /api/profile
 */

// Get user profile details
router.get("/me", isAuth, usersController.getUserDetail);

module.exports = router;
