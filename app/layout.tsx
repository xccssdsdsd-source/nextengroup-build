import type { Metadata } from 'next'
import { Syne, Figtree, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'

const siteUrl = 'https://getbuild.pl'
const siteTitle = 'Getbuild | Agencja Web Services i SEO dla firm B2B | Trójmiasto'
const siteDescription =
  'Tworzymy strony www, sklepy i wdrażamy SEO dla firm B2B w całej Polsce. Agencja z Trójmiasta. Bezpłatna konsultacja i wycena projektu.'

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
    'agencja web services',
    'strony www dla firm',
    'SEO dla firm B2B',
    'sklepy internetowe',
    'audyt SEO',
    'getbuild',
    'Trójmiasto',
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
    icon: '/logo.png',
    shortcut: '/logo.png',
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
        <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KVGVGL8M');`}} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6D0PC33PCQ"></script>
        <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-6D0PC33PCQ');`}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': 'https://getbuild.pl/#organization',
          'name': 'Getbuild',
          'url': 'https://getbuild.pl',
          'logo': 'https://getbuild.pl/logo.png',
          'image': 'https://getbuild.pl/og-image.jpg',
          'description': 'Agencja web services i SEO dla firm B2B w Polsce. Tworzymy strony www, sklepy internetowe, wdrożenia SEO i automatyzacje biznesowe.',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Trójmiasto',
            'addressRegion': 'Pomorskie',
            'addressCountry': 'PL'
          },
          'areaServed': {
            '@type': 'Country',
            'name': 'Polska'
          },
          'serviceType': [
            'Tworzenie stron internetowych',
            'Tworzenie sklepów internetowych',
            'SEO i pozycjonowanie',
            'Audyt SEO',
            'Automatyzacja procesów biznesowych'
          ],
          'priceRange': '$$',
          'sameAs': [
            'https://www.linkedin.com/company/getbuild',
            'https://www.instagram.com/getbuild'
          ]
        })} />}
        <link rel="alternate" hrefLang="pl" href="https://getbuild.pl" />
      </head>
      <body className="bg-[#020810] text-[#e8f0ff] antialiased">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KVGVGL8M" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
