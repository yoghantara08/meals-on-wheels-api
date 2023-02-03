const { check } = require("express-validator");

const donateValidation = [
  // Firstname
  check("firstName").trim().notEmpty().withMessage("Firstname is required!"),

  // Lastname
  check("lastName").trim().notEmpty().withMessage("Lastname is required!"),
  // Email

  check("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .normalizeEmail(),

  // Amount
  check("amount")
    .trim()
    .notEmpty()
    .withMessage("Amount is required!")
    .isNumeric()
    .withMessage("Amount must be a number!"),

  // Message
  check("message").trim().notEmpty().withMessage("Address is required!"),

  // Cardnumber
  check("cardNumber")
    .trim()
    .notEmpty()
    .withMessage("Card number is required!")
    .isNumeric()
    .withMessage("Card number must be a number!"),
];

module.exports = donateValidation;
