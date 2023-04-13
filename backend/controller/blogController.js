const asyncHandler = require("express-async-handler");
const Blogs = require("../models/blogsModel");

const getBlogs = async (req, res) => {
  const blogs = await Blogs.find();
  res.status(200).json(blogs);
};

const getBlogsByUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Get all blogs by user ${req.params.userID}` });
});

const getBlogsByID = asyncHandler(async (req, res) => {
  const blog = await Blogs.findById(req.params.blogID);
  if (!blog.title) {
    res.status(400);
    throw new Error("Blog not found");
  } else res.status(200).json(blog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blogs.findById(req.params.blogID);
  if (!blog.title) {
    res.status(400);
    throw new Error("Blog not found");
  } else {
    await Blogs.remove();
    res.status(200).json({ id: req.params.blogID });
  }
});

const postBlog = asyncHandler(async (req, res) => {
  if (!(req.body.text && req.body.title)) {
    res.status(400);
    throw new Error("Please fill all fields!");
  }
  const blog = await Blogs.create({
    title: req.body.title,
    text: req.body.text,
  });
  res.status(200).json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blogs.findById(req.params.blogID);
  // if (!blog) {
  //   res.status(400);
  //   throw new Error("Blog not found");
  // }
  const updatedBlog = await Blogs.findByIdAndUpdate(
    req.params.blogID,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedBlog);
});

module.exports = {
  getBlogs,
  getBlogsByUser,
  postBlog,
  getBlogsByID,
  updateBlog,
  deleteBlog,
};
