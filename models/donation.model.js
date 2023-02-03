const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
