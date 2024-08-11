import withBundleAnalyzer from "@next/bundle-analyzer";

withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default withBundleAnalyzer(nextConfig);
