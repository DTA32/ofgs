/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.dta32.my.id",
                port: "",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
    output: "standalone",
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

module.exports = nextConfig;
