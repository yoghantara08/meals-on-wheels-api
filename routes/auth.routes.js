const express = require("express");
const router = express.Router();

const registerController = require("../controller/register.controller");
const registerValidation = require("../validation/registerValidation");

router.post("/register", registerValidation, registerController.register);

module.exports = router;
