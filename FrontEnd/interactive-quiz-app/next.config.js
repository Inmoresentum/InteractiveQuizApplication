/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    images:{
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: 8080,
                pathname: "/**"
            }
        ]
    }
}

module.exports = nextConfig
