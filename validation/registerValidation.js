const { check } = require("express-validator");

const User = require("../models/users.model");
const Partner = require("../models/partner.model");
const Role = require("../utils/role");

const registerValidation = [
  // Email
  check("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email has already taken!");
        }
        Partner.findOne({ email: value }).then((partner) => {
          if (partner) {
            return Promise.reject("Email has already taken!");
          }
        });
      });
    })
    .normalizeEmail(),

  // Password
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password length minimum is 6 characters"),

  // Role
  check("role")
    .isIn([Role.Member, Role.Caregiver, Role.Rider, Role.Volunteer])
    .withMessage(
      `Invalid role! Only ${Role.Member}, ${Role.Rider}, and ${Role.Volunteer} Exists!`
    ),

  // Firstname
  check("firstName").trim().notEmpty().withMessage("First name is required!"),

  // Age
  check("age")
    .trim()
    .notEmpty()
    .withMessage("Age is required!")
    .isNumeric()
    .withMessage("Age must be a number!"),

  // Address
  check("address").trim().notEmpty().withMessage("Address is required!"),

  // Phone number
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required!"),
];

module.exports = registerValidation;
