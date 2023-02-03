const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const donationRoutes = require("./routes/donation.routes");
const mealRoutes = require("./routes/meal.routes");
const memberRoutes = require("./routes/member.routes");
const partnerRoutes = require("./routes/partner.routes");
const profileRoutes = require("./routes/profile.routes");
const riderRoutes = require("./routes/rider.routes");

const upload = require("./utils/upload-image");

// Initialize App
const app = express();

// CORS
app.use(cors());

// Parse JSON Data
app.use(bodyParser.json());

// Check if images directory exist, if not then create one
const dir = "./images";
if (!fs.existsSync(dir)) {
  fs.mkdir(path.join(__dirname, "images"), (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Directory created");
  });
} else {
  // Image upload handler
  app.use(upload);
  app.use("/images", express.static(path.join(__dirname, "images")));
}

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/rider", riderRoutes);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected");
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
