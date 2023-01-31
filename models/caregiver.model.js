const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caregiverSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: string,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  // Caregiver only fields
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Caregiver", caregiverSchema);
