const { check, body } = require("express-validator");

const User = require("../models/users.model");
const Partner = require("../models/partner.model");
const Role = require("../utils/role");

const partnerValidation = [
  // Email
  body("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .custom(async (value) => {
      const partner = await Partner.findOne({ email: value });
      if (partner) {
        return Promise.reject("Email has already taken!");
      }
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email has already taken!");
      }
    })
    .normalizeEmail(),

  // Password
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password length minimum is 6 characters"),

  // Role
  check("role")
    .not()
    .equals(Role.Partner)
    .withMessage(`Invalid role for Partnership!`),

  // Company name
  check("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required!"),

  // Address
  check("address").trim().notEmpty().withMessage("Address is required!"),

  // Phone number
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required!"),
];

module.exports = partnerValidation;
