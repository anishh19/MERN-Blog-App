import Header from "../components/header";

const User = ({ data }) => {
  const blogsData = data.blogsData;
  return (
    <>
      <Header />
      <div className="m-4 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogsData.map((blog, index) => (
            <div
              key={index}
              className="bg-indigo-500 text-white p-4 rounded shadow-md"
            >
              <h2 className="text-lg font-bold">{blog.title}</h2>
              <p className="text-sm">{blog.description}</p>
              <div className="mt-2">
                {blog.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block bg-indigo-600 text-sm rounded-full px-2 py-1 mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
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
