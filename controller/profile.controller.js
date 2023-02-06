const express = require("express");
const User = require("../models/users.model");
const Partner = require("../models/partner.model");
const jwt = require("jsonwebtoken");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.getUserDetail = async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  const payload = jwt.decode(token);

  let loadedUser;
  try {
    const user = await User.findOne({ email: payload.email }).select([
      "-password",
      "-__v",
    ]);
    const partner = await Partner.findOne({ email: payload.email }).select([
      "-password",
      "-__v",
    ]);

    if (user) {
      loadedUser = user;
    } else if (partner) {
      loadedUser = partner;
    } else {
      return res.status(400).json("User not found!");
    }

    return res.status(200).json(loadedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
