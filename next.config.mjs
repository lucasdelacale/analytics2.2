/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGithubPages && { basePath: "/analytics2.0", assetPrefix: "/analytics2.0/" }),
};

export default nextConfig;
