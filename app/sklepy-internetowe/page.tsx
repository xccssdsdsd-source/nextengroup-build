import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sklepy internetowe B2B i e-commerce | Getbuild',
  description: 'Tworzymy sklepy internetowe, platformy e-commerce i rozwiązania B2B dla firm. Integracja z systemami, szybkość, konwersja.',
  keywords: ['sklepy internetowe', 'e-commerce', 'e-commerce B2B', 'platforma B2B', 'sklepy dla producentów'],
  alternates: {
    canonical: 'https://getbuild.pl/sklepy-internetowe',
  },
  openGraph: {
    title: 'Sklepy internetowe B2B i e-commerce | Getbuild',
    description: 'Tworzymy sklepy internetowe, platformy e-commerce i rozwiązania B2B dla firm.',
    url: 'https://getbuild.pl/sklepy-internetowe',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function SklepyInternetowe() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Sklepy internetowe i platformy B2B',
    'description': 'Tworzenie sklepów internetowych, platform e-commerce i rozwiązań B2B dla firm.',
    'serviceType': 'Tworzenie sklepów internetowych',
    'provider': {
      '@type': 'Organization',
      '@id': 'https://getbuild.pl/#organization',
      'name': 'Getbuild',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Polska',
    },
    'url': 'https://getbuild.pl/sklepy-internetowe',
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}} />

      <section className="px-6 py-20 bg-white sm:px-8 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6" style={{ fontFamily: 'var(--font-barlow)' }}>
            Sklepy internetowe i platformy e-commerce
          </h1>
          <p className="text-lg leading-7 text-[#6B7280] mb-8">
            Getbuild tworzy sklepy internetowe, platformy e-commerce i rozwiązania B2B dla firm, producentów i dostawców w całej Polsce. Nasze projekty obsługują zarówno sprzedaż do klientów detalicznych (B2C), jak i biznesowych (B2B).
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Problem firm bez e-commerce</h2>
          <ul className="space-y-3 mb-8 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Sprzedaż offline ogranicza do lokalnych klientów</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Brak możliwości sprzedaży 24/7 - tracisz zamówienia poza godzinami pracy</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Konkurencja robi e-commerce i zajmuje rynek</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Ręczne procesowanie zamówień - zmarnowany czas zespołu</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Brak dostępu do danych analitycznych o zachowaniu klientów</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Nasze rozwiązania e-commerce</h2>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Sklepy B2C - dla detali</h3>
              <p className="text-sm text-[#6B7280]">Sklepy internetowe dla sprzedaży produktów indywidualnym klientom - intuicyjny katalog, szybka obsługa, popularne metody płatności.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Platformy B2B</h3>
              <p className="text-sm text-[#6B7280]">Sklepy dla biznesu - katalogi hurtowe, ceny zależne od ilości, logowanie dla firm, specjalne warunki dla stałych partnerów.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Integracje i automatyzacja</h3>
              <p className="text-sm text-[#6B7280]">Integracja z systemami magazynowymi, księgowością, kurierami, CRM - wszystko działa automatycznie.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Zaawansowana analityka</h3>
              <p className="text-sm text-[#6B7280]">Raporty sprzedaży, analiza zachowań klientów, testowanie konwersji - decyzje oparte na danych.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Proces wdrożenia</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Analiza i strategia</h3>
                <p className="text-sm text-[#6B7280]">Rozumiemy Twoją sprzedaż, produkty, klientów. Definiujemy strukturę sklepu i integracje.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Projektowanie UX/UI</h3>
                <p className="text-sm text-[#6B7280]">Tworzymy flow zakupowy, który konwertuje - od przeglądania do checkout'u.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Wdrożenie i integracje</h3>
                <p className="text-sm text-[#6B7280]">Budujemy sklep, integrujemy systemy, przesyłamy dane produktów, konfigurujemy płatności.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Testowanie</h3>
                <p className="text-sm text-[#6B7280]">Testujemy wszystkie scenariusze - zakupy, płatności, wysyłka, zwroty.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Launch i wsparcie</h3>
                <p className="text-sm text-[#6B7280]">Wdrażamy sklep, szkolimy Twój zespół, wspieramy przy pierwszych zamówieniach.</p>
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
