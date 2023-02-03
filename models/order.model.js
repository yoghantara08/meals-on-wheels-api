const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderStatus: {
    type: String,
    required: true,
  },
  mealId: {
    type: Schema.Types.ObjectId,
    ref: "Meal",
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  partnerId: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
  },
  riderId: {
    type: Schema.Types.ObjectId,
    ref: "Rider",
  },
});

module.exports = mongoose.model("Order", orderSchema);
