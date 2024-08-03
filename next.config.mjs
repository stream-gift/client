/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        missingSuspenseWithCSRBailout: false
    }
}

export default nextConfig;