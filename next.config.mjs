/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_AUTH_PROXY: process.env.VITE_GOOGLE_AUTH_PROXY,
  },
};

export default nextConfig;
