import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
import CookieConsent from '@/components/CookieConsent'
import MotionProvider from '@/components/MotionProvider'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import GlobalPathsClient from '@/components/GlobalPathsClient'
import GSAPProvider from '@/components/GSAPProvider'
import GSAPAnimations from '@/components/GSAPAnimations'

const siteUrl = 'https://getbuild.pl'
const siteTitle = 'Strony WWW i Automatyzacje AI dla Firm | Getbuild'
const siteDescription =
  'Tworzymy nowoczesne strony internetowe i wdrażamy automatyzacje AI dla firm w Polsce. Getbuild — technologia, która pracuje za Twój biznes.'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'optional',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'optional',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'strony www',
    'strony www dla firm',
    'tworzenie stron internetowych',
    'automatyzacje AI',
    'agenci AI',
    'rozwiązania IT dla firm',
    'Getbuild',
    'GEO',
    'Generative Engine Optimization',
    'SEO dla firm',
    'SEO dla firm B2B',
    'pozycjonowanie B2B',
    'agencja SEO Trójmiasto',
    'link building',
    'optymalizacja AI',
    'widoczność w ChatGPT',
    'Next.js agencja',
  ],
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
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
    languages: { pl: siteUrl },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/getbuild-logo-og.png" as="image" type="image/png" />
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
          image: 'https://getbuild.pl/getbuild-logo-og.png',
          description: 'W Getbuild.pl wdrażamy zaawansowane rozwiązania techniczne dla Twojej firmy. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe i wdrażamy inteligentnych agentów AI, którzy realnie odciążają zespół oraz zwiększają efektywność operacyjną. Oferujemy SEO i GEO (Generative Engine Optimization) — optymalizację widoczności w Google i wyszukiwarkach generatywnych AI.',
          email: 'getbuild.pl@gmail.com',
          areaServed: {
            '@type': 'Country',
            name: 'Polska',
          },
          priceRange: '39–3999 PLN',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Gdańsk',
            addressRegion: 'Trójmiasto',
            addressCountry: 'PL',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '1',
            bestRating: '5',
            worstRating: '1',
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Patryk Zacharek' },
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.',
            },
          ],
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
          slogan: 'Strony WWW i automatyzacje AI, które pracują za Twój biznes.',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'getbuild.pl@gmail.com',
            contactType: 'customer service',
            availableLanguage: 'Polish',
            areaServed: 'PL',
          },
          foundingDate: '2024',
          founder: {
            '@type': 'Person',
            name: 'Adam',
            url: 'https://getbuild.pl',
            jobTitle: 'Założyciel i specjalista ds. stron WWW oraz AI',
            knowsAbout: ['strony internetowe', 'automatyzacje AI', 'agenci AI', 'SEO', 'GEO', 'link building', 'Next.js', 'Cloudflare', 'B2B marketing'],
          },
          knowsAbout: [
            'Web design',
            'AI automation',
            'AI agents',
            'Search Engine Optimization',
            'Generative Engine Optimization',
            'Link building',
            'Backlink strategy',
            'Next.js',
            'Cloudflare Workers',
            'B2B marketing',
            'Content marketing',
            'Core Web Vitals',
          ],
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
            cssSelector: ['h1', 'h2', '.section-copy'],
          },
          about: {
            '@type': 'Organization',
            '@id': 'https://getbuild.pl/#organization',
          },
          mentions: [
            { '@type': 'Thing', name: 'SEO', sameAs: 'https://en.wikipedia.org/wiki/Search_engine_optimization' },
            { '@type': 'Thing', name: 'Generative Engine Optimization', alternateName: 'GEO' },
            { '@type': 'Thing', name: 'Automatyzacja procesów biznesowych', sameAs: 'https://en.wikipedia.org/wiki/Business_process_automation' },
            { '@type': 'Thing', name: 'Agenci AI', sameAs: 'https://en.wikipedia.org/wiki/Intelligent_agent' },
            { '@type': 'Thing', name: 'ChatGPT', sameAs: 'https://en.wikipedia.org/wiki/ChatGPT' },
            { '@type': 'Thing', name: 'Perplexity AI', sameAs: 'https://en.wikipedia.org/wiki/Perplexity_AI' },
            { '@type': 'Thing', name: 'Strony internetowe dla firm' },
            { '@type': 'Thing', name: 'Link building', sameAs: 'https://en.wikipedia.org/wiki/Backlink' },
            { '@type': 'Thing', name: 'Core Web Vitals', sameAs: 'https://en.wikipedia.org/wiki/Core_Web_Vitals' },
            { '@type': 'Thing', name: 'Next.js', sameAs: 'https://en.wikipedia.org/wiki/Next.js' },
            { '@type': 'Thing', name: 'Cloudflare', sameAs: 'https://en.wikipedia.org/wiki/Cloudflare' },
          ],
        }) }} />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <GSAPProvider>
          <AnimatedBackground />
          <GlobalPathsClient />
          <CookieConsent />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[#22D3EE] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#06141A] focus:shadow-lg">Przejdź do treści</a>
          <MotionProvider>
            <div id="main-content" className="relative" style={{ zIndex: 1 }}>
              {children}
              <GSAPAnimations />
            </div>
          </MotionProvider>
        </GSAPProvider>
        <Analytics />
      </body>
    </html>
  )
}
