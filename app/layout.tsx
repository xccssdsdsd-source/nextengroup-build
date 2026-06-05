import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'
import SubtleAccents from '@/components/SubtleAccents'
import MotionProvider from '@/components/MotionProvider'

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
        url: `${siteUrl}/logo-opt.png`,
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
    images: [`${siteUrl}/logo-opt.png`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo-opt.png',
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
        <link rel="icon" type="image/png" href="/logo-opt.png" sizes="any" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo-opt.png" />
        <meta property="og:image" content="https://getbuild.pl/logo.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
          logo: 'https://getbuild.pl/logo-opt.png',
          image: 'https://getbuild.pl/og-image.jpg',
          description: 'W Getbuild.pl wdrażamy zaawansowane rozwiązania techniczne dla Twojej firmy. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe i wdrażamy inteligentnych agentów AI, którzy realnie odciążają zespół oraz zwiększają efektywność operacyjną.',
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
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'SEO dla firm', 'url': 'https://getbuild.pl/seo-dla-firm' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Realizacje', 'url': 'https://getbuild.pl/realizacje' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Blog', 'url': 'https://getbuild.pl/blog' },
          { '@context': 'https://schema.org', '@type': 'SiteNavigationElement', 'name': 'Wiedza AI', 'url': 'https://getbuild.pl/wiedza-ai' },
        ]) }} />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6D0PC33PCQ"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6D0PC33PCQ');
        ` }} />
        <link rel="alternate" hrefLang="pl" href="https://getbuild.pl" />
      </head>
      <body className="text-[#0A0A0F] antialiased" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <SubtleAccents />
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
          <div className="absolute" style={{ top: '-150px', left: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
          <div className="absolute" style={{ bottom: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />
          <div className="absolute" style={{ top: '-100px', left: '50%', width: '400px', height: '400px', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)' }} />
        </div>
        <CookieConsent />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[#0055FF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg">Przejdź do treści</a>
        <MotionProvider>
          <div id="main-content" className="relative" style={{ zIndex: 1 }}>{children}</div>
        </MotionProvider>
      </body>
    </html>
  )
}
