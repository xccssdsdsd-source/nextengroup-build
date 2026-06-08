import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const projects = [
  {
    name: 'PM Apartments',
    tagline: 'WykoĹ„czenia pod klucz, WrocĹ‚aw',
    url: 'https://pm-apartments.pl/',
    description: 'Strona internetowa dla PM Apartments - firmy zajmujÄ…cej siÄ™ wykoĹ„czeniami pod klucz we WrocĹ‚awiu. Klient miaĹ‚ firmÄ™ bez obecnoĹ›ci w sieci i potrzebowaĹ‚ nowoczesnej strony prezentujÄ…cej portfel prac. Teraz ma stronÄ™, ktĂłra automatycznie odbiera zapytania i umawia spotkania. Nowi potencjalni klienci trafiajÄ… bezpoĹ›rednio do zintegrowanego kalendarza rezerwacji.',
  },
  {
    name: 'Dorimari',
    tagline: 'Autorskie wycieczki po Sycylii',
    url: 'https://dorimari.pl',
    description: 'Strona internetowa dla Dorimari - agencji specjalizujÄ…cej siÄ™ w autorskich, butikowych wycieczkach premium po Sycylii. Klient prowadzi wyjÄ…tkowe doĹ›wiadczenia turystyczne i potrzebowaĹ‚ miejsca, ktĂłre sprzedaje klimat i atmosferÄ™ podrĂłĹĽy, nie tylko trasÄ™.',
  },
  {
    name: 'MS Design Studio',
    tagline: 'Wizualizacje 3D wnÄ™trz i architektury',
    url: 'https://msdesignstudio.pl/',
    description: 'Strona internetowa dla MS Design Studio - studia specjalizujÄ…cego siÄ™ w profesjonalnych wizualizacjach 3D wnÄ™trz i projektach architektonicznych. Klientka tworzy wysokiej jakoĹ›ci wizualizacje i potrzebowaĹ‚a portfolio online, ktĂłre samo mĂłwi za siebie.',
  },
]

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'Portfolio i realizacje | Getbuild - Case studies B2B',
  description: 'Case studies i realizacje projektĂłw dla firm B2B. Strony WWW, sklepy e-commerce, SEO i automatyzacje dla producentĂłw, dostawcĂłw i firm technologicznych.',
  keywords: ['portfolio B2B', 'case studies', 'realizacje', 'strony dla firm', 'projekty B2B', 'portfolio web design', 'przykĹ‚ady projektĂłw'],
  alternates: {
    canonical: 'https://getbuild.pl/realizacje',
  },
  openGraph: {
    title: 'Portfolio i realizacje | Getbuild - Case studies B2B',
    description: 'Case studies i realizacje projektĂłw dla firm B2B. Strony WWW, sklepy e-commerce, SEO i automatyzacje.',
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
    description: 'Case studies i realizacje projektĂłw dla firm B2B.',
    images: ['https://getbuild.pl/getbuild-logo-og.png'],
  },
}

export default function Realizacje() {
  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://getbuild.pl/realizacje#webpage',
    name: 'Portfolio i realizacje',
    description: 'Case studies i realizacje projektĂłw dla firm B2B',
    url: 'https://getbuild.pl/realizacje',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://getbuild.pl#website',
      name: 'Getbuild',
      url: 'https://getbuild.pl',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, idx) => ({
        '@type': 'CreativeWork',
        '@id': `https://getbuild.pl/realizacje#project-${idx}`,
        name: project.name,
        description: project.description,
        url: project.url,
        creator: {
          '@type': 'Organization',
          '@id': 'https://getbuild.pl#organization',
          name: 'Getbuild',
          url: 'https://getbuild.pl',
        },
      })),
    },
  }

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
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

