import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import SubtleAccents from '@/components/SubtleAccents'
import MotionProvider from '@/components/MotionProvider'
import AnimatedBackground from '@/components/ui/AnimatedBackground'

const siteUrl = 'https://getbuild.pl'
const siteTitle = 'Nowoczesne Strony WWW i Automatyzacje AI dla Biznesu | Getbuild'
const siteDescription =
  'Tworzymy nowoczesne strony internetowe i wdrażamy automatyzacje AI dla małych i średnich firm w Polsce. Getbuild — technologia, która pracuje za Twój biznes.'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'strony www',
    'automatyzacje AI',
    'agenci AI',
    'rozwiązania IT',
    'Getbuild',
    'GEO',
    'Generative Engine Optimization',
    'SEO dla firm',
    'optymalizacja AI',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/getbuild-logo-og.png`,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/getbuild-logo-og.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pl"
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/getbuild-logo-og.png" sizes="any" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/getbuild-logo-og.png" />
        <meta property="og:image" content="https://getbuild.pl/getbuild-logo-og.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Getbuild',
          url: 'https://getbuild.pl',
          description: 'Nowoczesne strony WWW, automatyzacje AI i agenci AI dla polskich firm.',
          inLanguage: 'pl',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://getbuild.pl/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['ProfessionalService', 'LocalBusiness'],
          '@id': 'https://getbuild.pl/#organization',
          name: 'Getbuild',
          url: 'https://getbuild.pl',
          logo: 'https://getbuild.pl/getbuild-logo-og.png',
          image: 'https://getbuild.pl/og-image.jpg',
          description: 'W Getbuild.pl wdrażamy zaawansowane rozwiązania techniczne dla Twojej firmy. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe i wdrażamy inteligentnych agentów AI, którzy realnie odciążają zespół oraz zwiększają efektywność operacyjną. Oferujemy SEO i GEO (Generative Engine Optimization) — optymalizację widoczności w Google i wyszukiwarkach generatywnych AI.',
          email: 'kontakt@getbuild.pl',
          areaServed: {
            '@type': 'Country',
            name: 'Polska',
          },
          priceRange: 'od 150 zł/miesiąc',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Gdańsk',
            addressRegion: 'Trójmiasto',
            addressCountry: 'PL',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Usługi Getbuild',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Strony WWW dla firm',
                  description: 'Nowoczesne, responsywne strony internetowe dla małych i średnich firm. Bezpłatny projekt przed wdrożeniem. Opieka 24/7.',
                  url: 'https://getbuild.pl/strony-www'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Automatyzacje AI',
                  description: 'Automatyzacje procesów biznesowych dopasowane do konkretnej firmy. Analiza procesu przed wdrożeniem.',
                  url: 'https://getbuild.pl/automatyzacje-ai'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Agenci AI',
                  description: 'Inteligentni agenci AI pracujący 24/7. Obsługa zapytań, kwalifikacja leadów, wsparcie decyzji.',
                  url: 'https://getbuild.pl/agenci-ai'
                }
              }
            ]
          },
          sameAs: [
            'https://www.linkedin.com/company/getbuild',
            'https://www.instagram.com/getbuild.pl/',
            'https://www.facebook.com/profile.php?id=61588720012257',
          ],
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SiteLinksSearchBox',
          'url': 'https://getbuild.pl',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://getbuild.pl/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Strony WWW', 'url': 'https://getbuild.pl/strony-www' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Automatyzacje AI', 'url': 'https://getbuild.pl/automatyzacje-ai' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Agenci AI', 'url': 'https://getbuild.pl/agenci-ai' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'SEO i GEO dla firm', 'url': 'https://getbuild.pl/seo-dla-firm' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Realizacje', 'url': 'https://getbuild.pl/realizacje' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Blog', 'url': 'https://getbuild.pl/blog' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Wiedza AI', 'url': 'https://getbuild.pl/wiedza-ai' },
        ]) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://getbuild.pl/#webpage',
          url: 'https://getbuild.pl',
          name: 'Getbuild — Strony WWW, Automatyzacje AI i GEO dla firm',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', '.section-copy', 'p[data-speakable]'],
          },
          about: {
            '@type': 'Organization',
            '@id': 'https://getbuild.pl/#organization',
          },
          mentions: [
            { '@type': 'Thing', name: 'SEO', sameAs: 'https://en.wikipedia.org/wiki/Search_engine_optimization' },
            { '@type': 'Thing', name: 'Generative Engine Optimization', alternateName: 'GEO' },
            { '@type': 'Thing', name: 'Automatyzacja procesów biznesowych' },
            { '@type': 'Thing', name: 'Agenci AI' },
          ],
        }) }} />
        <link rel="alternate" hrefLang="pl" href="https://getbuild.pl" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <AnimatedBackground />
        <CookieConsent />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[#2563EB] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg">Przejdź do treści</a>
        <MotionProvider>
          <div id="main-content" className="relative" style={{ zIndex: 1 }}>{children}</div>
        </MotionProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6D0PC33PCQ" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6D0PC33PCQ');
        `}</Script>
      </body>
    </html>
  )
}
