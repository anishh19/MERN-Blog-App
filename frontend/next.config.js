module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/users",
        destination: "http://localhost:5000/api/users",
      },
      {
        source: "/api/users/login",
        destination: "http://localhost:5000/api/users/login",
      },
    ];
  };
  return {
    rewrites,
  };
};
