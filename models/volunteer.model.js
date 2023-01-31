const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
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
  // Volunteer only fields
  isActive: {
    type: Boolean,
    default: false,
  },
  workAssigned: [
    {
      work: {
        type: Schema.Types.ObjectId,
        ref: "VolunteerWork",
      },
      status: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
