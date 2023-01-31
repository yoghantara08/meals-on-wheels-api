const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  // TODO: Maybe using country city
  address: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  mealPreference: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  // TODO: maybe more items for the user meals
  meals: [
    {
      meal: {
        type: Schema.Types.ObjectId,
        ref: "Meal",
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Member", memberSchema);
