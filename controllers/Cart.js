const Cart = require("../models/Cart");

exports.CreateCart = async (req, res, next) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(201).send(savedCart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart has been deleted ...");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error);
  }
};
