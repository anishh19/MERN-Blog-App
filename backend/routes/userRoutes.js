const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  checkUsername,
} = require("../controller/userController");
const { protect } = require("../middlleware/authMiddleware");

router.post("/", registerUser);

router.post("/username", checkUsername);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

module.exports = router;
