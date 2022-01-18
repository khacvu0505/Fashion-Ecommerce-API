const express = require("express");
const router = express.Router();
const {
  VerifyTokenAndAdmin,
  VerifyToken,
  VerifyTokenAndAuthorization,
} = require("../controllers/VerifyToken");
// Controller
const OrderController = require("../controllers/Order");

// Add Order
router.post("", VerifyToken, OrderController.CreateOrder);

// Update Order
router.put("/:id", VerifyTokenAndAdmin, OrderController.UpdateOrder);

// Delete Order
router.delete("/:id", VerifyTokenAndAdmin, OrderController.DeleteOrder);

// Get User Order
router.get(
  "/find/:userId",
  VerifyTokenAndAuthorization,
  OrderController.GetOrder
);

// Get All
router.get("/", VerifyTokenAndAdmin, OrderController.GetAll);

// Get Monthly Income
router.get("/income", VerifyTokenAndAdmin, OrderController.GetMonthly);

module.exports = router;
