import Header from "../components/header";
import { useFormik } from "formik";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createBlog } from "../redux/blogs/blogSlice";
import { toast } from "react-toastify";
import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";

const BlogFormSchema = z.object({
  title: z.string().min(1, { message: "Please add a title to your blog!" }),
  description: z.string().min(1, { message: "Please add a description!" }),
  tags: z.string().min(1, { message: "Please add tags" }),
  body: z.string().min(1, { message: "Please give your blog a body" }),
});

const Createblog = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [isLoggedIn, setLogin] = useState(false);
  const [imageURL, setURL] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: "",
      body: "",
    },
    initialErrors: {
      title: "",
      description: "",
      tags: "",
      body: "",
    },
    validate: (values) => {
      let errors = {};

      try {
        BlogFormSchema.shape.title.parse(values.title);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.title = errorMessage;
      }
      try {
        BlogFormSchema.shape.description.parse(values.description);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.description = errorMessage;
      }
      try {
        BlogFormSchema.shape.tags.parse(values.tags);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.tags = errorMessage;
      }
      try {
        BlogFormSchema.shape.body.parse(values.body);
      } catch (err) {
        const errorMessage = err.issues[0].message;
        errors.body = errorMessage;
      }

      if (errors) return errors;
    },
    onSubmit: (values) => {
      if (!imageURL) {
        toast.error("Please upload an image");
      } else {
        const blogData = {
          title: values.title,
          description: values.description,
          tags: [...values.tags.split(",")],
          body: values.body,
          thumbnailURL: imageURL,
        };
        dispatch(createBlog(blogData));
      }
    },
  });
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else setLogin(true);
  }, [user, router]);
  return (
    <>
      <Header currentTab="createblog" />
      <div className="flex flex-col items-center justify-center">
        <div className="text-6xl m-16">Create A Blog</div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-2/5 flex-col gap-4 mx-auto"
        >
          <div>
            <label htmlFor="title" className="text-xl font-semibold">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.title}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="tags" className="text-xl font-semibold">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              className="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter related tags"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tags}
            />
            {formik.touched.tags && formik.errors.tags ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.tags}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="description" className="text-xl font-semibold">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-start">
            <div className="text-xl font-semibold my-4">
              Please upload a thumbnail/image for your blog
            </div>
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

          <div>
            <label htmlFor="body" className="text-xl font-semibold">
              Body
            </label>
            <textarea
              id="body"
              className="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog content"
              rows="6"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
            ></textarea>
            {formik.touched.body && formik.errors.body ? (
              <div className="text-red-500 text-sm m-1">
                {formik.errors.body}
              </div>
            ) : null}
          </div>
          <button className="w-full h-12 text-xl text-white bg-indigo-500 rounded-lg">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default Createblog;
