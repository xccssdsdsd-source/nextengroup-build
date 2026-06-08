import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'SEO i GEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google i AI',
  description: 'Pozycjonowanie firm B2B w Google i wyszukiwarkach AI. Strategie SEO, GEO (Generative Engine Optimization), audyt SEO i link building dla firm w caĹ‚ej Polsce. Getbuild â€” wdroĹĽenia SEO/GEO dla polskich firm B2B.',
  keywords: ['SEO dla firm', 'GEO', 'Generative Engine Optimization', 'pozycjonowanie firm B2B', 'audyt SEO', 'agencja SEO', 'SEO dla firm B2B', 'link building', 'wdroĹĽenia SEO', 'strategie SEO', 'optymalizacja AI', 'widocznoĹ›Ä‡ w ChatGPT', 'widocznoĹ›Ä‡ w Gemini'],
  alternates: {
    canonical: 'https://getbuild.pl/seo-dla-firm',
  },
  openGraph: {
    title: 'SEO i GEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google i AI',
    description: 'Pozycjonowanie firm B2B w Google i wyszukiwarkach AI. Strategie SEO, GEO (Generative Engine Optimization), audyt SEO i link building dla firm w caĹ‚ej Polsce.',
    url: 'https://getbuild.pl/seo-dla-firm',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: 'https://getbuild.pl/getbuild-logo-og.png',
        width: 1200,
        height: 630,
        alt: 'SEO dla firm B2B w Polsce | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO i GEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google i AI',
    description: 'Pozycjonowanie firm B2B w Google i wyszukiwarkach AI. Strategie SEO i GEO (Generative Engine Optimization).',
    images: ['https://getbuild.pl/getbuild-logo-og.png'],
  },
}

export default function SEODlaFirm() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO i GEO dla firm B2B',
    description: 'Strategie SEO i GEO (Generative Engine Optimization) dla firm B2B w Polsce. Pozycjonowanie w Google i wyszukiwarkach generatywnych AI takich jak ChatGPT, Gemini i Perplexity.',
    serviceType: 'SEO, GEO i pozycjonowanie AI',
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
    knowsAbout: [
      'Search Engine Optimization',
      'Generative Engine Optimization',
      'GEO',
      'AI search optimization',
      'pozycjonowanie w ChatGPT',
      'widocznoĹ›Ä‡ w wyszukiwarkach AI',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Czym jest GEO (Generative Engine Optimization)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GEO (Generative Engine Optimization) to optymalizacja strony pod kÄ…tem wyszukiwarek generatywnych AI, takich jak ChatGPT, Gemini czy Perplexity. DziÄ™ki GEO Twoja firma pojawia siÄ™ w odpowiedziach generowanych przez AI, gdy potencjalni klienci zadajÄ… pytania dotyczÄ…ce Twoich usĹ‚ug lub branĹĽy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Czym rĂłĹĽni siÄ™ SEO od GEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SEO (Search Engine Optimization) optymalizuje stronÄ™ pod kÄ…tem tradycyjnych wyszukiwarek, takich jak Google. GEO (Generative Engine Optimization) to optymalizacja pod kÄ…tem wyszukiwarek generatywnych AI, ktĂłre zamiast listy linkĂłw generujÄ… gotowe odpowiedzi. Nowoczesna strategia widocznoĹ›ci online powinna obejmowaÄ‡ oba podejĹ›cia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Jak Getbuild optymalizuje strony pod GEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Getbuild wdraĹĽa GEO poprzez: bogate dane strukturalne (Schema.org), treĹ›ci formatowane jako bezpoĹ›rednie odpowiedzi na pytania, sekcje FAQ, autorytatywne treĹ›ci merytoryczne, optymalizacjÄ™ entity i sygnaĹ‚y E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).',
        },
      },
    ],
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'SEO dla firm' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            SEO i GEO dla firm B2B w Polsce
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Getbuild specjalizuje siÄ™ w SEO i GEO (Generative Engine Optimization) dla firm B2B w Polsce. Tworzymy strategie, ktĂłre przekĹ‚adajÄ… siÄ™ na wiÄ™kszÄ… widocznoĹ›Ä‡ â€” zarĂłwno w Google, jak i w wyszukiwarkach generatywnych AI takich jak ChatGPT, Gemini czy Perplexity. Efekt: wiÄ™cej wartoĹ›ciowych zapytaĹ„ ofertowych z kaĹĽdego kanaĹ‚u.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Problem firm B2B bez SEO</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Wiele firm B2B w Polsce traci szansÄ™ na pozyskiwanie klientĂłw online, bo nie inwestuje w widocznoĹ›Ä‡ organicznÄ…:
          </p>
          <ul className="space-y-3 mb-8 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Potencjalni klienci szukajÄ… usĹ‚ug w Google, ale Twoja strona nie pojawia siÄ™ wysoko w wynikach.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Konkurencja zajmuje czoĹ‚owe pozycje na waĹĽne frazy branĹĽowe.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> WiÄ™kszoĹ›Ä‡ budĹĽetu marketingowego pochĹ‚ania pĹ‚atna reklama.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Brakuje stabilnego ruchu organicznego i przewidywalnych zapytaĹ„.</li>
            <li className="flex gap-3"><span className="text-[#0055FF]">â€˘</span> Strona nie pracuje na sprzedaĹĽ po godzinach i nie wspiera regularnie dziaĹ‚u handlowego.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Nasza strategia SEO dla firm</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Nasze usĹ‚ugi SEO dla firm obejmujÄ…:
          </p>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Audyt SEO</h3>
              <p className="text-sm text-[#6B7280]">Kompleksowa analiza strony: techniczna, treĹ›ciowa, konkurencyjna i oparta na sĹ‚owach kluczowych.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Strategia SEO B2B</h3>
              <p className="text-sm text-[#6B7280]">Dostosowana strategia dla branĹĽy, konkurencji i fraz, ktĂłre realnie wspierajÄ… sprzedaĹĽ.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Optymalizacja on-page</h3>
              <p className="text-sm text-[#6B7280]">Praca nad treĹ›ciÄ…, nagĹ‚Ăłwkami, meta tagami, strukturÄ… danych i linkowaniem wewnÄ™trznym.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Link building</h3>
              <p className="text-sm text-[#6B7280]">Budowanie wartoĹ›ciowego profilu linkĂłw z wiarygodnych ĹşrĂłdeĹ‚ branĹĽowych i biznesowych.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Optymalizacja techniczna</h3>
              <p className="text-sm text-[#6B7280]">SzybkoĹ›Ä‡ Ĺ‚adowania, wersja mobilna, Core Web Vitals, indeksowanie i porzÄ…dek techniczny strony.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Monitoring i raportowanie</h3>
              <p className="text-sm text-[#6B7280]">Regularny monitoring pozycji, ruchu i konwersji wraz z miesiÄ™cznymi raportami i rekomendacjami.</p>
            </div>
            <div className="p-6 border border-[#0055FF] rounded-lg bg-blue-50/50 md:col-span-2">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-xs font-bold bg-[#0055FF] text-white px-2 py-0.5 rounded uppercase tracking-wide">Nowe</span>
                <div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2">GEO â€” Generative Engine Optimization</h3>
                  <p className="text-sm text-[#6B7280]">Optymalizacja pod kÄ…tem wyszukiwarek AI (ChatGPT, Gemini, Perplexity). Twoja firma pojawia siÄ™ w odpowiedziach generowanych przez AI, gdy klienci pytajÄ… o usĹ‚ugi z Twojej branĹĽy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">GEO â€” Generative Engine Optimization</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-8">
            Coraz wiÄ™cej osĂłb szuka firm i usĹ‚ug za pomocÄ… ChatGPT, Google Gemini czy Perplexity. Zamiast klikaÄ‡ w listÄ™ linkĂłw, zadajÄ… pytania i dostajÄ… gotowe odpowiedzi. <strong className="text-[#0A0A0A]">JeĹ›li Twoja strona nie jest zoptymalizowana pod GEO, nie pojawisz siÄ™ w tych odpowiedziach.</strong>
          </p>
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Dane strukturalne (Schema.org)</h3>
              <p className="text-sm text-[#6B7280]">WdroĹĽenie rozbudowanych znacznikĂłw JSON-LD, ktĂłre pomagajÄ… AI zrozumieÄ‡, czym jest Twoja firma, jakie usĹ‚ugi oferuje i jaki ma autorytet w branĹĽy.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">TreĹ›ci formatowane pod AI</h3>
              <p className="text-sm text-[#6B7280]">Optymalizacja treĹ›ci jako bezpoĹ›rednich odpowiedzi na pytania, sekcje FAQ, definicje i wyjaĹ›nienia â€” formaty, ktĂłre modele jÄ™zykowe chÄ™tnie cytujÄ….</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">E-E-A-T i autorytet entity</h3>
              <p className="text-sm text-[#6B7280]">Budowanie sygnaĹ‚Ăłw doĹ›wiadczenia, ekspercji, autorytetu i zaufania (E-E-A-T), ktĂłre algorytmy AI wykorzystujÄ… do oceny wiarygodnoĹ›ci ĹşrĂłdĹ‚a.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Speakable i markup kontekstowy</h3>
              <p className="text-sm text-[#6B7280]">Oznaczanie kluczowych fragmentĂłw treĹ›ci jako speakable i cytowalne â€” tak by modele generatywne wskazywaĹ‚y TwojÄ… firmÄ™ jako eksperta branĹĽowego.</p>
            </div>
          </div>
          <div className="p-6 bg-[#f0f5ff] border border-[#c7d9ff] rounded-xl">
            <p className="text-sm leading-7 text-[#374151]">
              <strong className="text-[#0A0A0A]">SEO i GEO dziaĹ‚ajÄ… razem.</strong> Dobra widocznoĹ›Ä‡ w Google wzmacnia autorytet w AI, a optymalizacja GEO przekĹ‚ada siÄ™ na lepszÄ… strukturÄ™ treĹ›ci dla Google. Robimy jedno i drugie w ramach jednej strategii.
            </p>
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
                <h3 className="font-bold text-[#0A0A0A] mb-1">Audyt SEO</h3>
                <p className="text-sm text-[#6B7280]">Zaczynamy od peĹ‚nego audytu strony i analizy konkurencji.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Strategia SEO B2B</h3>
                <p className="text-sm text-[#6B7280]">Tworzymy plan dziaĹ‚aĹ„ oparty na realnym potencjale biznesowym i intencji uĹĽytkownikĂłw.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">WdroĹĽenie</h3>
                <p className="text-sm text-[#6B7280]">Wprowadzamy zmiany techniczne, treĹ›ciowe i linkowe oraz integrujemy narzÄ™dzia analityczne.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Monitoring</h3>
                <p className="text-sm text-[#6B7280]">Ĺšledzimy wyniki i raportujemy efekty dziaĹ‚aĹ„.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Optymalizacja na bieĹĽÄ…co</h3>
                <p className="text-sm text-[#6B7280]">Na podstawie danych rozwijamy strategiÄ™ i wzmacniamy to, co dziaĹ‚a najlepiej.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dla jakich branĹĽ robimy SEO</h2>
          <p className="text-base leading-7 text-[#6B7280] mb-6">
            Mamy doĹ›wiadczenie w SEO dla firm B2B z rĂłĹĽnych sektorĂłw:
          </p>
          <ul className="space-y-2 text-[#6B7280] columns-2">
            <li>â€˘ Producenci i dostawcy materiaĹ‚Ăłw</li>
            <li>â€˘ Firmy technologiczne i software'owe</li>
            <li>â€˘ Doradztwo biznesowe i konsulting</li>
            <li>â€˘ Agencje marketingowe i kreatywne</li>
            <li>â€˘ Transport i logistyka</li>
            <li>â€˘ UsĹ‚ugi dla biznesu</li>
            <li>â€˘ Produkcja i przetwĂłrstwo</li>
            <li>â€˘ Biura i pracownie projektowe</li>
          </ul>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

