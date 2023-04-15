const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { use } = require("../routes/blogPosts");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Enter all data" });
  }
  //check if user exists
  const userExists = User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error({ message: "User Already Exists" });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.ID,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error({
      message: "Invalid User Data",
    });
  }
});

const loginUser = (req, res) => {
  res.json({
    message: "Login User",
  });
};

const getMe = (req, res) => {
  res.json({
    message: "Users Data",
  });
};

module.exports = {
  registerUser,
  getMe,
  loginUser,
};
