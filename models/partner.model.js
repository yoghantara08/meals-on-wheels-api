const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  accountStatus: {
    type: String,
  },
});

module.exports = mongoose.model("Partner", partnerSchema);
