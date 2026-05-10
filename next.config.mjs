/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/kontakt', destination: '/#kontakt', permanent: false }]
  },
}

export default nextConfig
