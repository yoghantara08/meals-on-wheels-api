const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  mealName: {
    type: String,
    required: true,
  },
  inggredients: [String],
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "AVAILABLE",
  },
});

module.exports = mongoose.model("Meal", mealSchema);
