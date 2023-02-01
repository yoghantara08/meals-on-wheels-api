const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

// Initialize App
const app = express();

// CORS
app.use(cors());

// Parse JSON Data
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected");
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
