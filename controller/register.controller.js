const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/users.model");
const Member = require("../models/member.model");
const Caregiver = require("../models/caregiver.model");
const Rider = require("../models/rider.model");

const Role = require("../utils/role");

exports.register = async (req, res, next) => {
  // Catch errors from validation before saving data to database
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Request BODY from frontend
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  // Data that exist in every user
  const generalData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    // HASH PASSWORD
    const hashedPw = await bcrypt.hash(password, 12);

    // CREATE NEW USER
    const user = new User({
      email: email,
      password: hashedPw,
      role: role,
    });

    // CHECK ROLE FOR REGISTER
    if (role === Role.Member) {
      // Member
      const member = await memberRegis(req, user, generalData);
      res
        .status(201)
        .json({ message: "New member account created!", member: member });
    } else if (role === Role.Caregiver) {
      // Caregiver
      const caregiver = await caregiverRegis(req, user, generalData);
      res.status(201).json({
        message:
          "Caregiver registration complete! Need Admin permission to activate account!",
        caregiver: caregiver,
      });
    } else if (role === Role.Rider) {
      // Rider
      const rider = await riderRegis(req, user, generalData);
      res.status(201).json({
        message:
          "Rider registration complete! Need Admin permission to activate account!",
        rider: rider,
      });
    }
  } catch (error) {
    // Catch server error
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// MEMBER REGISTER
const memberRegis = async (req, user, generalData) => {
  const { birthDate, mealPreference } = req.body;

  const member = new Member({
    ...generalData,
    userId: user._id,
    birthDate: new Date(birthDate),
    mealPreference: mealPreference,
  });

  const newMember = await member.save();

  if (newMember) {
    user.save();
  }

  return newMember;
};

// CAREGIVER REGISTER
const caregiverRegis = async (req, user, generalData) => {
  const { isActive } = req.body;

  const caregiver = new Caregiver({
    ...generalData,
    userId: user._id,
    isActive: isActive,
  });

  const newCaregiver = await caregiver.save();

  if (newCaregiver) {
    user.save();
  }

  return newCaregiver;
};

// RIDER REGISTER
const riderRegis = async (req, user, generalData) => {
  const { isActive } = req.body;

  const rider = new Rider({
    ...generalData,
    userId: user._id,
    isActive: isActive,
  });

  const newRider = await rider.save();

  if (newRider) {
    user.save();
  }

  return newRider;
};
