import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "*" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  output: "standalone",
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizeServerReact: true,
  },
  // Route /uploads/* through an API handler so runtime-uploaded files
  // are served even though Next.js standalone caches public/ at startup
  rewrites: async () => [
    {
      source: "/uploads/:path*",
      destination: "/api/serve-upload/:path*",
    },
  ],
  headers: async () => [
    // Admin pages — never cache (prevents stale server action IDs after deploy)
    {
      source: "/admin(.*)",
      headers: [
        { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
        { key: "Pragma", value: "no-cache" },
      ],
    },
    // Login page — never cache
    {
      source: "/login",
      headers: [
        { key: "Cache-Control", value: "no-store, max-age=0" },
      ],
    },
    // Uploaded images — cache forever (content-addressed by timestamp)
    {
      source: "/uploads/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    // Next.js static chunks — cache forever (hashed filenames)
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
};

export default nextConfig;
