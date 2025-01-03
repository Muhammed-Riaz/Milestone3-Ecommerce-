/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // The protocol used by your image URLs
        hostname: "cdn.sanity.io", // Sanity's image CDN hostname
        pathname: "/images/**", // Match all images under the `/images` path
      },
    ],
  },

  
};

module.exports = nextConfig;
