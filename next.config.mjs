/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "assets.aceternity.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
    domains: ["assets.aceternity.com", "lh3.googleusercontent.com", "www.apple.com", "shopative-dashboard.s3.amazonaws.com"],
  },
};

export default nextConfig;
