const express = require("express");

const User = require("../models/users.model");
const Meal = require("../models/meal.model");
const Order = require("../models/order.model");

const orderStatus = require("../utils/order-status");

// POST order meal :mealId
exports.orderMeal = async (req, res, next) => {
  const mealId = req.params.mealId;
  const memberId = req.params.memberId;

  try {
    // Check Meal and member existence
    const meal = await Meal.findById(mealId);
    const member = await User.findById(memberId);

    if (!meal) {
      return res
        .status(400)
        .json({ message: `Meal with id:${mealId} not found!` });
    }

    if (!member) {
      return res
        .status(400)
        .json({ message: `Member with id:${memberId} not found!` });
    }

    const order = new Order({
      orderStatus: "PENDING",
      meal: meal._id,
      member: member._id,
    });

    const newOrder = await order.save();

    return res
      .status(201)
      .json({ message: "New order registered!", order: newOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET list on order meal status on progress
exports.getMemberOrder = async (req, res, next) => {
  const memberId = req.params.memberId;

  try {
    // Check member exist first
    const member = await User.findById(memberId);

    if (!member) {
      return res
        .status(400)
        .json({ message: `Member with id:${memberId} not found!` });
    }

    // Only on progress order displayed
    const order = await Order.find({
      member: member._id,
      orderStatus: { $ne: orderStatus.Complete },
    })
      .select("-__v")
      .populate("meal", "-__v");

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET all complete ordered meals status = "DELIVERED"
exports.getCompleteOrder = async (req, res, next) => {
  const memberId = req.params.memberId;

  try {
    // Check member exist first
    const member = await User.findById(memberId);

    if (!member) {
      return res
        .status(400)
        .json({ message: `Member with id:${memberId} not found!` });
    }

    // Only complete order displayed
    const order = await Order.find({
      member: member._id,
      orderStatus: orderStatus.Complete,
    })
      .select("-__v")
      .populate("meal", "-__v");

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
