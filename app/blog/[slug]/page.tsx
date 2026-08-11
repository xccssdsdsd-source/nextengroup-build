import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import { articles } from '../articles'

const Nav = dynamic(() => import('@/components/Nav'))
const Footer = dynamic(() => import('@/components/Footer'))

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
      index: true,
      follow: true,
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
          url: `${siteUrl}/getbuild-logo-og.png`,
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
      images: [`${siteUrl}/getbuild-logo-og.png`],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()

  const siteUrl = 'https://getbuild.pl'

  const wordCount = article.sections.reduce((acc, s) => {
    if (s.type === 'p') return acc + s.text.split(/\s+/).length
    if (s.type === 'ul' || s.type === 'ol') return acc + s.items.join(' ').split(/\s+/).length
    return acc
  }, 0)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    wordCount,
    inLanguage: 'pl',
    url: `${siteUrl}/blog/${slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    ...(article.keywords && { keywords: article.keywords.join(', ') }),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.prose-custom h2', '.prose-custom p'],
    },
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
        url: `${siteUrl}/getbuild-logo-og.png`,
      },
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'Blog Getbuild',
      url: `${siteUrl}/blog`,
    },
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
      <section className="relative bg-[var(--bg-base)] pt-24 pb-10 md:pt-32 md:pb-16 px-6 md:px-12">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,175,232,0.12), transparent 60%)',
          }}
        />
        <div className="mx-auto max-w-3xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--ink-2)] hover:text-[var(--brand)] transition-colors mb-6"
          >
            ← Wróć do bloga
          </Link>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6 leading-[1.15]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {article.title}
          </h1>
          <p className="text-sm text-[var(--ink-2)] flex flex-wrap gap-3 items-center">
            <span>{formattedDate}</span>
            <span aria-hidden="true">•</span>
            <span>{article.readTime} min czytania</span>
            <span aria-hidden="true">•</span>
            <span>Adam, Getbuild</span>
          </p>
        </div>
      </section>

      {/* Article body */}
      <article className="px-6 pb-20 md:pb-32 bg-[var(--bg-base)]">
        <div className="mx-auto max-w-3xl">
          <div className="prose-custom">
            {article.sections.map((section, i) => {
              if (section.type === 'h2') {
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[var(--ink)] mt-12 mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {section.text}
                  </h2>
                )
              }
              if (section.type === 'h3') {
                return (
                  <h3
                    key={i}
                    className="text-xl font-bold text-[var(--ink)] mt-8 mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {section.text}
                  </h3>
                )
              }
              if (section.type === 'p') {
                return (
                  <p
                    key={i}
                    className="text-[var(--ink-2)] leading-[1.8] text-base md:text-[1.0625rem] mb-5"
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
                        className="flex gap-3 text-[var(--ink-2)] leading-[1.7] text-base md:text-[1.0625rem]"
                      >
                        <span
                          className="mt-[0.4em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--brand)]"
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
                        className="flex gap-3 text-[var(--ink-2)] leading-[1.7] text-base md:text-[1.0625rem]"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1C2433] text-[var(--brand-400)] text-xs font-bold flex items-center justify-center mt-[0.15em]">
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

          {/* Related links */}
          {article.related && article.related.length > 0 && (
            <nav
              aria-label="Powiązane treści"
              className="mt-16 rounded-2xl border border-[var(--line)] bg-[var(--bg-card)] px-8 py-7"
            >
              <p
                className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--brand-400)] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Zobacz również
              </p>
              <ul className="space-y-2.5">
                {article.related.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-[var(--ink-2)] hover:text-[var(--brand)] transition-colors text-base"
                    >
                      <span aria-hidden="true" className="text-[var(--brand)]">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* CTA block */}
          <div className="mt-16 rounded-2xl border border-[var(--line)] bg-[var(--bg-card)] px-8 py-8">
            <p
              className="text-lg font-bold text-[var(--ink)] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Masz pytania? Napisz do nas.
            </p>
            <p className="text-[var(--ink-2)] mb-5 text-sm leading-relaxed">
              Getbuild to studio z Trójmiasta obsługujące firmy z całej Polski. Oferujemy pierwszą wizualizację strony przed płatnością oraz bezpłatną analizę procesu przed wyceną automatyzacji.
            </p>
            <a
              href="mailto:getbuild.pl@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[#fff] hover:bg-[var(--brand-400)] transition-colors"
            >
              getbuild.pl@gmail.com
            </a>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-[var(--line)]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--brand-400)] font-semibold hover:gap-3 transition-[gap] duration-200 ease-out text-sm"
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
