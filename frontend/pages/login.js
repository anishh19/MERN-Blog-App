import Header from ".@component/components/header";
import { z } from "zod";
import { useFormik } from "formik";

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

function login() {
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
      console.log(values);
    },
  });
  return (
    <div className="h-full w-screem">
      <Header currentTab="login" />
      <div className=" w-full flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-6xl py-12">WELCOME </h1>
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
            className="h-16 my-4 bg-slate-600 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default login;
