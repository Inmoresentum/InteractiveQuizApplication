/** @type {import("next").NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:"http",
                hostname: "localhost",
                port: "8080",
            }
        ]
    },

    eslint: {
        ignoreDuringBuilds: true
    },
}

module.exports = nextConfig
