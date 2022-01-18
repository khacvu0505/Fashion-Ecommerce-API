const User = require("../models/User");

exports.UpdateUser = async (req, res, next) => {
  const { password } = req.body;
  if (password) {
    password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // new: true => Để trả về người dùng mới cập nhật

    return res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete User
exports.DeleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send("User has been deleted ...");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get User
exports.GetUser = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const data = await User.findById(req.user.id);
    const { password, ...others } = data._doc;
    res.status(200).send(others);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get All User
exports.GetAllUser = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find().select("-password");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get User Stats
exports.GetUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};
