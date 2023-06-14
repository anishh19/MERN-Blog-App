import Header from "../components/header";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../redux/auth/authSlice";
import { useRouter } from "next/router";

const SignUpFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  username: z.string().min(1, { message: "Username is required!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .min(8, { message: "Password should be atleast 8 characters long!" }),
  repeatPassword: z.string().min(1, { message: "Password is required!" }),
});

function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userNameStatus, setUserNameStatus] = useState("");

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
    initialErrors: {
      name: "",
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
    validate: (values) => {
      let errors = {};

      try {
        SignUpFormSchema.shape.email.parse(values.email);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.email = errorMessage;
      }
      async function asyncCall() {
        const userData = {
          username: values.username,
        };
        const response = await axios.post(
          "http://localhost:5000/api/users/username",
          userData
        );
        setUserNameStatus(response.data.message);
      }
      try {
        SignUpFormSchema.shape.username.parse(values.username);
        asyncCall();
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.username = errorMessage;
      }

      try {
        SignUpFormSchema.shape.name.parse(values.name);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.name = errorMessage;
      }

      try {
        SignUpFormSchema.shape.password.parse(values.password);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.password = errorMessage;
      }

      if (values.password != values.repeatPassword) {
        errors.repeatPassword = "Passwords do not match";
      }

      if (errors) return errors;
    },
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
      };
      dispatch(register(userData));
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      router.push("/");
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <div className="h-full w-screen text-gray-500">
      <Header currentTab="signup" />

      <div className=" w-full flex flex-col items-center justify-center gap-1">
        <h1 className="text-6xl text-indigo-500 py-4">WELCOME </h1>
        <form
          className="flex text-xl flex-col w-[80] gap-1"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col">
            <label className="m-2">Name</label>
            <input
              className="border-2 border-black px-2 py-1 w-96"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            ></input>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label className="m-2">Email</label>
            <input
              className="border-2 border-black px-2 py-1"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            ></input>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label className="m-2">Username</label>
            <input
              className="border-2 border-black px-2 py-1"
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            ></input>
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.username}
              </div>
            ) : null}
            {formik.touched.username && !formik.errors.username ? (
              <div className="text-sm m-1">{userNameStatus}</div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label className="m-2">Password</label>
            <input
              className="border-2 border-black px-2 py-1"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            ></input>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label className="m-2">Confirm Password</label>
            <input
              className="border-2 border-black px-2 py-1"
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Enter password again"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            ></input>
            {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.repeatPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="h-16 my-8 bg-indigo-500 rounded-md text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
