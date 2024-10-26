import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,      // Enable React strict mode for improved error handling
    swcMinify: true,            // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    },
    images: {
      domains: ["res.cloudinary.com"],
      remotePatterns: [{
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        
      },],
    },
};

export default withPWA({
    dest: "public",         // destination directory for the PWA files
          
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
})(nextConfig);