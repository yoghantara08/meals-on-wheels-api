const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Partner = require("../models/partner.model");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 *
 */
exports.partner = (req, res, next) => {
  // Catch errors from validation before saving data to database
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // REQUEST BODY
  const email = req.body.email;
  const password = req.body.password;
  const companyName = req.body.companyName;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const imageUrl = req.file.path.replace("\\", "/");

  // CREATE NEW PARTNER
  const partner = new Partner({
    email: email,
    password: password,
    companyName: companyName,
    address: address,
    phoneNumber: phoneNumber,
    imageUrl: imageUrl,
    role: "PARTNER",
    accountStatus: "PENDING",
  });

  partner.save();
  return res.status(201).json({
    message: "Partner registered successfully!",
    data: { email: partner.email, companyName: partner.companyName },
  });
};
