import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Portfolio = dynamic(() => import('@/components/Portfolio'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'Portfolio i realizacje | Getbuild - Case studies B2B',
  description: 'Case studies i realizacje projektów dla firm B2B. Strony WWW, SEO i automatyzacje AI dla producentów, dostawców i firm technologicznych.',
  keywords: ['portfolio B2B', 'case studies', 'realizacje', 'strony dla firm', 'projekty B2B', 'portfolio web design', 'przykłady projektów'],
  alternates: {
    canonical: 'https://getbuild.pl/realizacje',
  },
  openGraph: {
    title: 'Portfolio i realizacje | Getbuild - Case studies B2B',
    description: 'Case studies i realizacje projektów dla firm B2B. Strony WWW, SEO i automatyzacje AI.',
    url: 'https://getbuild.pl/realizacje',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/getbuild-logo-og.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio i realizacje Getbuild - Case studies B2B',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio i realizacje | Getbuild - Case studies B2B',
    description: 'Case studies i realizacje projektów dla firm B2B.',
    images: ['https://getbuild.pl/getbuild-logo-og.png'],
  },
}

export default function Realizacje() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Realizacje' },
      ]} />

      <div style={{ height: 'var(--nav-h)' }} aria-hidden="true" />
      <Portfolio asH1 />

      <Contact />
      <Footer />
    </main>
  )
}
