import Header from "../components/header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useFormik } from "formik";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [imageURL, setURL] = useState(null);

  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    if (user) {
      setLogin(true);
    }
  }, []);
  const [userNameStatus, setUserNameStatus] = useState("");
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
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      username: user?.username,
    },
    initialErrors: {
      name: "",
      email: "",
      username: "",
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
  return (
    <div className="">
      <Header />
      {isLoggedIn ? (
        <div className="flex w-full text-xl flex-col items-center justify-center">
          <div className="flex w-1/2 p-8 flex-col gap-4 items-start">
            <h1 className="text-4xl font-bold my-4">My Profile</h1>
            <div>Photo:</div>
            <div className="flex">
              <div className="flex flex-col gap-2 items-start">
                <div>Upload a profile picture: </div>
                {imageURL ? (
                  <div>Image has been uploaded</div>
                ) : (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      console.log(res);
                      setURL(res[0].fileUrl);
                    }}
                    onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    className=""
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center w-full gap-6">
              <form
                className="flex text-gray-600 flex-col "
                onSubmit={formik.handleSubmit}
              >
                <div className="flex flex-col">
                  <label className="m-2">Email</label>
                  <div className="border bg-gray-400  border-gray-600 px-2 py-1">
                    {user.email}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="m-2">Username</label>
                  <input
                    className="border bg-yellow-100 border-gray-600 px-2 py-1"
                    type="text"
                    id="username"
                    name="username"
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
                  <label className="m-2">Name</label>
                  <input
                    className="border bg-yellow-100 border-gray-600 px-2 py-1"
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  ></input>
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm m-1">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <label className="m-2">Bio</label>
                  <textarea
                    className="border bg-yellow-100 border-gray-600 px-2 py-1"
                    type="text"
                    id="name"
                    rows={"3"}
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  ></textarea>
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm m-1">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
              </form>
              <button className=" text-white bg-indigo-500 px-2 py-1">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
