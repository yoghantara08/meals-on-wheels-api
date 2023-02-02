const express = require("express");
const router = express.Router();

const registerController = require("../controller/register.controller");
const partnerController = require("../controller/partner.controller");
const loginController = require("../controller/login.controller");

const registerValidation = require("../validation/registerValidation");
const partnerValidation = require("../validation/partnerValidation");

// Register for Member, Rider, Volunteer
router.post("/register", registerValidation, registerController.register);

// Register for Partnership
router.post("/partnership", partnerValidation, partnerController.partner);

// Login
router.post("/login", loginController.login);

module.exports = router;
