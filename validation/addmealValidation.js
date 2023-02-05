const { check } = require("express-validator");

const mealValidation = [
  check("mealName").trim().notEmpty().withMessage("Meal name is required!"),

  check("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required!"),

  check("ingredients").notEmpty().withMessage("Ingredients is required!"),
];

module.exports = mealValidation;
