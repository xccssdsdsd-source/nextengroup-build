/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production'
    return [
      ...(isDev
        ? []
        : [
            {
              source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|hdr)',
              headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
              ],
            },
            {
              source: '/((?!_next/|api/|.*\\.(?:svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|hdr)$).*)',
              headers: [
                // stale-while-revalidate was 86400: the edge could hand out a day-old
                // document, and every deploy renames the /_next/static hashes that
                // document points at. Ten minutes keeps the latency win and bounds
                // how long a stale-HTML miss can happen after a deploy; the reload
                // guard in app/layout.tsx covers the rest.
                { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=120, stale-while-revalidate=600' },
              ],
            },
          ]),
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          ...(isDev
            ? []
            : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]),
        ],
      },
    ]
  },
}

module.exports = nextConfig
