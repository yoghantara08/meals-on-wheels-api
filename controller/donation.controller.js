const { validationResult } = require("express-validator");
const Donation = require("../models/donation.model");

// POST donate
exports.donate = async (req, res, next) => {
  // Check validation before saving to database
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const amount = req.body.amount;
  const cardNumber = req.body.cardNumber;
  const message = req.body.message;

  try {
    const donation = new Donation({
      firstName: firstName,
      lastName: lastName,
      email: email,
      amount: amount,
      cardNumber: cardNumber,
      message: message,
    });

    const donate = await donation.save();

    return res
      .status(200)
      .json({ message: "Donate success!", donation: donate });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// GET all donation
exports.getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().select(["-__v", "-cardNumber"]);

    return res.status(200).json(donations);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
