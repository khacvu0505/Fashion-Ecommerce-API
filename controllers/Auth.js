// Models
const User = require("../models/User");

// Third Library
const CryptoJS = require("crypto-js"); //Mã hóa pasword
const jwt = require("jsonwebtoken");

exports.Register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.Login = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });

    !user && res.status(401).send("Not Found");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).send("Wrong credentials");

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).send({ ...others, accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
};
