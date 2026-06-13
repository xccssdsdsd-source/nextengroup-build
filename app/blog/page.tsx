import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import { articles as articlesRecord } from './articles'

const Nav = dynamic(() => import('@/components/Nav'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'Blog | Getbuild - Artykuły o SEO i stronach internetowych',
  description: 'Blog Getbuild: artykuły o SEO dla firm B2B, tworzeniu stron WWW, automatyzacjach AI i marketingu internetowym. Praktyczne poradniki i wnioski z projektów.',
  keywords: ['blog', 'artykuły SEO', 'poradniki', 'strony WWW', 'e-commerce', 'marketing internetowy', 'tworzenie stron', 'automatyzacje AI'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://getbuild.pl/blog',
  },
  openGraph: {
    title: 'Blog | Getbuild - Artykuły o SEO i stronach internetowych',
    description: 'Blog Getbuild: artykuły o SEO dla firm B2B, tworzeniu stron WWW, automatyzacjach AI i marketingu internetowym.',
    url: 'https://getbuild.pl/blog',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/logo-opt.png',
        width: 1200,
        height: 630,
        alt: 'Blog Getbuild - Artykuły o SEO i stronach internetowych',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Getbuild - Artykuły o SEO i stronach internetowych',
    description: 'Blog Getbuild: artykuły o SEO dla firm B2B, tworzeniu stron WWW i automatyzacjach AI.',
    images: ['https://getbuild.pl/logo-opt.png'],
  },
}

const articles = Object.entries(articlesRecord).map(([slug, a]) => ({
  slug,
  title: a.title,
  excerpt: a.excerpt,
  date: a.date,
  readTime: a.readTime,
}))

export default function Blog() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Blog' },
      ]} />

      <section className="relative bg-[#0A0E14] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.12), transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Blog Getbuild
          </h1>
          <p className="text-lg leading-[1.7] text-[#A6B2C4] mb-8">
            Artykuły o SEO dla firm B2B, tworzeniu stron WWW, automatyzacjach AI i strategiach marketingowych. Praktyczne poradniki i wnioski z naszych projektów.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#11161F] sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {articles.map((article) => (
              <article key={article.slug} className="border border-white/10 rounded-lg p-8 bg-[#161C28] hover:shadow-lg transition-shadow">
                <Link href={`/blog/${article.slug}`}>
                  <h2 className="text-2xl font-bold text-[#EAF0F7] mb-3 hover:text-[#22D3EE] transition-colors">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-sm text-[#A6B2C4] mb-4 flex gap-4">
                  <span>{new Date(article.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{article.readTime} min czytania</span>
                </p>
                <p className="text-[#A6B2C4] mb-6">
                  {article.excerpt}
                </p>
                <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-[#5EEAFF] font-semibold hover:gap-3 transition-all">
                  Czytaj artykuł
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
