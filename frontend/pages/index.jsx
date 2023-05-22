import { Inter } from "next/font/google";
import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogData }) {
  const formatDate = function (createdAt) {
    const date = new Date(createdAt);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <>
      <Header currentTab="home" />

      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Blogs
            </h2>

            <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p>
          </div>

          <div class="grid gap-4 grid-cols-2 md:gap-6 xl:gap-8 px-96">
            {blogData?.map((blog) => (
              <div class="flex flex-col overflow-hidden rounded-lg border bg-white">
                <a
                  href="#"
                  class="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                >
                  <img
                    src={blog.thumbnailURL}
                    loading="lazy"
                    alt="Photo by Minh Pham"
                    class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </a>

                <div class="flex flex-1 flex-col p-4 sm:p-6">
                  <h2 class="mb-2 text-lg font-semibold text-gray-800">
                    <a
                      href={`/blogs/${blog._id}`}
                      class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      {blog.title}
                    </a>
                  </h2>

                  <p class="mb-8 text-gray-500">{blog.description}</p>

                  <div class="mt-auto flex items-end justify-between">
                    <div class="flex items-center gap-2">
                      <div class="h-6 w-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>

                      <div>
                        <a href={`/${blog.user}`} class="block text-indigo-500">
                          {blog.creator}
                        </a>
                        <span class="block text-sm text-gray-400">
                          {formatDate(blog.createdAt)}
                        </span>
                      </div>
                    </div>

                    <span class="rounded border px-2 py-1 text-sm text-gray-500">
                      Article
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const response = await fetch("http://localhost:5000/api/blogs/all");
  const data = await response.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      blogData: data,
    },
  };
}
