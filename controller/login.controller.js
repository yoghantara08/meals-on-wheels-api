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
  let isActiveAccount;

  try {
    // Check account in both user and partner model
    const user = await User.findOne({ email: email });
    const partner = await Partner.findOne({ email: email });

    if (user) {
      loadedUser = user;
      isActiveAccount = user.accountStatus;
      isCorrectPw = await bcrypt.compare(password, user.password);
    } else if (partner) {
      loadedUser = partner;
      isActiveAccount = partner.accountStatus;
      isCorrectPw = await bcrypt.compare(password, partner.password);
    }

    // Check if user not found
    if (!loadedUser) {
      return res.status(401).json({ message: "User can't be found!" });
    }

    // Check if active account
    if (isActiveAccount !== "ACTIVE") {
      return res.status(401).json({
        message:
          "Need admin permission to activate the account, please contact admin for account activation!",
      });
    }

    // Check if password is incorrect
    if (!isCorrectPw) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    // Generate JWT for login
    const token = await jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
        role: loadedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .json({ token: token, userId: loadedUser._id.toString() });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
