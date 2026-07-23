import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Analytics from '@/components/Analytics'
import MotionProvider from '@/components/MotionProvider'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import PremiumAnimations from '@/components/PremiumAnimations'
import CookieConsent from '@/components/CookieConsent'

const siteUrl = 'https://getbuild.pl'
const siteTitle = 'Strony WWW i Automatyzacje AI dla Firm | Getbuild'
const siteDescription =
  'Tworzymy nowoczesne strony internetowe i wdrażamy automatyzacje AI dla firm w Polsce. Getbuild — technologia, która pracuje za Twój biznes.'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'optional',
})

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash',
  display: 'optional',
  weight: '200 700',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'optional',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'Getbuild',
  authors: [{ name: 'Getbuild', url: siteUrl }],
  creator: 'Getbuild',
  publisher: 'Getbuild',
  category: 'technology',
  formatDetection: { telephone: false, address: false, email: false },
  keywords: [
    'strony www dla firm',
    'strony internetowe dla firm',
    'automatyzacje AI',
    'agenci AI',
    'chatbot AI dla firmy',
    'SEO dla firm',
    'GEO Generative Engine Optimization',
    'widoczność w ChatGPT',
    'Getbuild',
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
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
  other: {
    'facebook-domain-verification': 'unlaytx9wgitknn08geytxtw1w2g7z',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0F16',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${clashDisplay.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('motion-ready')",
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(/^(accepted|rejected)$/.test(localStorage.getItem('getbuild_cookie_consent_v1')||''))document.documentElement.dataset.cookieConsent='saved'}catch(e){}",
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="Blog Getbuild" href="/blog/feed.xml" />
        <link rel="alternate" type="text/plain" title="Getbuild llms.txt" href="/llms.txt" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': 'https://getbuild.pl/#website',
          name: 'Getbuild',
          url: 'https://getbuild.pl',
          description: 'Nowoczesne strony WWW, automatyzacje AI i agenci AI dla polskich firm.',
          inLanguage: 'pl',
          publisher: { '@id': 'https://getbuild.pl/#organization' },
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['ProfessionalService', 'LocalBusiness'],
          '@id': 'https://getbuild.pl/#organization',
          name: 'Getbuild',
          url: 'https://getbuild.pl',
          logo: 'https://getbuild.pl/getbuild-logo-og.png',
          image: 'https://getbuild.pl/getbuild-logo-og.png',
          description: 'W Getbuild.pl tworzymy strony internetowe oparte na ofercie i sposobie działania firmy oraz automatyzujemy czasochłonne procesy biznesowe. Techniczne podstawy SEO, GEO i AEO są wbudowane w każdy pakiet strony, a nie sprzedawane jako osobna usługa.',
          email: 'getbuild.pl@gmail.com',
          areaServed: {
            '@type': 'Country',
            name: 'Polska',
          },
          priceRange: '1997–3099 PLN',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Gdańsk',
            addressRegion: 'Trójmiasto',
            addressCountry: 'PL',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '2',
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
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Magdalena Sioła' },
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'Z pełnym przekonaniem polecam współpracę z Getbuild.pl. Firma stworzyła dla mnie stronę internetową MS Design Studio. Cały proces przebiegał sprawnie, komunikacja była na bardzo wysokim poziomie, a wszelkie uwagi były szybko wdrażane. Efekt końcowy spełnił moje oczekiwania zarówno pod względem estetyki, jak i funkcjonalności.',
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Strony WWW', 'url': 'https://getbuild.pl/strony-www' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Automatyzacje AI', 'url': 'https://getbuild.pl/automatyzacje-ai' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Agenci AI', 'url': 'https://getbuild.pl/agenci-ai' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Realizacje', 'url': 'https://getbuild.pl/realizacje' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Blog', 'url': 'https://getbuild.pl/blog' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Wiedza AI', 'url': 'https://getbuild.pl/wiedza-ai' },
        ]) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://getbuild.pl/#webpage',
          url: 'https://getbuild.pl',
          name: 'Getbuild — Strony WWW i automatyzacje dla firm',
          description: siteDescription,
          inLanguage: 'pl',
          isPartOf: { '@id': 'https://getbuild.pl/#website' },
          primaryImageOfPage: { '@type': 'ImageObject', url: 'https://getbuild.pl/getbuild-logo-og.png' },
          datePublished: '2024-01-01',
          dateModified: '2026-07-12',
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
      <body className="antialiased" style={{ fontFamily: 'var(--font-body)' }}>
          <AnimatedBackground />
          <PremiumAnimations />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[#22D3EE] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#06141A] focus:shadow-lg">Przejdź do treści</a>
          <MotionProvider>
            <div id="main-content" className="relative" style={{ zIndex: 1 }}>
              {children}
            </div>
          </MotionProvider>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
