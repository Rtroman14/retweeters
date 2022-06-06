/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BEARER_TOKEN: process.env.BEARER_TOKEN,
    },
};

module.exports = nextConfig;
