export const runtime = 'edge'

import type { Metadata } from 'next'
import { Syne, Figtree, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'

const siteUrl = 'https://nextengroup.pl'
const siteTitle = 'Nexten Group | Strony WWW i Automatyzacje AI'
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
    'nexten group',
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: 'Nexten Group',
    locale: 'pl_PL',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
      <body className="bg-[#020810] text-[#e8f0ff] antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  )
}
