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
exports.partner = async (req, res, next) => {
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

  try {
    // Hash Password
    const hashedPw = await bcrypt.hash(password, 12);

    // CREATE NEW PARTNER
    const partner = new Partner({
      email: email,
      password: hashedPw,
      companyName: companyName,
      address: address,
      phoneNumber: phoneNumber,
      imageUrl: imageUrl,
      role: "PARTNER",
      accountStatus: "PENDING",
    });

    const newPartner = await partner.save();
    return res.status(201).json({
      message: "Partner registered successfully!",
      data: { email: newPartner.email, companyName: newPartner.companyName },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Internal server error" });
  }
};
