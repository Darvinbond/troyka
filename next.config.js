/** @type {import('next').NextConfig} */
// globalThis.self = globalThis;
// self polyfill
// if (typeof self === "undefined") {
//   self = globalThis;
// }
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
