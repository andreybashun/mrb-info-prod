/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,

  env: {
    SERVER_HOST: 'http://158.160.24.26:5000/',
    SERVER_PORT: '5000',
    DB_NAME: 'mrb-info',
}
}

module.exports = nextConfig
