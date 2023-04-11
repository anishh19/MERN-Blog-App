const getBlogs = (req, res) => {
  res.status(200).json({ message: "Get all blogs" });
};

const getBlogsByUser = (req, res) => {
  res
    .status(200)
    .json({ message: `Get all blogs by user ${req.params.userID}` });
};

const getBlogsByID = (req, res) => {
  res.status(200).json({ message: `Get blog ID:${req.params.blogID}` });
};

const postBlog = (req, res) => {
  res.status(200).json({ message: "Posted a blog" });
};

module.exports = {
  getBlogs,
  getBlogsByUser,
  postBlog,
  getBlogsByID,
};
