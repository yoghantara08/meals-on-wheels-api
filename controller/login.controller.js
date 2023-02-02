const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Partner = require("../models/partner.model");
const User = require("../models/users.model");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 *
 */
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;
  let isCorrectPw;

  try {
    // Check account in both user and partner model
    const user = await User.findOne({ email: email });
    const partner = await Partner.findOne({ email: email });

    if (user) {
      loadedUser = user;
      isCorrectPw = await bcrypt.compare(password, user.password);
    } else if (partner) {
      loadedUser = partner;
      isCorrectPw = await bcrypt.compare(password, partner.password);
    }

    if (!loadedUser) {
      return res.status(401).json({ message: "User can't be found!" });
    }

    if (!isCorrectPw) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    const token = await jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .json({ token: token, userId: loadedUser._id.toString() });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error, message: "Internal server error" });
  }
};
