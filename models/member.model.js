const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
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
  // Member only fields
  birthDate: {
    type: Date,
    required: true,
  },
  mealPreference: {
    type: String,
    required: true,
  },
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

module.exports = mongoose.model("Member", memberSchema);