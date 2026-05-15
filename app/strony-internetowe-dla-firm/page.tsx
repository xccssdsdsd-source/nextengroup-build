import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Strony internetowe dla firm B2B | Getbuild',
  description: 'Tworzymy profesjonalne strony www dla firm B2B, producentów i dostawców usług. Projekty dostosowane do sprzedaży i pozyskiwania leadów.',
  keywords: ['strony internetowe dla firm', 'strony www B2B', 'tworzenie stron dla producentów', 'strony dla spółek', 'strony dla firm'],
  alternates: {
    canonical: 'https://getbuild.pl/strony-internetowe-dla-firm',
  },
  openGraph: {
    title: 'Strony internetowe dla firm B2B | Getbuild',
    description: 'Tworzymy profesjonalne strony www dla firm B2B, producentów i dostawców usług. Projekty dostosowane do sprzedaży i pozyskiwania leadów.',
    url: 'https://getbuild.pl/strony-internetowe-dla-firm',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function StronyInternetoweDlaFirm() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Strony internetowe dla firm B2B',
    'description': 'Profesjonalne tworzenie stron internetowych dla firm, producentów i dostawców usług w całej Polsce.',
    'serviceType': 'Tworzenie stron internetowych',
    'provider': {
      '@type': 'Organization',
      '@id': 'https://getbuild.pl/#organization',
      'name': 'Getbuild',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Polska',
    },
    'url': 'https://getbuild.pl/strony-internetowe-dla-firm',
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}} />

      <section className="px-6 py-20 bg-white sm:px-8 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6" style={{ fontFamily: 'var(--font-barlow)' }}>
            Strony internetowe dla firm B2B
          </h1>
          <p className="text-lg leading-7 text-[#6B7280] mb-8">
            Getbuild to agencja web services z Trójmiasta specjalizująca się w tworzeniu stron internetowych dla firm B2B. Tworzymy projekty, które budują wiarygodność, porządkują ofertę i generują realne zapytania ofertowe dla producentów, dostawców usług, spółek i firm technologicznych w całej Polsce.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Problem klientów B2B</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Firmy B2B w Polsce często mają słabą lub brak obecności online. Brak profesjonalnej strony internetowej dla firm oznacza:
          </p>
          <ul className="space-y-3 mb-8 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Utrata potencjalnych klientów, którzy szukają Twojej branży w Google</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Brak wiarygodności - konkurenci z lepszą stroną www zdobywają zaufanie szybciej</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Trudność w zarządzaniu ofertą i wykazywaniem przypadków sukcesów</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Brak ścieżki, która kieruje potencjalnych klientów do bezpośredniego kontaktu</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Niskie pozycjonowanie w Google - konkurenci wyprzedzają Cię w wyszukiwarkach</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Nasze rozwiązanie</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Tworzymy profesjonalne strony internetowe dla firm, które są dostosowane do specyfiki B2B:
          </p>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Design dostosowany do branży</h3>
              <p className="text-sm text-[#6B7280]">Każda strona www dla firm jest projektowana z myślą o specyfice Twojej branży - czy to producent, dostawca usług, czy firma technologiczna.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">SEO od podstaw</h3>
              <p className="text-sm text-[#6B7280]">Strona jest budowana z myślą o SEO dla firm B2B - optymalne nagłówki H1, H2, metataigi, schemat.org i struktura.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Mobile-first i responsywne</h3>
              <p className="text-sm text-[#6B7280]">Szybkie ładowanie, idealne wyświetlanie na telefonach, tabletach i komputerach.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Lead tracking i integracje</h3>
              <p className="text-sm text-[#6B7280]">Integracja z CRM, Google Analytics, formularze kontaktowe z tracking'iem, integracja z Twoimi narzędziami biznesowymi.</p>
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
                <h3 className="font-bold text-[#0A0A0A] mb-1">Bezpłatna konsultacja</h3>
                <p className="text-sm text-[#6B7280]">Poznajemy Twoją firmę, konkurentów i cele biznesowe. Omawiamy, jaki typ strony www dla firm będzie dla Ciebie optymalny.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Analiza i strategia SEO</h3>
                <p className="text-sm text-[#6B7280]">Analizujemy Twoją branżę, słowa kluczowe dla firm, strukturę konkurencji. Tworzymy strategię SEO dla strony.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Projektowanie i wdrożenie</h3>
                <p className="text-sm text-[#6B7280]">Tworzymy design dostosowany do Twojej marki, implementujemy best practices SEO dla firm B2B, integrujemy narzędzia.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Testowanie i wdrożenie</h3>
                <p className="text-sm text-[#6B7280]">Testujemy na urządzeniach, przeglądarkach, optymalizujemy szybkość ładowania. Wdrażamy stronę na produkcję.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Monitoring i optymalizacja</h3>
                <p className="text-sm text-[#6B7280]">Monitorujemy pozycje w Google, traffic, konwersje. Optymalizujemy stronę na podstawie danych analitycznych.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dla kogo tworzymy strony internetowe</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Specjalizujemy się w tworzeniu stron internetowych dla firm B2B w różnych branżach:
          </p>
          <ul className="space-y-2 text-[#6B7280] columns-2">
            <li>• Producenci i dostawcy materiałów</li>
            <li>• Firmy technologiczne i software'owe</li>
            <li>• Usługi konsultingowe i doradztwo</li>
            <li>• Agencje kreatywne i marketingowe</li>
            <li>• Firmy transportowe i logistyczne</li>
            <li>• Dostawcy usług dla biznesu</li>
            <li>• Firmy produkcyjne</li>
            <li>• Biura projektowe i architektoniczne</li>
          </ul>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
