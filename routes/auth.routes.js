const express = require("express");
const router = express.Router();

const registerController = require("../controller/register.controller");
const partnerController = require("../controller/partner.controller");

const registerValidation = require("../validation/registerValidation");
const partnerValidation = require("../validation/partnerValidation");

router.post("/register", registerValidation, registerController.register);

router.post("/partnership", partnerValidation, partnerController.partner);

module.exports = router;
