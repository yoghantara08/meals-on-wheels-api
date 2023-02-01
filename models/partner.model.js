const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  kitchen: [
    {
      name: {
        type: String,
      },
      location: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Partner", partnerSchema);
