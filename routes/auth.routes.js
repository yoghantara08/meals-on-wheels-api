const express = require("express");
const router = express.Router();

const registerController = require("../controller/register.controller");
const loginController = require("../controller/login.controller");

const registerValidation = require("../validation/registerValidation");
const partnerValidation = require("../validation/partnerValidation");

/**
 * PATH: /api/auth
 */

// POST Register for Member, Rider, Volunteer
router.post("/register", registerValidation, registerController.register);

// POST Register for Partnership
router.post("/partnership", partnerValidation, registerController.regisPartner);

// POST Login
router.post("/login", loginController.login);

module.exports = router;
