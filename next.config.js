/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // false para evitar erros por uso de metodos deprecated no caso do FieldMask
  swcMinify: true,
  env: {},
};

module.exports = nextConfig;
