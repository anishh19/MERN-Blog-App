import Header from "../../components/header";
import ReactMarkdown from "react-markdown";
const Blog = ({ blogData }) => {
  const createdAt = blogData.createdAt;

  const date = new Date(createdAt);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  console.log(formattedDate);
  console.log(blogData);
  return (
    <>
      <Header />
      <div className="flex m-4 p-16 flex-col gap-4">
        <h1 className="text-6xl">{blogData.title}</h1>
        <p>{formattedDate}</p>
        <div className="font-bold">{`Posted By : ${blogData.creator}`}</div>
        <img
          src={blogData.thumbnailURL}
          className=" w-2/5 object-contain "
        ></img>
        <div className="text-2xl">
          {" "}
          <ReactMarkdown>{blogData.body}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const response = await fetch("http://localhost:5000/api/blogs/all");
  const blogList = await response.json();
  // const blogList = [{ _id: "646b27fad3acaa86632ed15d" }];

  const paths = blogList.map((blog) => ({
    params: { blogID: blog._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `http://localhost:5000/api/blogs/${params.blogID}`
  );
  const blogData = await response.json();

  return {
    props: {
      blogData,
    },
  };
}

export default Blog;
