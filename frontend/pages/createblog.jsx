import Header from "../components/header";
import { Formik } from "formik";
import { z } from "zod";

const BlogFormSchema = z.object({
  title: z.string().min(1, { message: "Please add a title to your blog!" }),
  description: z.string().min(1, { message: "Please add a description!" }),
  tags: z.string().min(1, { message: "Please add tags" }),
  body: z.string().min(1, { message: "Please give your blog a body" }),
});
const Createblog = () => {
  return (
    <>
      <Header currentTab="createblog" />
      <div className="flex flex-col items-center justify-center">
        <div className="text-6xl m-16">Create A Blog</div>
        <div className="flex w-2/5 flex-col gap-4 mx-auto">
          <div>
            <label htmlFor="title" className="text-xl font-semibold">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title"
            />
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
            />
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
            />
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
            ></textarea>
          </div>
          <button className="w-full h-12 text-xl text-white bg-slate-600 rounded-lg">
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};

export default Createblog;
