const { check } = require("express-validator");

const mealValidation = [
  check("mealName").trim().notEmpty().withMessage("Meal name is required!"),

  check("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required!"),

  check("ingredients")
    .isArray()
    .withMessage("Ingredients must be an array of string!")
    .notEmpty()
    .withMessage("Ingredients is required!"),
];

module.exports = mealValidation;
