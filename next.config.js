/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "https://app.forestry.io/login",
        permanent: true,
        basePath: false,
      },
    ];
  },
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx", "html"],
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // pathname: "/**" // Optional: restrict to certain paths
      },
    ],
  },
  compiler: {
    removeConsole: true,
  },
};

// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
