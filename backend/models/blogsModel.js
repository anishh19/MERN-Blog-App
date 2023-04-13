const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title to your blog!"],
    },
    text: {
      type: String,
      required: [true, "Please add content to your blog!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", blogSchema);
