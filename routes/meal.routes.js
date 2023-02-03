const express = require("express");
const router = express.Router();

const mealController = require("../controller/meal.controller");

/**
 * PATH: /api/meals
 */

// GET search?meal=...
router.get("/search", mealController.searchMeal);

// GET meal details
router.get("/:mealId", mealController.mealDetails);

// GET all meals
router.get("/", mealController.getMeals);

module.exports = router;
