const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogsByUser,
  postBlog,
  getBlogsByID,
} = require("../controller/blogController.js");

router.get("/all", getBlogs);

router.get("/user/:userID", getBlogsByUser);

router.get("/blogs/:blogID", getBlogsByID);

router.post("/", postBlog);

module.exports = router;
