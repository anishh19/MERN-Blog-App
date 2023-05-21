const asyncHandler = require("express-async-handler");
const Blogs = require("../models/blogsModel");
const User = require("../models/userModel");

const getBlogs = async (req, res) => {
  const blogs = await Blogs.find();
  res.status(200).json(blogs);
};

const getBlogsByUser = asyncHandler(async (req, res) => {
  const blogs = await Blogs.find({ user: req.params.userID });
  res.status(200).json(blogs);
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
    const user = await User.findById(req.user.id);

    //check for user
    if (!user) {
      res.status(401);
      throw new Error((message = "User not found"));
    }
    //make sure the logged in user matches the blog poster
    if (blog.user.user.toString() !== user.id) {
      res.status(401);
      throw new Error((message = "User not authorised"));
    } else {
      await blog.remove();
      res.status(200).json({ id: req.params.blogID });
    }
  }
});

const postBlog = asyncHandler(async (req, res) => {
  if (!(req.body.body && req.body.title)) {
    res.status(400);
    console.log("Please fill all fields");
    throw new Error("Please fill all fields!");
  }
  const blog = await Blogs.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    body: req.body.body,
    thumbnailURL: req.body.thumbnailURL,
  });
  res.status(200).json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blogs.findById(req.params.blogID);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }
  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error((message = "User not found"));
  }
  //make sure the logged in user matches the blog poster
  if (blog.user.toString() !== user.id) {
    res.status(401);
    throw new Error((message = "User not authorised"));
  } else {
    const updatedBlog = await Blogs.findByIdAndUpdate(
      req.params.blogID,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedBlog);
  }
});

module.exports = {
  getBlogs,
  getBlogsByUser,
  postBlog,
  getBlogsByID,
  updateBlog,
  deleteBlog,
};
