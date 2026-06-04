import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'Portfolio i realizacje | Getbuild - Case studies B2B',
  description: 'Case studies i realizacje projektów dla firm B2B. Strony WWW, sklepy e-commerce, SEO i automatyzacje dla producentów, dostawców i firm technologicznych.',
  keywords: ['portfolio B2B', 'case studies', 'realizacje', 'strony dla firm', 'projekty B2B', 'portfolio web design', 'przykłady projektów'],
  alternates: {
    canonical: 'https://getbuild.pl/realizacje',
  },
  openGraph: {
    title: 'Portfolio i realizacje | Getbuild - Case studies B2B',
    description: 'Case studies i realizacje projektów dla firm B2B. Strony WWW, sklepy e-commerce, SEO i automatyzacje.',
    url: 'https://getbuild.pl/realizacje',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/logo-opt.png',
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
    images: ['https://getbuild.pl/logo-opt.png'],
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

      <Portfolio />

      <Contact />
      <Footer />
    </main>
  )
}
