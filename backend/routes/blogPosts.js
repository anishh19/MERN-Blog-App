const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogsByUser,
  postBlog,
  getBlogsByID,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController.js");

router.get("/all", getBlogs);

router.get("/user/:userID", getBlogsByUser);

router
  .route("/blogs/:blogID")
  .get(getBlogsByID)
  .delete(deleteBlog)
  .put(updateBlog);

router.post("/", postBlog);

module.exports = router;
