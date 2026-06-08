import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'BezpĹ‚atny audyt SEO dla firm B2B | Getbuild',
  description: 'Darmowy audyt SEO Twojej strony internetowej. Kompleksowa analiza SEO, konkurencji i linkĂłw wraz z rekomendacjami dla firmy. WdroĹĽenia SEO dla firm B2B w Polsce.',
  keywords: ['audyt SEO', 'audyt SEO dla firm', 'analiza SEO', 'bezpĹ‚atny audyt', 'SEO dla firm', 'pozycjonowanie', 'audyt strony'],
  alternates: {
    canonical: 'https://getbuild.pl/audyt-seo',
  },
  openGraph: {
    title: 'BezpĹ‚atny audyt SEO dla firm B2B | Getbuild',
    description: 'Darmowy audyt SEO Twojej strony internetowej. Kompleksowa analiza SEO, konkurencji i linkĂłw.',
    url: 'https://getbuild.pl/audyt-seo',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/getbuild-logo-og.png',
        width: 1200,
        height: 630,
        alt: 'BezpĹ‚atny audyt SEO dla firm B2B | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BezpĹ‚atny audyt SEO dla firm B2B | Getbuild',
    description: 'Darmowy audyt SEO Twojej strony internetowej. Kompleksowa analiza SEO.',
    images: ['https://getbuild.pl/getbuild-logo-og.png'],
  },
}

export default function AudytSEO() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'BezpĹ‚atny audyt SEO dla firm B2B',
    description: 'Kompleksowy, bezpĹ‚atny audyt SEO dla firm B2B w Polsce. Analiza techniczna, on-page, linkĂłw i konkurencji wraz z raportem i rekomendacjami.',
    serviceType: 'Audyt SEO',
    provider: {
      '@type': 'Organization',
      '@id': 'https://getbuild.pl/#organization',
      name: 'Getbuild',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Polska',
    },
    url: 'https://getbuild.pl/audyt-seo',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      name: 'BezpĹ‚atny audyt SEO',
      description: 'BezpĹ‚atna analiza SEO strony internetowej z raportem i rekomendacjami.',
      url: 'https://getbuild.pl/audyt-seo',
    },
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Audyt SEO' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            BezpĹ‚atny audyt SEO dla Twojej strony
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Oferujemy bezpĹ‚atny audyt SEO dla firm B2B. Analizujemy TwojÄ… stronÄ™ internetowÄ… i przygotowujemy raport z konkretnymi rekomendacjami, ktĂłre pomagajÄ… poprawiÄ‡ widocznoĹ›Ä‡ w Google i zwiÄ™kszyÄ‡ ruch organiczny.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Co zawiera audyt SEO</h2>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza on-page</h3>
              <p className="text-sm text-[#6B7280]">Sprawdzenie nagĹ‚ĂłwkĂłw, meta tagĂłw, sĹ‚Ăłw kluczowych, struktury treĹ›ci i linkowania wewnÄ™trznego.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">SEO techniczne</h3>
              <p className="text-sm text-[#6B7280]">SzybkoĹ›Ä‡ Ĺ‚adowania, wersja mobilna, Core Web Vitals, indeksowanie, mapa strony, robots.txt i znaczniki kanoniczne.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza linkĂłw</h3>
              <p className="text-sm text-[#6B7280]">Ocena jakoĹ›ci i liczby linkĂłw prowadzÄ…cych do strony, porĂłwnanie z konkurencjÄ… i wskazanie szans na rozwĂłj profilu linkowego.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza konkurencji</h3>
              <p className="text-sm text-[#6B7280]">Badanie najwaĹĽniejszych konkurentĂłw, ich strategii SEO i sĹ‚Ăłw kluczowych, na ktĂłre sÄ… widoczni.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza sĹ‚Ăłw kluczowych</h3>
              <p className="text-sm text-[#6B7280]">Ocena obecnych fraz, ich potencjaĹ‚u ruchu, trudnoĹ›ci oraz nowych tematĂłw do zagospodarowania.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Raport i rekomendacje</h3>
              <p className="text-sm text-[#6B7280]">SzczegĂłĹ‚owy raport PDF z priorytetami dziaĹ‚aĹ„ i rekomendowanÄ… kolejnoĹ›ciÄ… wdroĹĽeĹ„.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Jak zamĂłwiÄ‡ audyt SEO</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Skontaktuj siÄ™ z nami</h3>
                <p className="text-sm text-[#6B7280]">Napisz do nas i podaj adres swojej strony oraz krĂłtki opis biznesu.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">KrĂłtka rozmowa</h3>
                <p className="text-sm text-[#6B7280]">Ustalimy zakres audytu, priorytety i realny harmonogram pracy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Przeprowadzenie audytu</h3>
                <p className="text-sm text-[#6B7280]">Sprawdzamy stronÄ™ od strony technicznej, treĹ›ciowej i strategicznej.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Raport i omĂłwienie</h3>
                <p className="text-sm text-[#6B7280]">Przekazujemy raport i omawiamy wnioski oraz rekomendowane dziaĹ‚ania.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">WdroĹĽenie opcjonalne</h3>
                <p className="text-sm text-[#6B7280]">JeĹ›li chcesz, moĹĽemy teĹĽ wdroĹĽyÄ‡ rekomendacje wynikajÄ…ce z audytu.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

