import Header from "../components/header";
import { z } from "zod";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/auth/authSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .min(8, { message: "Password should be atleast 8 characters long!" }),
});

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    initialErrors: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      try {
        LoginFormSchema.shape.email.parse(values.email);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.email = errorMessage;
      }
      try {
        LoginFormSchema.shape.password.parse(values.password);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.password = errorMessage;
      }

      if (errors) return errors;
    },
    onSubmit: (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      console.log("Login Attempted", userData);
      dispatch(login(userData));
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
      <Header currentTab="login" />
      <div className=" w-full flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-6xl text-indigo-500 py-12">WELCOME </h1>
        <form
          className="flex text-2xl flex-col gap-4 w-[80]"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col">
            <label className="m-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 border-black p-2"
            ></input>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label className="m-2">Password</label>
            <input
              className="border-2 border-black p-2"
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

          <button
            type="submit"
            className="h-16 my-4 bg-indigo-500 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
