const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/users.model");
const Role = require("../utils/role");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 *
 */
exports.register = async (req, res, next) => {
  // Catch errors from validation before saving data to database
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // REQUEST BODY
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const imageUrl = req.file.path.replace("\\", "/");

  try {
    // HASH PASSWORD
    const hashedPw = await bcrypt.hash(password, 12);

    // CREATE NEW USER
    const user = new User({
      email: email,
      password: hashedPw,
      role: role,
      firstName: firstName,
      lastName: lastName,
      age: age,
      address: address,
      phoneNumber: phoneNumber,
      imageUrl: imageUrl,
      accountStatus: "PENDING",
    });

    const validRole =
      role === Role.Member || role === Role.Rider || role === Role.Volunteer;
    if (validRole) {
      // Member no need permission to create an account
      if (role === Role.Member) {
        user.accountStatus = "ACTIVE";
      }

      const newUser = await user.save();
      return res.status(201).json({
        message: `User with role ${newUser.role} is created!`,
        data: { email: newUser.email, role: newUser.role },
      });
    } else {
      return res.status(400).json({ message: "Invalid role user" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Internal server error" });
  }
};
