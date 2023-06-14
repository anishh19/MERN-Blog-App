import { Inter } from "next/font/google";
import Header from "../components/header";
import BlogCard from "../components/blogCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogData }) {
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
              <BlogCard blog={blog} />
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
