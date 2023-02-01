const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  inggredients: [String],
  mealType: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Meal", mealSchema);
