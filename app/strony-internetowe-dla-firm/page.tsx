import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'Strony internetowe dla firm B2B | Getbuild - Profesjonalne projekty',
  description: 'Tworzymy profesjonalne strony WWW dla firm B2B, producentów i dostawców usług. Projekty nastawione na sprzedaż, pozyskiwanie zapytań i wzrost efektywności biznesu.',
  keywords: ['strony internetowe dla firm', 'strony www B2B', 'tworzenie stron dla producentów', 'strony dla spółek', 'strony dla firm', 'projektowanie stron', 'strony z SEO', 'strony B2B'],
  alternates: {
    canonical: 'https://getbuild.pl/strony-internetowe-dla-firm',
  },
  openGraph: {
    title: 'Strony internetowe dla firm B2B | Getbuild - Profesjonalne projekty',
    description: 'Tworzymy profesjonalne strony WWW dla firm B2B, producentów i dostawców usług. Projekty nastawione na sprzedaż i pozyskiwanie zapytań.',
    url: 'https://getbuild.pl/strony-internetowe-dla-firm',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/logo-opt.png',
        width: 1200,
        height: 630,
        alt: 'Strony internetowe dla firm B2B | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strony internetowe dla firm B2B | Getbuild - Profesjonalne projekty',
    description: 'Tworzymy profesjonalne strony WWW dla firm B2B, producentów i dostawców usług.',
    images: ['https://getbuild.pl/logo-opt.png'],
  },
}

export default function StronyInternetoweDlaFirm() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Strony internetowe dla firm B2B',
    description: 'Profesjonalne tworzenie stron internetowych dla firm, producentów i dostawców usług w całej Polsce.',
    serviceType: 'Tworzenie stron internetowych',
    provider: {
      '@type': 'Organization',
      '@id': 'https://getbuild.pl/#organization',
      name: 'Getbuild',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Polska',
    },
    url: 'https://getbuild.pl/strony-internetowe-dla-firm',
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="px-6 pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-20 bg-white sm:px-8 lg:pb-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6" style={{ fontFamily: 'var(--font-barlow)' }}>
            Strony internetowe dla firm B2B
          </h1>
          <p className="text-lg leading-7 text-[#6B7280] mb-8">
            Tworzymy strony internetowe dla firm B2B, które budują wiarygodność, porządkują ofertę i pomagają pozyskiwać realne zapytania ofertowe.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Problem klientów B2B</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Brak profesjonalnej obecności online sprawia, że firma traci część szans sprzedażowych:
          </p>
          <ul className="space-y-3 mb-8 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Potencjalni klienci nie znajdują Twojej oferty w Google.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Konkurencja szybciej buduje zaufanie dzięki lepszej stronie.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Oferta jest nieczytelna i trudna do szybkiego zrozumienia.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Brakuje jasnej ścieżki prowadzącej do kontaktu.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">•</span> Strona nie wspiera sprzedaży ani działań marketingowych.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Nasze rozwiązanie</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Projektujemy strony dopasowane do realiów sprzedaży B2B:
          </p>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Projekt dopasowany do branży</h3>
              <p className="text-sm text-[#6B7280]">Każda strona powstaje z myślą o specyfice oferty, procesie zakupowym i odbiorcy końcowym.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">SEO od podstaw</h3>
              <p className="text-sm text-[#6B7280]">Dbamy o strukturę nagłówków, treści, meta tagi i techniczne fundamenty widoczności.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Responsywność</h3>
              <p className="text-sm text-[#6B7280]">Strona działa czytelnie i szybko na telefonach, tabletach i komputerach.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Integracje i analityka</h3>
              <p className="text-sm text-[#6B7280]">Łączymy stronę z CRM, analityką i formularzami tak, aby nie gubić żadnego zapytania.</p>
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
                <p className="text-sm text-[#6B7280]">Poznajemy Twoją firmę, ofertę, konkurencję i cele biznesowe.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Analiza i strategia</h3>
                <p className="text-sm text-[#6B7280]">Układamy strukturę strony, priorytety komunikacyjne i założenia SEO.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Projekt i wdrożenie</h3>
                <p className="text-sm text-[#6B7280]">Tworzymy projekt, wdrażamy stronę i integrujemy potrzebne narzędzia.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Testy i publikacja</h3>
                <p className="text-sm text-[#6B7280]">Sprawdzamy działanie strony na różnych urządzeniach i publikujemy gotową wersję.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Monitoring i rozwój</h3>
                <p className="text-sm text-[#6B7280]">Analizujemy wyniki i rozwijamy stronę na podstawie danych.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dla kogo tworzymy strony internetowe</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Pracujemy przede wszystkim z firmami B2B z różnych branż:
          </p>
          <ul className="space-y-2 text-[#6B7280] columns-2">
            <li>• Producenci i dostawcy materiałów</li>
            <li>• Firmy technologiczne</li>
            <li>• Doradztwo i usługi specjalistyczne</li>
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
