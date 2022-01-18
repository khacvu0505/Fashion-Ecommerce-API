const express = require("express");
const router = express.Router();
const {
  VerifyTokenAndAdmin,
  VerifyToken,
  VerifyTokenAndAuthorization,
} = require("../controllers/VerifyToken");
// Controller
const CartController = require("../controllers/Cart");

// Create Cart
router.post("", VerifyToken, CartController.CreateCart);

// Update Cart
router.put("/:id", VerifyTokenAndAuthorization, CartController.UpdateCart);

// Delete Cart
router.delete("/:id", VerifyTokenAndAuthorization, CartController.DeleteCart);

// Get User Cart
router.get(
  "/find/:userId",
  VerifyTokenAndAuthorization,
  CartController.GetCart
);

// Get All
router.get("/", VerifyTokenAndAdmin, CartController.GetAll);

module.exports = router;
