const Order = require("../models/Order");

exports.CreateOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).send(savedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted ...");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetOrder = async (req, res, next) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetAll = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetMonthly = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);

    res.status(200).send(income);
  } catch (error) {
    res.status(500).send(error);
  }
};
