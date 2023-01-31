const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize App
const app = express();

// CORS
app.use(cors());

// Parse JSON Data
app.use(bodyParser.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://merrymeals08:merrymeals123@cluster0.tuljkwh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
