import type { Metadata } from 'next'
import { Syne, Figtree, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'

const siteUrl = 'https://getbuild.pl'
const siteTitle = 'Getbuild | Strony WWW, automatyzacje AI i agenci AI'
const siteDescription =
  'Getbuild projektuje i wdraża rozwiązania IT. Tworzymy strony WWW, automatyzacje AI i agentów AI wspierających sprzedaż i obsługę procesów.'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-figtree',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-barlow',
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
      className={`${syne.variable} ${figtree.variable} ${barlowCondensed.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/logo.png" sizes="any" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta property="og:image" content="https://getbuild.pl/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KVGVGL8M');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': 'https://getbuild.pl/#organization',
          name: 'Getbuild',
          url: 'https://getbuild.pl',
          logo: 'https://getbuild.pl/logo.png',
          image: 'https://getbuild.pl/og-image.jpg',
          description: 'Getbuild projektuje i wdraża rozwiązania IT. Tworzymy strony WWW, automatyzacje AI i agentów AI wspierających rozwój firm.',
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
      <body className="bg-[#020810] text-[#e8f0ff] antialiased">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KVGVGL8M" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[#0055FF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg">Przejdź do treści</a>
        <Cursor />
        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}
