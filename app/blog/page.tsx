import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'Blog | Getbuild - ArtykuĹ‚y o SEO i stronach internetowych',
  description: 'Blog Getbuild: artykuĹ‚y o SEO dla firm B2B, tworzeniu stron WWW, automatyzacjach AI i marketingu internetowym. Praktyczne poradniki i wnioski z projektĂłw.',
  keywords: ['blog', 'artykuĹ‚y SEO', 'poradniki', 'strony WWW', 'e-commerce', 'marketing internetowy', 'tworzenie stron', 'automatyzacje AI'],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://getbuild.pl/blog',
  },
  openGraph: {
    title: 'Blog | Getbuild - ArtykuĹ‚y o SEO i stronach internetowych',
    description: 'Blog Getbuild: artykuĹ‚y o SEO dla firm B2B, tworzeniu stron WWW, automatyzacjach AI i marketingu internetowym.',
    url: 'https://getbuild.pl/blog',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/getbuild-logo-og.png',
        width: 1200,
        height: 630,
        alt: 'Blog Getbuild - ArtykuĹ‚y o SEO i stronach internetowych',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Getbuild - ArtykuĹ‚y o SEO i stronach internetowych',
    description: 'Blog Getbuild: artykuĹ‚y o SEO dla firm B2B, tworzeniu stron WWW i automatyzacjach AI.',
    images: ['https://getbuild.pl/getbuild-logo-og.png'],
  },
}

const articles = [
  {
    slug: 'ile-kosztuje-strona-internetowa-dla-firmy-b2b',
    title: 'Ile kosztuje strona internetowa dla firmy B2B w 2026 roku',
    excerpt: 'PrzeglÄ…d cen projektowania i tworzenia stron WWW dla firm B2B. Od czego zaleĹĽy cena i kiedy inwestycja ma sens.',
    date: '2026-05-15',
    readTime: 8,
  },
  {
    slug: 'jak-wybrac-agencje-seo-dla-firmy-b2b',
    title: 'Jak wybraÄ‡ agencjÄ™ SEO dla firmy B2B',
    excerpt: 'Na co zwrĂłciÄ‡ uwagÄ™ przy wyborze agencji SEO, jakie pytania zadaÄ‡ i jakie sygnaĹ‚y ostrzegawcze warto wychwyciÄ‡.',
    date: '2026-05-10',
    readTime: 10,
  },
  {
    slug: 'strona-internetowa-dla-producenta-krok-po-kroku',
    title: 'Strona internetowa dla producenta krok po kroku',
    excerpt: 'Przewodnik po tym, kiedy producent potrzebuje nowej strony WWW, co powinna zawieraÄ‡ i jak wyglÄ…da wdroĹĽenie.',
    date: '2026-05-05',
    readTime: 12,
  },
  {
    slug: 'seo-dla-firm-b2b-czy-warto-investowac',
    title: 'SEO dla firm B2B: czy warto inwestowaÄ‡',
    excerpt: 'Analiza opĹ‚acalnoĹ›ci SEO w B2B: zwrot z inwestycji, czas oczekiwania na efekty i moĹĽliwe alternatywy.',
    date: '2026-04-28',
    readTime: 9,
  },
  {
    slug: 'audyt-seo-co-zawiera-ile-kosztuje',
    title: 'Audyt SEO: co zawiera i ile kosztuje',
    excerpt: 'Co obejmuje profesjonalny audyt SEO, ile kosztuje i jakich efektĂłw moĹĽna po nim oczekiwaÄ‡.',
    date: '2026-04-20',
    readTime: 7,
  },
]

export default function Blog() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Blog' },
      ]} />

      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Blog Getbuild
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            ArtykuĹ‚y o SEO dla firm B2B, tworzeniu stron WWW, automatyzacjach AI i strategiach marketingowych. Praktyczne poradniki i wnioski z naszych projektĂłw.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {articles.map((article) => (
              <article key={article.slug} className="border border-gray-200 rounded-lg p-8 bg-white hover:shadow-lg transition-shadow">
                <Link href={`/blog/${article.slug}`}>
                  <h2 className="text-2xl font-bold text-[#0A0A0A] mb-3 hover:text-[#0055FF] transition-colors">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-sm text-[#6B7280] mb-4 flex gap-4">
                  <span>{new Date(article.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>â€˘</span>
                  <span>{article.readTime} min czytania</span>
                </p>
                <p className="text-[#6B7280] mb-6">
                  {article.excerpt}
                </p>
                <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-[#0055FF] font-semibold hover:gap-3 transition-all">
                  Czytaj artykuĹ‚
                  <span>â†’</span>
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

