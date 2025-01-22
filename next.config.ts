
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
  
  env:{
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  }

  
};

module.exports = nextConfig;
