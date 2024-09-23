/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        });
        return config;
    }
};

export default nextConfig;
