const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title to your blog!"],
    },
    description: {
      type: String,
      required: [true, "Please add a description to your blog!"],
    },
    tags: {
      type: [String],
      required: true,
    },
    body: {
      type: String,
      required: [true, "Please add content to your blog!"],
    },
    thumbnailURL: {
      type: String,
      required: [true, "Please upload a thumbnail for your blog!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", blogSchema);
