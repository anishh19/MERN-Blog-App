import axios from "axios";

const API_URL = "api/blogs";

const createBlog = async (blogData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(API_URL + "/post", blogData, config);
  console.log(response.data);
  return response.data;
};

const blogService = {
  createBlog,
};

export default blogService;
