import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'
import CookieConsent from '@/components/CookieConsent'

const siteUrl = 'https://getbuild.pl'
const siteTitle = 'Getbuild | Strony WWW, automatyzacje AI i agenci AI'
const siteDescription =
  'W Getbuild.pl wdrażamy zaawansowane rozwiązania techniczne dla Twojej firmy. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe i wdrażamy inteligentnych agentów AI, którzy realnie odciążają zespół oraz zwiększają efektywność operacyjną.'

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
        url: '/og-image.jpg',
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
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
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
        <link rel="icon" type="image/png" href="/logo.png" sizes="any" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta property="og:image" content="https://getbuild.pl/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': 'https://getbuild.pl/#organization',
          name: 'Getbuild',
          url: 'https://getbuild.pl',
          logo: 'https://getbuild.pl/logo.png',
          image: 'https://getbuild.pl/og-image.jpg',
          description: 'W Getbuild.pl wdrażamy zaawansowane rozwiązania techniczne dla Twojej firmy. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe i wdrażamy inteligentnych agentów AI, którzy realnie odciążają zespół oraz zwiększają efektywność operacyjną.',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'PL',
          },
          areaServed: {
            '@type': 'Country',
            name: 'Polska',
          },
          serviceType: [
            'Tworzenie stron WWW',
            'Automatyzacje AI',
            'Agenci AI',
            'Rozwiązania IT',
          ],
          priceRange: '$$',
          sameAs: [
            'https://www.linkedin.com/company/getbuild',
            'https://www.instagram.com/getbuild.pl/',
          ],
        }) }} />
        <link rel="alternate" hrefLang="pl" href="https://getbuild.pl" />
      </head>
      <body className="bg-white text-[#0A0A0F] antialiased" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <CookieConsent />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[#0055FF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg">Przejdź do treści</a>
        <Cursor />
        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}
