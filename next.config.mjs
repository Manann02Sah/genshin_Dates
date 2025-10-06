/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable static export for Vercel deployment
  // output: 'export', // Uncomment for static export

  // Incremental Static Regeneration
  experimental: {
    // Enable revalidation every hour
  },
}

export default nextConfig
