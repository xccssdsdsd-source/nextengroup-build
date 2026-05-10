import type { Metadata } from 'next'
import { Syne, Figtree, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'

const siteUrl = 'https://getbuild.pl'
const siteTitle = 'Getbuild.pl | Strony WWW & Automatyzacje'
const siteDescription =
  'Projektujemy strony WWW i automatyzacje AI dla małych firm. Więcej zapytań, szybsza obsługa leadów i darmowa wizualizacja w 24h.'

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
    'automatyzacje ai',
    'landing page',
    'chatbot ai',
    'getbuild',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'Getbuild.pl',
    locale: 'pl_PL',
    images: [
      {
        url: '/logo.png',
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
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
      </head>
      <body className="bg-[#020810] text-[#e8f0ff] antialiased">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KVGVGL8M" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
