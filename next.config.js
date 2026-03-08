/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

// Cloudflare OpenNext initialization for development
if (process.env.NODE_ENV === 'development') {
  try {
    const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare')
    initOpenNextCloudflareForDev(nextConfig)
  } catch (error) {
    // OpenNext not installed yet, skip initialization
    console.log('OpenNext Cloudflare not installed yet. Run: npm install')
  }
}

module.exports = nextConfig
