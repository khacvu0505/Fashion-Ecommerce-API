const express = require("express");
const router = express.Router();
const StripeController = require("../controllers/StripeController");

router.post("/", StripeController.Payment);

module.exports = router;
