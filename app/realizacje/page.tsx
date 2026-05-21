import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Realizacje i portfolio B2B | Getbuild',
  description: 'Case studies i realizacje projektów dla firm B2B. Strony WWW, sklepy i SEO dla producentów, dostawców i firm technologicznych.',
  keywords: ['portfolio B2B', 'case studies', 'realizacje', 'strony dla firm', 'projekty B2B'],
  alternates: {
    canonical: 'https://getbuild.pl/realizacje',
  },
  openGraph: {
    title: 'Realizacje i portfolio B2B | Getbuild',
    description: 'Case studies i realizacje projektów dla firm B2B.',
    url: 'https://getbuild.pl/realizacje',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function Realizacje() {
  return (
    <main className="overflow-x-hidden">
      <Nav />

      <Portfolio />

      <Contact />
      <Footer />
    </main>
  )
}
