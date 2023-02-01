const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users.model");
const Member = require("../models/member.model");
const Caregiver = require("../models/caregiver.model");
const Rider = require("../models/rider.model");

const validate = require("../validation/validator");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.register = async (req, res, next) => {
  validate(req);
  // body
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  try {
    // Register User Account
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      role: role,
    });

    const account = await user.save();

    // Register Member
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const memberRegis = (userId) => {};
