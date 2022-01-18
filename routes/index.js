const express = require("express");
const router = express.Router();
// Routes
const authRoutes = require("./Auth");
const userRoutes = require("./User");
const productRoutes = require("./Product");

// Auth
router.use("/auth", authRoutes);

// User
router.use("/user", userRoutes);

// Product
// router.use("/products", productRoutes);

module.exports = router;
