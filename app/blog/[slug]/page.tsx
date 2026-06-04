import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Footer from '@/components/Footer'
import { articles } from '../articles'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return {}

  const siteUrl = 'https://getbuild.pl'
  const url = `${siteUrl}/blog/${slug}`

  return {
    metadataBase: new URL(siteUrl),
    title: `${article.title} | Blog Getbuild`,
    description: article.excerpt,
    robots: {
      index: false,
      follow: false,
    },
    alternates: { canonical: url },
    openGraph: {
      title: `${article.title} | Blog Getbuild`,
      description: article.excerpt,
      url,
      type: 'article',
      locale: 'pl_PL',
      publishedTime: article.date,
      authors: ['Adam — Getbuild'],
      siteName: 'Getbuild',
      images: [
        {
          url: `${siteUrl}/logo-opt.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Blog Getbuild`,
      description: article.excerpt,
      images: [`${siteUrl}/logo-opt.png`],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()

  const siteUrl = 'https://getbuild.pl'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Adam',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Getbuild',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-opt.png`,
      },
    },
    url: `${siteUrl}/blog/${slug}`,
    inLanguage: 'pl',
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
  }

  const formattedDate = new Date(article.date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema
        items={[
          { name: 'Getbuild', url: siteUrl },
          { name: 'Blog', url: `${siteUrl}/blog` },
          { name: article.title },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-white pt-24 pb-10 md:pt-32 md:pb-16 px-6 md:px-12">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)',
          }}
        />
        <div className="mx-auto max-w-3xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#0055FF] transition-colors mb-6"
          >
            ← Wróć do bloga
          </Link>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6 leading-[1.15]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {article.title}
          </h1>
          <p className="text-sm text-[#6B7280] flex flex-wrap gap-3 items-center">
            <span>{formattedDate}</span>
            <span aria-hidden="true">•</span>
            <span>{article.readTime} min czytania</span>
            <span aria-hidden="true">•</span>
            <span>Adam, Getbuild</span>
          </p>
        </div>
      </section>

      {/* Article body */}
      <article className="px-6 pb-20 md:pb-32 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="prose-custom">
            {article.sections.map((section, i) => {
              if (section.type === 'h2') {
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#0A0A0F] mt-12 mb-4"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {section.text}
                  </h2>
                )
              }
              if (section.type === 'h3') {
                return (
                  <h3
                    key={i}
                    className="text-xl font-bold text-[#0A0A0F] mt-8 mb-3"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {section.text}
                  </h3>
                )
              }
              if (section.type === 'p') {
                return (
                  <p
                    key={i}
                    className="text-[#374151] leading-[1.8] text-base md:text-[1.0625rem] mb-5"
                  >
                    {section.text}
                  </p>
                )
              }
              if (section.type === 'ul') {
                return (
                  <ul key={i} className="mb-6 space-y-2 ml-0 pl-0 list-none">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[#374151] leading-[1.7] text-base md:text-[1.0625rem]"
                      >
                        <span
                          className="mt-[0.4em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0055FF]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              if (section.type === 'ol') {
                return (
                  <ol key={i} className="mb-6 space-y-2 list-none ml-0 pl-0 counter-reset-item">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[#374151] leading-[1.7] text-base md:text-[1.0625rem]"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EFF6FF] text-[#0055FF] text-xs font-bold flex items-center justify-center mt-[0.15em]">
                          {j + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )
              }
              return null
            })}
          </div>

          {/* CTA block */}
          <div className="mt-16 rounded-2xl border border-blue-100 bg-[#F0F7FF] px-8 py-8">
            <p
              className="text-lg font-bold text-[#0A0A0F] mb-2"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Masz pytania? Napisz do nas.
            </p>
            <p className="text-[#374151] mb-5 text-sm leading-relaxed">
              Getbuild to agencja z Trójmiasta obsługująca firmy z całej Polski. Oferujemy bezpłatny mockup strony, bezpłatny audyt SEO i wycenę bez zobowiązań.
            </p>
            <a
              href="mailto:kontakt@getbuild.pl"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0055FF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0044CC] transition-colors"
            >
              kontakt@getbuild.pl
            </a>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0055FF] font-semibold hover:gap-3 transition-all text-sm"
            >
              ← Wszystkie artykuły
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
