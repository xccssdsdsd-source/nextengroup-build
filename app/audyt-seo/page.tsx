import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Bezpłatny audyt SEO dla firm B2B | Getbuild',
  description: 'Darmowy audyt SEO Twojej strony internetowej. Kompleksowa analiza SEO, konkurencji i linków wraz z rekomendacjami dla firmy. Wdrożenia SEO dla firm B2B w Polsce.',
  keywords: ['audyt SEO', 'audyt SEO dla firm', 'analiza SEO', 'bezpłatny audyt', 'SEO dla firm', 'pozycjonowanie', 'audyt strony'],
  alternates: {
    canonical: 'https://getbuild.pl/audyt-seo',
  },
  openGraph: {
    title: 'Bezpłatny audyt SEO dla firm B2B | Getbuild',
    description: 'Darmowy audyt SEO Twojej strony internetowej. Kompleksowa analiza SEO, konkurencji i linków.',
    url: 'https://getbuild.pl/audyt-seo',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/logo-opt.png',
        width: 1200,
        height: 630,
        alt: 'Bezpłatny audyt SEO dla firm B2B | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bezpłatny audyt SEO dla firm B2B | Getbuild',
    description: 'Darmowy audyt SEO Twojej strony internetowej. Kompleksowa analiza SEO.',
    images: ['https://getbuild.pl/logo-opt.png'],
  },
}

export default function AudytSEO() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Audyt SEO',
    description: 'Bezpłatny audyt SEO dla firm B2B.',
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
            Bezpłatny audyt SEO dla Twojej strony
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Oferujemy bezpłatny audyt SEO dla firm B2B. Analizujemy Twoją stronę internetową i przygotowujemy raport z konkretnymi rekomendacjami, które pomagają poprawić widoczność w Google i zwiększyć ruch organiczny.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Co zawiera audyt SEO</h2>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza on-page</h3>
              <p className="text-sm text-[#6B7280]">Sprawdzenie nagłówków, meta tagów, słów kluczowych, struktury treści i linkowania wewnętrznego.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">SEO techniczne</h3>
              <p className="text-sm text-[#6B7280]">Szybkość ładowania, wersja mobilna, Core Web Vitals, indeksowanie, mapa strony, robots.txt i znaczniki kanoniczne.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza linków</h3>
              <p className="text-sm text-[#6B7280]">Ocena jakości i liczby linków prowadzących do strony, porównanie z konkurencją i wskazanie szans na rozwój profilu linkowego.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza konkurencji</h3>
              <p className="text-sm text-[#6B7280]">Badanie najważniejszych konkurentów, ich strategii SEO i słów kluczowych, na które są widoczni.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza słów kluczowych</h3>
              <p className="text-sm text-[#6B7280]">Ocena obecnych fraz, ich potencjału ruchu, trudności oraz nowych tematów do zagospodarowania.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Raport i rekomendacje</h3>
              <p className="text-sm text-[#6B7280]">Szczegółowy raport PDF z priorytetami działań i rekomendowaną kolejnością wdrożeń.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Jak zamówić audyt SEO</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Skontaktuj się z nami</h3>
                <p className="text-sm text-[#6B7280]">Napisz do nas i podaj adres swojej strony oraz krótki opis biznesu.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Krótka rozmowa</h3>
                <p className="text-sm text-[#6B7280]">Ustalimy zakres audytu, priorytety i realny harmonogram pracy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Przeprowadzenie audytu</h3>
                <p className="text-sm text-[#6B7280]">Sprawdzamy stronę od strony technicznej, treściowej i strategicznej.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Raport i omówienie</h3>
                <p className="text-sm text-[#6B7280]">Przekazujemy raport i omawiamy wnioski oraz rekomendowane działania.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Wdrożenie opcjonalne</h3>
                <p className="text-sm text-[#6B7280]">Jeśli chcesz, możemy też wdrożyć rekomendacje wynikające z audytu.</p>
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
