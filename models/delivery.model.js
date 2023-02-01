const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  mealId: {
    type: Schema.Types.ObjectId,
    ref: "Meal",
    required: true,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  riderId: {
    type: Schema.Types.ObjectId,
    ref: "Rider",
    required: true,
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
