const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Routes
const router = require("./routes");
// End Routes

// Use Json
app.use(express.json());

// Use Routes
app.use("/api", router);

// Connect Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // console.log("DB connect successfuly");
    app.listen(process.env.PORT || 5000, () => {
      console.log("App running at http://localhost:5000/");
    });
  })
  .catch(() => {
    console.log("DB connect failed");
  });

// 01:46:05
