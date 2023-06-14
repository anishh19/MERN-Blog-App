const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !password || !username) {
    res.status(400).json({ message: "Enter all data" });
  } else {
    //check if user exists
    const userExists = await User.findOne({ email: email });
    const usernameExists = await User.findOne({ username: username });
    if (userExists) {
      res.status(400);
      throw new Error((message = "User Already Exists"));
    } else if (usernameExists) {
      res.status(400);
      throw new Error((message = "Username Already Taken"));
    } else {
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name,
        email: email,
        username: username,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          _id: user.ID,
          name: user.name,
          email: user.email,
          username: user.username,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error((message = "Invalid User Data"));
      }
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.ID,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error((message = "Invalid Credentials"));
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  });
});

const checkUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const usernameExists = await User.findOne({ username: username });
  if (usernameExists) {
    res.status(200).json({
      message: "❌ Username Already Taken, please try another one ",
    });
  } else {
    res.status(200).json({ message: "✅ Username Available " });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_secret, {
    expiresIn: "20d",
  });
};

module.exports = {
  registerUser,
  getMe,
  loginUser,
  checkUsername,
};
