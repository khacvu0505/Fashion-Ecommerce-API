const express = require("express");
const router = express.Router();

// Controller
const AuthController = require("../controllers/Auth");

// *** Define Routes

// [/api/auth/register]
router.post("/register", AuthController.Register);

// [/api/auth/login]
router.get("/login", AuthController.Login);

module.exports = router;
