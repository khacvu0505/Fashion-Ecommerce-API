const express = require("express");
const router = express.Router();
const { VerifyTokenAndAdmin } = require("../controllers/VerifyToken");
// Controller
const ProductController = require("../controllers/Product");

// Create Product
router.post("", VerifyTokenAndAdmin, ProductController.CreateProduct);

// Update Product
router.put("/:id", VerifyTokenAndAdmin, ProductController.UpdateProduct);

// Delete Product
router.delete("/:id", VerifyTokenAndAdmin, ProductController.DeleteProduct);

// Get Product
router.get("/find/:id", ProductController.GetProduct);

// Get All Products
router.get("/", ProductController.GetAllProduct);

module.exports = router;
