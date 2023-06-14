import Header from "../components/header";
import BlogCard from "../components/blogCard";

const User = ({ data }) => {
  const blogsData = data.blogsData;
  return (
    <>
      <Header />
      <div className="m-4 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogsData.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default User;

export async function getStaticPaths() {
  return {
    paths: [{ params: { user: "6465d610b460b412b193e576" } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const user = context.params.user;
  const dataFromBackend = await fetch(
    `http://localhost:5000/api/blogs/user/${user}`
  );
  const blogsData = await dataFromBackend.json();
  return {
    props: {
      data: { blogsData: blogsData },
    },
  };
}
