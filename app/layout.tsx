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
  weight: ['300', '400', '500'],
  variable: '--font-figtree',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Next Group — Strony WWW & Automatyzacje AI',
  description: 'Tworzymy strony internetowe i automatyzacje AI dla polskich firm. Projekt wizualizacji w 24h. Napisz po bezpłatny projekt.',
  keywords: 'strony www, automatyzacje AI, chatbot AI, web design, Next Group, Polska',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${syne.variable} ${figtree.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased bg-[#020810] text-[#e8f0ff]">
        <Cursor />
        {children}
      </body>
    </html>
  )
}
