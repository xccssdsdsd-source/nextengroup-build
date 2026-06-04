import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'SEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google',
  description: 'Pozycjonowanie firm B2B w Google. Strategie SEO, audyt SEO i link building dla firm w całej Polsce. Getbuild — wdrożenia SEO dla polskich firm B2B.',
  keywords: ['SEO dla firm', 'pozycjonowanie firm B2B', 'audyt SEO', 'agencja SEO', 'SEO dla firm B2B', 'link building', 'wdrożenia SEO', 'strategie SEO'],
  alternates: {
    canonical: 'https://getbuild.pl/seo-dla-firm',
  },
  openGraph: {
    title: 'SEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google',
    description: 'Pozycjonowanie firm B2B w Google. Strategie SEO, audyt SEO i link building dla firm w całej Polsce.',
    url: 'https://getbuild.pl/seo-dla-firm',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/logo-opt.png',
        width: 1200,
        height: 630,
        alt: 'SEO dla firm B2B w Polsce | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google',
    description: 'Pozycjonowanie firm B2B w Google. Strategie SEO, audyt SEO i link building.',
    images: ['https://getbuild.pl/logo-opt.png'],
  },
}

export default function SEODlaFirm() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO dla firm B2B',
    description: 'Strategie SEO i pozycjonowanie firm B2B w Google.',
    serviceType: 'SEO i pozycjonowanie',
    provider: {
      '@type': 'Organization',
      '@id': 'https://getbuild.pl/#organization',
      name: 'Getbuild',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Polska',
    },
    url: 'https://getbuild.pl/seo-dla-firm',
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'SEO dla firm' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            SEO i pozycjonowanie firm w Google
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Getbuild specjalizuje się w SEO dla firm B2B w Polsce. Tworzymy strategie, które przekładają się na większą widoczność w Google, większy ruch organiczny i więcej wartościowych zapytań ofertowych od potencjalnych klientów.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Problem firm B2B bez SEO</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Wiele firm B2B w Polsce traci szansę na pozyskiwanie klientów online, bo nie inwestuje w widoczność organiczną:
          </p>
          <ul className="space-y-3 mb-8 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Potencjalni klienci szukają usług w Google, ale Twoja strona nie pojawia się wysoko w wynikach.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Konkurencja zajmuje czołowe pozycje na ważne frazy branżowe.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Większość budżetu marketingowego pochłania płatna reklama.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Brakuje stabilnego ruchu organicznego i przewidywalnych zapytań.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Strona nie pracuje na sprzedaż po godzinach i nie wspiera regularnie działu handlowego.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Nasza strategia SEO dla firm</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Nasze usługi SEO dla firm obejmują:
          </p>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Audyt SEO</h3>
              <p className="text-sm text-[#6B7280]">Kompleksowa analiza strony: techniczna, treściowa, konkurencyjna i oparta na słowach kluczowych.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Strategia SEO B2B</h3>
              <p className="text-sm text-[#6B7280]">Dostosowana strategia dla branży, konkurencji i fraz, które realnie wspierają sprzedaż.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Optymalizacja on-page</h3>
              <p className="text-sm text-[#6B7280]">Praca nad treścią, nagłówkami, meta tagami, strukturą danych i linkowaniem wewnętrznym.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Link building</h3>
              <p className="text-sm text-[#6B7280]">Budowanie wartościowego profilu linków z wiarygodnych źródeł branżowych i biznesowych.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Optymalizacja techniczna</h3>
              <p className="text-sm text-[#6B7280]">Szybkość ładowania, wersja mobilna, Core Web Vitals, indeksowanie i porządek techniczny strony.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Monitoring i raportowanie</h3>
              <p className="text-sm text-[#6B7280]">Regularny monitoring pozycji, ruchu i konwersji wraz z miesięcznymi raportami i rekomendacjami.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Proces współpracy</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Audyt SEO</h3>
                <p className="text-sm text-[#6B7280]">Zaczynamy od pełnego audytu strony i analizy konkurencji.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Strategia SEO B2B</h3>
                <p className="text-sm text-[#6B7280]">Tworzymy plan działań oparty na realnym potencjale biznesowym i intencji użytkowników.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Wdrożenie</h3>
                <p className="text-sm text-[#6B7280]">Wprowadzamy zmiany techniczne, treściowe i linkowe oraz integrujemy narzędzia analityczne.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Monitoring</h3>
                <p className="text-sm text-[#6B7280]">Śledzimy wyniki i raportujemy efekty działań.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Optymalizacja na bieżąco</h3>
                <p className="text-sm text-[#6B7280]">Na podstawie danych rozwijamy strategię i wzmacniamy to, co działa najlepiej.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dla jakich branż robimy SEO</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Mamy doświadczenie w SEO dla firm B2B z różnych sektorów:
          </p>
          <ul className="space-y-2 text-[#6B7280] columns-2">
            <li>• Producenci i dostawcy materiałów</li>
            <li>• Firmy technologiczne i software'owe</li>
            <li>• Doradztwo biznesowe i konsulting</li>
            <li>• Agencje marketingowe i kreatywne</li>
            <li>• Transport i logistyka</li>
            <li>• Usługi dla biznesu</li>
            <li>• Produkcja i przetwórstwo</li>
            <li>• Biura i pracownie projektowe</li>
          </ul>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
