const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  },
});

module.exports = mongoose.model("Donation", donationSchema);
