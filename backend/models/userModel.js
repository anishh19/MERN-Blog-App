const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please select a username"],
    },
    name: { type: String, required: [true, "Please add your name"] },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a pasword"],
    },
    profilePicUrl: {
      type: String,
      required: false,
    },
    bookmarks: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
