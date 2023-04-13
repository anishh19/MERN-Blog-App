const asyncHandler = require("express-async-handler");

const getBlogs = async (req, res) => {
  res.status(200).json({ message: "Get all blogs" });
};

const getBlogsByUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Get all blogs by user ${req.params.userID}` });
});

const getBlogsByID = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get blog ID:${req.params.blogID}` });
});

const postBlog = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter some text!");
  } else res.status(200).json({ message: "Posted a blog" });
});

module.exports = {
  getBlogs,
  getBlogsByUser,
  postBlog,
  getBlogsByID,
};
