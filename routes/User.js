const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controllers/User");
const {
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
} = require("../controllers/VerifyToken");

// Update User
router.put("/:id", VerifyTokenAndAuthorization, UserController.UpdateUser);

// Delete User
router.delete("/:id", VerifyTokenAndAuthorization, UserController.DeleteUser);

// Get User
router.get("/find/:id", VerifyTokenAndAdmin, UserController.GetUser);

// GEt All User
router.get("/", UserController.GetAllUser);

// Get User Stats
router.get("/stats", VerifyTokenAndAdmin, UserController.GetUserStats);

module.exports = router;
