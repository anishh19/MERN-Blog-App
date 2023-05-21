const nextConfig = {
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  },
};

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  };

  return {
    rewrites,
    ...nextConfig, // Merge the nextConfig object into the returned object
  };
};
