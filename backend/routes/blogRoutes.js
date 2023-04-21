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
const { protect } = require("../middlleware/authMiddleware.js");

router.get("/all", getBlogs);

router.get("/user/:userID", getBlogsByUser);

router
  .route("/:blogID")
  .get(getBlogsByID)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

router.post("/post/", protect, postBlog);

module.exports = router;
