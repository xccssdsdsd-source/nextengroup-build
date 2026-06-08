import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'Strony internetowe dla firm B2B | Getbuild - Profesjonalne projekty',
  description: 'Tworzymy profesjonalne strony WWW dla firm B2B, producentĂłw i dostawcĂłw usĹ‚ug. Projekty nastawione na sprzedaĹĽ, pozyskiwanie zapytaĹ„ i wzrost efektywnoĹ›ci biznesu.',
  keywords: ['strony internetowe dla firm', 'strony www B2B', 'tworzenie stron dla producentĂłw', 'strony dla spĂłĹ‚ek', 'strony dla firm', 'projektowanie stron', 'strony z SEO', 'strony B2B'],
  alternates: {
    canonical: 'https://getbuild.pl/strony-internetowe-dla-firm',
  },
  openGraph: {
    title: 'Strony internetowe dla firm B2B | Getbuild - Profesjonalne projekty',
    description: 'Tworzymy profesjonalne strony WWW dla firm B2B, producentĂłw i dostawcĂłw usĹ‚ug. Projekty nastawione na sprzedaĹĽ i pozyskiwanie zapytaĹ„.',
    url: 'https://getbuild.pl/strony-internetowe-dla-firm',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/getbuild-logo-og.png',
        width: 1200,
        height: 630,
        alt: 'Strony internetowe dla firm B2B | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strony internetowe dla firm B2B | Getbuild - Profesjonalne projekty',
    description: 'Tworzymy profesjonalne strony WWW dla firm B2B, producentĂłw i dostawcĂłw usĹ‚ug.',
    images: ['https://getbuild.pl/getbuild-logo-og.png'],
  },
}

export default function StronyInternetoweDlaFirm() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Strony internetowe dla firm B2B',
    description: 'Profesjonalne tworzenie stron internetowych dla firm, producentĂłw i dostawcĂłw usĹ‚ug w caĹ‚ej Polsce.',
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
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Strony internetowe dla firm' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Strony internetowe dla firm B2B
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Tworzymy strony internetowe dla firm B2B, ktĂłre budujÄ… wiarygodnoĹ›Ä‡, porzÄ…dkujÄ… ofertÄ™ i pomagajÄ… pozyskiwaÄ‡ realne zapytania ofertowe od potencjalnych klientĂłw.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Problem klientĂłw B2B</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Brak profesjonalnej obecnoĹ›ci online sprawia, ĹĽe firma traci czÄ™Ĺ›Ä‡ szans sprzedaĹĽowych:
          </p>
          <ul className="space-y-3 mb-8 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Potencjalni klienci nie znajdujÄ… Twojej oferty w Google.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Konkurencja szybciej buduje zaufanie dziÄ™ki lepszej stronie.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Oferta jest nieczytelna i trudna do szybkiego zrozumienia.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Brakuje jasnej Ĺ›cieĹĽki prowadzÄ…cej do kontaktu.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Strona nie wspiera sprzedaĹĽy ani dziaĹ‚aĹ„ marketingowych.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Nasze rozwiÄ…zanie</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Projektujemy strony dopasowane do realiĂłw sprzedaĹĽy B2B:
          </p>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Projekt dopasowany do branĹĽy</h3>
              <p className="text-sm text-[#6B7280]">KaĹĽda strona powstaje z myĹ›lÄ… o specyfice oferty, procesie zakupowym i odbiorcy koĹ„cowym.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">SEO od podstaw</h3>
              <p className="text-sm text-[#6B7280]">Dbamy o strukturÄ™ nagĹ‚ĂłwkĂłw, treĹ›ci, meta tagi i techniczne fundamenty widocznoĹ›ci.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">ResponsywnoĹ›Ä‡</h3>
              <p className="text-sm text-[#6B7280]">Strona dziaĹ‚a czytelnie i szybko na telefonach, tabletach i komputerach.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Integracje i analityka</h3>
              <p className="text-sm text-[#6B7280]">ĹÄ…czymy stronÄ™ z CRM, analitykÄ… i formularzami tak, aby nie gubiÄ‡ ĹĽadnego zapytania.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Proces wspĂłĹ‚pracy</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">BezpĹ‚atna konsultacja</h3>
                <p className="text-sm text-[#6B7280]">Poznajemy TwojÄ… firmÄ™, ofertÄ™, konkurencjÄ™ i cele biznesowe.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Analiza i strategia</h3>
                <p className="text-sm text-[#6B7280]">UkĹ‚adamy strukturÄ™ strony, priorytety komunikacyjne i zaĹ‚oĹĽenia SEO.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Projekt i wdroĹĽenie</h3>
                <p className="text-sm text-[#6B7280]">Tworzymy projekt, wdraĹĽamy stronÄ™ i integrujemy potrzebne narzÄ™dzia.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Testy i publikacja</h3>
                <p className="text-sm text-[#6B7280]">Sprawdzamy dziaĹ‚anie strony na rĂłĹĽnych urzÄ…dzeniach i publikujemy gotowÄ… wersjÄ™.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Monitoring i rozwĂłj</h3>
                <p className="text-sm text-[#6B7280]">Analizujemy wyniki i rozwijamy stronÄ™ na podstawie danych.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dla kogo tworzymy strony internetowe</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Pracujemy przede wszystkim z firmami B2B z rĂłĹĽnych branĹĽ:
          </p>
          <ul className="space-y-2 text-[#6B7280] columns-2">
            <li>â€˘ Producenci i dostawcy materiaĹ‚Ăłw</li>
            <li>â€˘ Firmy technologiczne</li>
            <li>â€˘ Doradztwo i usĹ‚ugi specjalistyczne</li>
            <li>â€˘ Agencje kreatywne i marketingowe</li>
            <li>â€˘ Firmy transportowe i logistyczne</li>
            <li>â€˘ Dostawcy usĹ‚ug dla biznesu</li>
            <li>â€˘ Firmy produkcyjne</li>
            <li>â€˘ Biura projektowe i architektoniczne</li>
          </ul>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

