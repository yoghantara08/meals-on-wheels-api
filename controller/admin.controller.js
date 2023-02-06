const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../models/users.model.js");
const Partner = require("../models/partner.model");
const Order = require("../models/order.model");
const Meal = require("../models/meal.model");

const orderStatus = require("../utils/order-status");
const Role = require("../utils/role");

// USERS MANAGEMENT
// GET all users (member/rider/volunteer)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ accountStatus: "ACTIVE" });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET rider/volunteer pending
exports.getPendingUsers = async (req, res, next) => {
  try {
    const users = await User.find({ accountStatus: "PENDING" });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT accept rider/volunteer
exports.acceptUserRegis = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId });

    if (user.accountStatus === "PENDING") {
      user.accountStatus = "ACTIVE";
    } else {
      return res
        .status(400)
        .json({ message: `User ${user.email} already active!` });
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
exports.getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find({ accountStatus: "ACTIVE" });

    return res.status(200).json(partners);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET partners pending
exports.getPendingPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find({ accountStatus: "PENDING" });
    return res.status(200).json(partners);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT accept partner
exports.acceptPartnerRegis = async (req, res, next) => {
  const partnerId = req.params.partnerId;
  try {
    const partner = await Partner.findOne({ _id: partnerId });

    if (partner.accountStatus === "PENDING") {
      partner.accountStatus = "ACTIVE";
    } else {
      return res
        .status(400)
        .json({ message: `Partner ${partner.companyName} already active!` });
    }

    partner.save();
    return res
      .status(200)
      .json({ message: `Partner ${partner.companyName} accepted!` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// MEAL
// GET all meal
exports.getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find();
    return res.status(200).json(meals);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

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
exports.editMeal = async (req, res, next) => {
  const mealId = req.params.mealId;
  const mealName = req.body.mealName;
  const ingredients = req.body.ingredients;
  const description = req.body.description;
  const image = req.file;

  try {
    const meal = await Meal.findById(mealId);

    if (!meal) {
      return res
        .status(400)
        .json({ message: `Meal with id:${mealId} not found!` });
    }

    meal.mealName = mealName;
    meal.description = description;
    meal.ingredients = ingredients;

    if (image) {
      const imageUrl = image.path.replace("\\", "/");
      meal.image = imageUrl;
    }

    const editedMeal = await meal.save();
    return res
      .status(200)
      .json({ message: `Meal with id:${mealId} edited!`, meal: editedMeal });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// DELETE meal
exports.deleteMeal = async (req, res, next) => {
  const mealId = req.params.mealId;

  try {
    const meal = await Meal.findById(mealId);

    if (!meal) {
      return res
        .status(400)
        .json({ message: `Meal with id:${mealId} not found!` });
    }

    const deletedMeal = await meal.delete();

    return res
      .status(200)
      .json({ message: `Meal ${deletedMeal.mealName} deleted!` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// ORDER
// GET all on progress order
exports.getOnProgressOrder = async (req, res, next) => {
  try {
    const order = await Order.find({
      orderStatus: { $ne: orderStatus.Complete },
    })
      .select("-__v")
      .populate("meal", "-__v")
      .populate("member", ["-password", "-__v"], "User")
      .populate("partner", ["-password", "-__v"], "Partner")
      .populate("rider", ["-password", "-__v"], "User");

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET all completed order
exports.getCompletedOrder = async (req, res, next) => {
  try {
    const order = await Order.find({
      orderStatus: orderStatus.Complete,
    })
      .select("-__v")
      .populate("meal", "-__v")
      .populate("member", ["-password", "-__v"], "User")
      .populate("partner", ["-password", "-__v"], "Partner")
      .populate("rider", ["-password", "-__v"], "User");

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT assign order to partner
exports.assignOrderToPartner = async (req, res, next) => {
  const partnerId = req.params.partnerId;
  const orderId = req.params.orderId;

  try {
    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(400).json({ message: "Partner not found!" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({ message: "Order not found!" });
    }

    order.partner = partner._id;
    order.orderStatus = orderStatus.AssignPartner;
    const newOrder = await order.save();

    return res.status(200).json({
      message: `Order assigned to partner ${partner.companyName}!`,
      order: newOrder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT assigned meal to rider
exports.assignOrderToRider = async (req, res, next) => {
  const orderId = req.params.orderId;
  const riderId = req.params.riderId;

  try {
    const rider = await User.findById(riderId);
    if (!rider) {
      return res.status(400).json({ message: "Rider not found!" });
    }

    // Check rider role
    if (rider.role !== Role.Rider) {
      return res.status(400).json({ message: "This user is not a rider" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not found!" });
    }

    // Check order status "READY TO DELIVERY"
    if (order.orderStatus !== orderStatus.ReadyToDeliver) {
      return res
        .status(400)
        .json({ message: "This order is not ready to deliver!" });
    }

    order.rider = rider._id;
    order.orderStatus = orderStatus.AssignRider;

    const newOrder = await order.save();

    return res.status(200).json({
      message: `Order assigned to rider ${rider.firstName}!`,
      order: newOrder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
