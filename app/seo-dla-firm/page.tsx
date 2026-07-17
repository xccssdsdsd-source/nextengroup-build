import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  metadataBase: new URL('https://getbuild.pl'),
  title: 'SEO i GEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google i AI',
  description: 'Pozycjonowanie firm B2B w Google i wyszukiwarkach AI. Strategie SEO, GEO (Generative Engine Optimization), audyt SEO i link building dla firm w całej Polsce. Getbuild — wdrożenia SEO/GEO dla polskich firm B2B.',
  keywords: ['SEO dla firm', 'GEO', 'Generative Engine Optimization', 'pozycjonowanie firm B2B', 'audyt SEO', 'agencja SEO', 'SEO dla firm B2B', 'link building', 'wdrożenia SEO', 'strategie SEO', 'optymalizacja AI', 'widoczność w ChatGPT', 'widoczność w Gemini'],
  alternates: {
    canonical: 'https://getbuild.pl/seo-dla-firm',
  },
  openGraph: {
    title: 'SEO i GEO dla firm B2B w Polsce | Getbuild - Pozycjonowanie w Google i AI',
    description: 'Pozycjonowanie firm B2B w Google i wyszukiwarkach AI. Strategie SEO, GEO (Generative Engine Optimization), audyt SEO i link building dla firm w całej Polsce.',
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
      'widoczność w wyszukiwarkach AI',
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
          text: 'GEO (Generative Engine Optimization) to praktyka poprawiania czytelności, wiarygodności i użyteczności treści dla wyszukiwarek generatywnych AI, takich jak ChatGPT, Gemini czy Perplexity. Nie gwarantuje publikacji w konkretnej odpowiedzi, ale zwiększa szansę, że dobrze udokumentowana firma zostanie poprawnie zrozumiana i zacytowana.',
        },
      },
      {
        '@type': 'Question',
        name: 'Czym różni się SEO od GEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SEO (Search Engine Optimization) optymalizuje stronę pod kątem tradycyjnych wyszukiwarek, takich jak Google. GEO (Generative Engine Optimization) to optymalizacja pod kątem wyszukiwarek generatywnych AI, które zamiast listy linków generują gotowe odpowiedzi. Nowoczesna strategia widoczności online powinna obejmować oba podejścia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Jak Getbuild optymalizuje strony pod GEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Getbuild wdraża GEO poprzez: bogate dane strukturalne (Schema.org), treści formatowane jako bezpośrednie odpowiedzi na pytania, sekcje FAQ, autorytatywne treści merytoryczne, optymalizację entity i sygnały E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).',
        },
      },
      {
        '@type': 'Question',
        name: 'Czym jest link building i jak wpływa na SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Link building to proces zdobywania wartościowych wzmianek i linków z zewnętrznych stron. Linki mogą być jednym z sygnałów pomocnych w ocenie popularności i wiarygodności strony, ale Google nie używa metryki DR jako własnego czynnika rankingowego. Liczą się przede wszystkim kontekst, jakość źródła, naturalność i wartość dla czytelnika — nie sama liczba linków.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ile backlinków potrzebuje strona B2B, żeby osiągnąć wysokie pozycje?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nie ma uniwersalnej liczby. Trudność frazy, konkurencja, jakość treści, techniczna kondycja serwisu i reputacja domen zmieniają się między branżami. Zamiast obiecywać konkretną liczbę linków, oceniamy lukę względem konkurentów i budujemy naturalny profil z różnorodnych, tematycznie powiązanych źródeł.',
        },
      },
      {
        '@type': 'Question',
        name: 'Jak długo trwa budowanie widoczności SEO dla firmy B2B?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Czas zależy od stanu domeny, konkurencji, zakresu zmian i tempa publikacji. Pierwsze sygnały mogą pojawić się po kilku tygodniach, ale stabilne pozycje na konkurencyjne frazy B2B często wymagają wielu miesięcy. Ta sama zasada dotyczy widoczności w odpowiedziach generatywnych — nie ma gwarantowanego terminu ani specjalnego skrótu omijającego podstawy SEO.',
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

      <section className="relative bg-[#0A0E14] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.22), transparent 60%)' }} />
        <div className="mx-auto max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            SEO i GEO dla firm B2B w Polsce
          </h1>
          <p className="text-lg leading-[1.7] text-[#A6B2C4] mb-8" data-speakable>
            Getbuild specjalizuje się w SEO i GEO (Generative Engine Optimization) dla firm B2B w Polsce. Tworzymy strategie, które poprawiają widoczność i zrozumienie oferty — zarówno w Google, jak i w wyszukiwarkach generatywnych AI takich jak ChatGPT, Gemini czy Perplexity. Mierzymy ruch, zapytania i jakość leadów zamiast obiecywać konkretną pozycję.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#11161F] sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#EAF0F7] mb-6">Problem firm B2B bez SEO</h2>
          <p className="text-base leading-7 text-[#A6B2C4] mb-6">
            Wiele firm B2B w Polsce traci szansę na pozyskiwanie klientów online, bo nie inwestuje w widoczność organiczną:
          </p>
          <ul className="space-y-3 mb-8 text-[#A6B2C4]">
            <li className="flex gap-3"><span className="text-[#22D3EE]">•</span> Potencjalni klienci szukają usług w Google, ale Twoja strona nie pojawia się wysoko w wynikach.</li>
            <li className="flex gap-3"><span className="text-[#22D3EE]">•</span> Konkurencja zajmuje czołowe pozycje na ważne frazy branżowe.</li>
            <li className="flex gap-3"><span className="text-[#22D3EE]">•</span> Większość budżetu marketingowego pochłania płatna reklama.</li>
            <li className="flex gap-3"><span className="text-[#22D3EE]">•</span> Brakuje stabilnego ruchu organicznego i przewidywalnych zapytań.</li>
            <li className="flex gap-3"><span className="text-[#22D3EE]">•</span> Strona nie pracuje na sprzedaż po godzinach i nie wspiera regularnie działu handlowego.</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#0A0E14] sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#EAF0F7] mb-6">Nasza strategia SEO dla firm</h2>
          <p className="text-base leading-7 text-[#A6B2C4] mb-6">
            Nasze usługi SEO dla firm obejmują:
          </p>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Audyt SEO</h3>
              <p className="text-sm text-[#A6B2C4]">Kompleksowa analiza strony: techniczna, treściowa, konkurencyjna i oparta na słowach kluczowych.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Strategia SEO B2B</h3>
              <p className="text-sm text-[#A6B2C4]">Dostosowana strategia dla branży, konkurencji i fraz, które realnie wspierają sprzedaż.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Optymalizacja on-page</h3>
              <p className="text-sm text-[#A6B2C4]">Praca nad treścią, nagłówkami, meta tagami, strukturą danych i linkowaniem wewnętrznym.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Link building</h3>
              <p className="text-sm text-[#A6B2C4]">Budowanie wartościowego profilu linków z wiarygodnych źródeł branżowych i biznesowych.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Optymalizacja techniczna</h3>
              <p className="text-sm text-[#A6B2C4]">Szybkość ładowania, wersja mobilna, Core Web Vitals, indeksowanie i porządek techniczny strony.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Monitoring i raportowanie</h3>
              <p className="text-sm text-[#A6B2C4]">Regularny monitoring pozycji, ruchu i konwersji wraz z miesięcznymi raportami i rekomendacjami.</p>
            </div>
            <div className="p-6 border border-[#22D3EE] rounded-lg bg-[#1C2433] md:col-span-2">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-xs font-bold bg-[#22D3EE] text-[#06141A] px-2 py-0.5 rounded uppercase tracking-wide">Nowe</span>
                <div>
                  <h3 className="font-bold text-[#EAF0F7] mb-2">GEO — Generative Engine Optimization</h3>
                  <p className="text-sm text-[#A6B2C4]">Poprawa czytelności i wiarygodności treści dla wyszukiwarek AI (ChatGPT, Gemini, Perplexity). Nie ma gwarancji cytowania, ale rzetelne źródła i jasna struktura zwiększają szansę na poprawne zrozumienie oferty.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#0A0E14] sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#EAF0F7] mb-4">GEO — Generative Engine Optimization</h2>
          <p className="text-base leading-7 text-[#A6B2C4] mb-8">
            Coraz więcej osób szuka firm i usług za pomocą ChatGPT, Google Gemini czy Perplexity. Zamiast klikać w listę linków, zadają pytania i dostają gotowe odpowiedzi. <strong className="text-[#EAF0F7]">Nie istnieje techniczna gwarancja pojawienia się w konkretnej odpowiedzi — wygrywają jasne, pomocne i wiarygodne źródła.</strong>
          </p>
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Dane strukturalne (Schema.org)</h3>
              <p className="text-sm text-[#A6B2C4]">Wdrożenie rozbudowanych znaczników JSON-LD, które pomagają AI zrozumieć, czym jest Twoja firma, jakie usługi oferuje i jaki ma autorytet w branży.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Treści formatowane pod AI</h3>
              <p className="text-sm text-[#A6B2C4]">Optymalizacja treści jako bezpośrednich odpowiedzi na pytania, sekcje FAQ, definicje i wyjaśnienia — formaty, które modele językowe chętnie cytują.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">E-E-A-T i autorytet entity</h3>
              <p className="text-sm text-[#A6B2C4]">Budowanie sygnałów doświadczenia, ekspercji, autorytetu i zaufania (E-E-A-T), które algorytmy AI wykorzystują do oceny wiarygodności źródła.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-[#161C28]">
              <h3 className="font-bold text-[#EAF0F7] mb-2">Speakable i markup kontekstowy</h3>
              <p className="text-sm text-[#A6B2C4]">Oznaczanie kluczowych fragmentów treści jako speakable i cytowalne — tak by modele generatywne wskazywały Twoją firmę jako eksperta branżowego.</p>
            </div>
          </div>
          <div className="p-6 bg-[#161C28] border border-white/10 rounded-xl">
            <p className="text-sm leading-7 text-[#A6B2C4]">
              <strong className="text-[#EAF0F7]">SEO i GEO działają razem.</strong> Dobra widoczność w Google wzmacnia autorytet w AI, a optymalizacja GEO przekłada się na lepszą strukturę treści dla Google. Robimy jedno i drugie w ramach jednej strategii.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#11161F] sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#EAF0F7] mb-6">Proces współpracy</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#22D3EE] text-[#06141A] rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#EAF0F7] mb-1">Audyt SEO</h3>
                <p className="text-sm text-[#A6B2C4]">Zaczynamy od pełnego audytu strony i analizy konkurencji.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#22D3EE] text-[#06141A] rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#EAF0F7] mb-1">Strategia SEO B2B</h3>
                <p className="text-sm text-[#A6B2C4]">Tworzymy plan działań oparty na realnym potencjale biznesowym i intencji użytkowników.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#22D3EE] text-[#06141A] rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#EAF0F7] mb-1">Wdrożenie</h3>
                <p className="text-sm text-[#A6B2C4]">Wprowadzamy zmiany techniczne, treściowe i linkowe oraz integrujemy narzędzia analityczne.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#22D3EE] text-[#06141A] rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#EAF0F7] mb-1">Monitoring</h3>
                <p className="text-sm text-[#A6B2C4]">Śledzimy wyniki i raportujemy efekty działań.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#22D3EE] text-[#06141A] rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#EAF0F7] mb-1">Optymalizacja na bieżąco</h3>
                <p className="text-sm text-[#A6B2C4]">Na podstawie danych rozwijamy strategię i wzmacniamy to, co działa najlepiej.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#0A0E14] sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#EAF0F7] mb-6">Dla jakich branż robimy SEO</h2>
          <p className="text-base leading-7 text-[#A6B2C4] mb-6">
            Mamy doświadczenie w SEO dla firm B2B z różnych sektorów:
          </p>
          <ul className="space-y-2 text-[#A6B2C4] columns-2">
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
