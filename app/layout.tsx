import type { Metadata } from 'next'
import { Syne, Figtree, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'

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
  title: 'Nexten Group | Strony WWW i Automatyzacje AI',
  description:
    'Projektujemy strony WWW i systemy AI, które porządkują leady i zwiększają liczbę zapytań. Darmowa wizualizacja w 24h.',
  keywords: [
    'strony www',
    'automatyzacje ai',
    'landing page',
    'chatbot ai',
    'nexten group',
  ],
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
