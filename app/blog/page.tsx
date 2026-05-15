import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | Getbuild - Artykuły o SEO i web services',
  description: 'Blog Getbuild - artykuły o SEO dla firm B2B, tworzeniu stron www, e-commerce i marketingu dla firm. Porady i case studies.',
  keywords: ['blog', 'artykuły SEO', 'poradniki', 'web services', 'e-commerce'],
  alternates: {
    canonical: 'https://getbuild.pl/blog',
  },
  openGraph: {
    title: 'Blog | Getbuild - Artykuły o SEO i web services',
    description: 'Blog Getbuild - artykuły o SEO dla firm B2B, tworzeniu stron www, e-commerce i marketingu dla firm.',
    url: 'https://getbuild.pl/blog',
    type: 'website',
    locale: 'pl_PL',
  },
}

const articles = [
  {
    slug: 'ile-kosztuje-strona-internetowa-dla-firmy-b2b',
    title: 'Ile kosztuje strona internetowa dla firmy B2B w 2026',
    excerpt: 'Przegląd cen projektowania i tworzenia stron www dla firm B2B. Jakie są koszty, co wpływa na cenę, kiedy warto zainwestować.',
    date: '2026-05-15',
    readTime: 8,
  },
  {
    slug: 'jak-wybrac-agencje-seo-dla-firmy-b2b',
    title: 'Jak wybrać agencję SEO dla firmy B2B',
    excerpt: 'Poradnik - na co zwrócić uwagę przy wyborze agencji SEO dla Twojej firmy. Pytania, które powinieneś zadać, czerwone flagi.',
    date: '2026-05-10',
    readTime: 10,
  },
  {
    slug: 'strona-internetowa-dla-producenta-krok-po-kroku',
    title: 'Strona internetowa dla producenta krok po kroku',
    excerpt: 'Kompletny przewodnik - jak stwierdzić czy producent potrzebuje strony www, co powinna zawierać, jak ją wdrożyć.',
    date: '2026-05-05',
    readTime: 12,
  },
  {
    slug: 'seo-dla-firm-b2b-czy-warto-investowac',
    title: 'SEO dla firm B2B czy warto inwestować',
    excerpt: 'Analiza - czy SEO to dobra inwestycja dla firmy B2B? ROI, czasy oczekiwania na rezultaty, alternatywy.',
    date: '2026-04-28',
    readTime: 9,
  },
  {
    slug: 'audyt-seo-co-zawiera-ile-kosztuje',
    title: 'Audyt SEO co zawiera i ile kosztuje',
    excerpt: 'Przewodnik po audycie SEO - co zawiera profesjonalny audyt, ile on kosztuje, jakie rezultaty można oczekiwać.',
    date: '2026-04-20',
    readTime: 7,
  },
]

export default function Blog() {
  return (
    <main className="overflow-x-hidden">
      <Nav />

      <section className="px-6 py-20 bg-white sm:px-8 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6" style={{ fontFamily: 'var(--font-barlow)' }}>
            Blog
          </h1>
          <p className="text-lg leading-7 text-[#6B7280] mb-8">
            Artykuły o SEO dla firm B2B, tworzeniu stron www, e-commerce i strategiach marketingowych. Poradniki i case studies z naszych projektów.
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
                  <span>•</span>
                  <span>{article.readTime} min czytania</span>
                </p>
                <p className="text-[#6B7280] mb-6">
                  {article.excerpt}
                </p>
                <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-[#0055FF] font-semibold hover:gap-3 transition-all">
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
