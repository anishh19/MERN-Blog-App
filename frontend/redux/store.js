import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import blogReducer from "./blogs/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});
