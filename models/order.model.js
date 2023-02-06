const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderStatus: {
    type: String,
    required: true,
  },
  meal: {
    type: Schema.Types.ObjectId,
    ref: "Meal",
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: "Partner",
  },
  rider: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
