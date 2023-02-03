const Meal = require("../models/meal.model");

// GET all meals
exports.getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find().select("-__v");

    return res.status(200).json(meals);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET meal details
exports.mealDetails = async (req, res, next) => {
  const mealId = req.params.mealId;

  try {
    const meal = await Meal.findById(mealId).select("-__v");
    if (!meal) {
      return res.status(400).json({ message: "Meal not found!" });
    }

    return res.status(200).json(meal);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET search?meal=...
exports.searchMeal = async (req, res, next) => {
  const query = req.query.meal;
  if (!query) {
    return res.status(400).json({ message: "Query string not found!" });
  }

  try {
    const meals = await Meal.find({
      $or: [
        { mealName: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { ingredients: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(meals);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
