import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SEO dla firm B2B w Polsce | Getbuild',
  description: 'Pozycjonowanie firm B2B w Google. Strategie SEO, audyt SEO, link building dla firm w całej Polsce. Zwiększ widoczność w wyszukiwarce.',
  keywords: ['SEO dla firm', 'pozycjonowanie firm B2B', 'audyt SEO', 'agencja SEO', 'SEO dla firm B2B'],
  alternates: {
    canonical: 'https://getbuild.pl/seo-dla-firm',
  },
  openGraph: {
    title: 'SEO dla firm B2B w Polsce | Getbuild',
    description: 'Pozycjonowanie firm B2B w Google. Strategie SEO, audyt SEO, link building dla firm w całej Polsce.',
    url: 'https://getbuild.pl/seo-dla-firm',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function SEODlaFirm() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'SEO dla firm B2B',
    'description': 'Strategie SEO i pozycjonowanie firm B2B w Google.',
    'serviceType': 'SEO i pozycjonowanie',
    'provider': {
      '@type': 'Organization',
      '@id': 'https://getbuild.pl/#organization',
      'name': 'Getbuild',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Polska',
    },
    'url': 'https://getbuild.pl/seo-dla-firm',
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}} />

      <section className="px-6 py-20 bg-white sm:px-8 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6" style={{ fontFamily: 'var(--font-barlow)' }}>
            SEO i pozycjonowanie firm w Google
          </h1>
          <p className="text-lg leading-7 text-[#6B7280] mb-8">
            Getbuild to agencja SEO specjalizująca się w pozycjonowaniu firm B2B w Polsce. Stosujemy strategie SEO dla firm, które przynoszą wymierne rezultaty - wyższą widoczność w Google, więcej organicznego traffic'u i kwalifikowanych zapytań ofertowych.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Problem firm B2B bez SEO</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Wiele firm B2B w Polsce ignoruje SEO, tracąc tym samym ogromne możliwości pozyskiwania klientów online:
          </p>
          <ul className="space-y-3 mb-8 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Potencjalni klienci szukają firm w Google, ale Twoja strona jest niewidoczna</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Konkurencja zajmuje top pozycje dla słów kluczowych Twojej branży</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Większość budżetu marketingowego idzie na drogą reklamę (Google Ads, social)</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Brak organicznego traffic'u - wszyscy klienci pochodzą z płatnych źródeł</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Strona nie generuje zapytań ani w dzień, ani w nocy - czeka na Ciebie</li>
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
              <p className="text-sm text-[#6B7280]">Kompleksowy audyt SEO Twojej strony - analiza on-page, off-page, techniczna, konkurencji i słów kluczowych.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Strategie SEO B2B</h3>
              <p className="text-sm text-[#6B7280]">Dostosowana strategia SEO dla Twojej branży i konkurencji. Focus na słowa kluczowe, które konwertują.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Optymalizacja on-page</h3>
              <p className="text-sm text-[#6B7280]">Optymalizacja zawartości, nagłówków, meta tagów, schemat.org, wewnętrznego linkowania dla ranking'u.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Link building</h3>
              <p className="text-sm text-[#6B7280]">Budowanie linków z wysokiej jakości stron (branżowe artykuły, katalogi B2B, profile biznesowe).</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Optymalizacja techniczna</h3>
              <p className="text-sm text-[#6B7280]">Szybkość ładowania, mobilne, Core Web Vitals, crawlability, canonical, sitemap, robots.txt.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Monitoring i raportowanie</h3>
              <p className="text-sm text-[#6B7280]">Systematyczne monitorowanie pozycji, traffic'u, konwersji. Miesięczne raporty i optymalizacja strategi.</p>
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
                <p className="text-sm text-[#6B7280]">Przeprowadzamy kompleksowy audyt SEO Twojej strony, analizujemy konkurencję i potencjalne możliwości dla firm w Twojej branży.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Strategia SEO B2B</h3>
                <p className="text-sm text-[#6B7280]">Na podstawie audytu tworzymy dedykowaną strategię SEO dla Twojej firmy, z fokusem na słowa kluczowe o wysokiej intencji zakupowej.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Implementacja</h3>
                <p className="text-sm text-[#6B7280]">Wdrażamy optymalizacje on-page, prace techniczne, budujemy profile backlink'i i integrujemy Google Search Console.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Monitoring</h3>
                <p className="text-sm text-[#6B7280]">Monitorujemy pozycje w Google, traffic organiczny, konwersje. Raportujemy miesięczne wyniki.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Optymalizacja na bieżąco</h3>
                <p className="text-sm text-[#6B7280]">Na podstawie danych optymalizujemy strategię, testujemy nowe słowa kluczowe, poprawiamy konwersje.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dla jakich branż robimy SEO</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Doświadczenie w SEO dla firm B2B w różnych sektorach:
          </p>
          <ul className="space-y-2 text-[#6B7280] columns-2">
            <li>• Producenci i dostawcy materiałów</li>
            <li>• Software i firmy technologiczne</li>
            <li>• Konsulting i doradztwo biznesowe</li>
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
