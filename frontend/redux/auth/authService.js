import axios from "axios";

const API_URL = "/api/users/";

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log("user has been registered");
  return response.data;
};

//login user
const login = async (userData) => {
  console.log(API_URL + "login");
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log("user has been registered");
  return response.data;
};

//logout

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
