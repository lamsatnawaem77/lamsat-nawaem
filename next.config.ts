import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coronaled-clayton-disappointingly.ngrok-free.dev",
      },
    ],
  },
};

export default nextConfig;