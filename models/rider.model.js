const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const riderSchema = new Schema({
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
    type: String,
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
  // Rider only fields
  isActive: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Rider", riderSchema);
