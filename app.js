const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
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
app.use("/auth", authRoutes);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected");
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
