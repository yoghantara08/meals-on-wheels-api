const { check } = require("express-validator");
const User = require("../models/users.model");
const Role = require("../utils/role");

const registerValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .custom((value) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email has already taken!");
        }
      });
    })
    .normalizeEmail(),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password length minimum is 6 characters"),
  check("role")
    .isIn([Role.Member, Role.Caregiver, Role.Rider, Role.Volunteer])
    .withMessage(
      `Invalid role! Only ${Role.Member}, ${Role.Caregiver}, ${Role.Rider}, ${Role.Volunteer} Exists!`
    ),
  check("firstName").trim().notEmpty().withMessage("First name is required!"),
  check("address").trim().notEmpty().withMessage("Address is required!"),
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required!"),
];

module.exports = registerValidation;
