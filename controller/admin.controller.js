const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../models/users.model.js");
const Partner = require("../models/partner.model");
const Order = require("../models/order.model");
const Meal = require("../models/meal.model");
const Delivery = require("../models/delivery.model");

// USERS MANAGEMENT
// GET all users (member/rider/volunteer)
exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find({ accountStatus: "ACTIVE" });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET rider/volunteer pending
exports.getPendingUsers = async (req, res, next) => {
  try {
    const user = await User.find({ accountStatus: "PENDING" });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT accept rider/volunteer

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.acceptUserRegis = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId });

    if (user.accountStatus === "PENDING") {
      user.accountStatus = "ACTIVE";
    }
    user.save();
    return res.status(200).json({ message: `User ${user.email} accepted!` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PARTNERSHIP
// GET all partners

// GET partners pending

// MEAL
// GET all meal

// POST meal menu
exports.addMeal = async (req, res, next) => {
  // Catch errors from validation before saving data to database
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const mealName = req.body.mealName;
    const ingredients = req.body.ingredients;
    const description = req.body.description;
    const image = req.file.path.replace("\\", "/");

    const meal = new Meal({
      mealName: mealName,
      ingredients: ingredients,
      description: description,
      image: image,
    });

    const newMeal = await meal.save();
    return res.status(201).json({ message: "Meal added!", meal: newMeal });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT edit meal

// ORDER
// GET all order pending

// PUT meal to partner

// GET all order prepared

// GET all order ready to deliver

// PUT meal to driver

// GET all order on delivery

// GET all order delivered/complete
