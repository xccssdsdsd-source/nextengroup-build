'use client'

import { AnimatePresence, m, useInView } from 'framer-motion'
import { useRef, useState, type MouseEvent } from 'react'
import BackgroundParticlesServices from './BackgroundParticlesServices'
import BackgroundNetworkAnimation from './BackgroundNetworkAnimation'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const packages = [
  {
    name: 'Landing',
    forWho: 'Nowa firma albo jedna usługa, która ma szybko zacząć łapać kontakty.',
    whatYouGet: 'Jedna strona nastawiona na jeden cel. Oferta, dowód, formularz kontaktowy, błyskawiczne ładowanie i pełne dopięcie na telefonie.',
    price: '1499 zł',
    sub: null as string | null,
  },
  {
    name: 'Strona kompletna',
    forWho: 'Firma, która chce wyglądać poważnie od pierwszej sekundy i mieć pełną stronę z ofertą.',
    whatYouGet: 'Wszystko z landingu plus rozbudowana struktura: kilka sekcji, FAQ, formularz, mapa i treść pisana pod sprzedaż.',
    price: '1999 zł',
    sub: 'Możliwość rozłożenia na raty miesięczne.' as string | null,
  },
  {
    name: 'Strona z panelem',
    forWho: 'Firma, która regularnie dodaje realizacje albo prowadzi bloga i chce robić to sama, bez programisty.',
    whatYouGet: 'Stronę plus panel administracyjny po polsku, prosty w obsłudze. Sam dodajesz realizacje, wpisy na bloga i zmieniasz treści.',
    price: '3999 zł + 99 zł/mies',
    sub: null as string | null,
  },
]

const careItems = [
  'Hosting i domena, żeby strona zawsze działała.',
  'Kopie zapasowe i monitoring, żebyś nigdy nie stracił danych.',
  'SEO — optymalizacja w Google, pozycjonowanie pod słowa kluczowe, analizy rankingów.',
  'GEO — widoczność w wyszukiwarkach AI (ChatGPT, Gemini, Perplexity), gdzie klienci coraz częściej szukają odpowiedzi.',
  'AI SEARCH — optymalizacja pod nowe wyszukiwarki AI, które pojawiają się niemal co miesiąc.',
  'Analiza konkurencji i dostosowanie strategii na bieżąco.',
  'Aktualizacje treści, łatki bezpieczeństwa i drobne zmiany — wszystko obsługujemy.',
  'Wyższy pakiet to szerszy zakres, więcej zmian i szybsze wdrażanie.',
]

type Package = typeof packages[number]

const aiTypes = [
  {
    name: 'Automatyzacja',
    tag: 'Reguły',
    desc: 'Sztywne reguły: jeśli stanie się to, zrób tamto.',
    bullets: ['Działa zero jeden', 'Bez kontekstu', 'Najtańsza w utrzymaniu'],
    examples: [
      'Klient wypełnia formularz, system sam wysyła maila powitalnego i dopisuje go do arkusza.',
      'Nowe zgłoszenie z formularza ląduje od razu w arkuszu i na Twoim mailu, bez przepisywania ręcznie.',
      'Po zakończonej usłudze klient dostaje automatycznie SMS z prośbą o opinię w Google.',
      'Faktura tworzy się sama po opłaceniu zamówienia i trafia do klienta na maila.',
      'Przypomnienie o wizycie wychodzi do klienta dzień wcześniej, sam nie musisz dzwonić.',
      'Każdy nowy lead z reklamy od razu trafia na Twojego WhatsAppa z danymi kontaktowymi.',
    ],
  },
  {
    name: 'Automatyzacja AI',
    tag: 'AI w środku',
    desc: 'Automatyzacja z modelem AI, który rozumie treść i sam decyduje.',
    bullets: ['Rozumie treść', 'Decyduje sama', 'Obsługuje warianty'],
    examples: [
      'Klient pisze wiadomość, AI rozpoznaje czego dotyczy, pisze dopasowaną odpowiedź i kieruje sprawę do właściwej osoby.',
      'AI czyta przychodzące maile i sam segreguje je na pilne, oferty i spam.',
      'Opinie klientów z Google są streszczane automatycznie, dostajesz raport co chwalą najczęściej i na co narzekają.',
      'AI przygotowuje opis nieruchomości na podstawie zdjęć i kilku danych, gotowy do publikacji.',
      'Z nagrania rozmowy z klientem AI wyciąga ustalenia i tworzy notatkę ze spotkania.',
    ],
  },
  {
    name: 'Agent AI',
    tag: 'Pełna autonomia',
    desc: 'Samodzielny pracownik cyfrowy, który dostaje cel i sam dobiera kroki.',
    bullets: ['Wykonuje cel', 'Używa narzędzi', 'Pracuje 24/7'],
    examples: [
      'Agent odbiera zapytanie, sam dopytuje o szczegóły, sprawdza wolny termin w kalendarzu, umawia spotkanie i wysyła potwierdzenie. Całą dobę, bez Ciebie.',
      'Klient pisze w nocy, agent odpowiada, kwalifikuje go i rezerwuje termin, rano masz gotowe spotkanie w kalendarzu.',
      'Agent pilnuje skrzynki, sam odpowiada na typowe pytania, a trudniejsze przekazuje Tobie z gotowym podsumowaniem.',
      'Agent dzwoni do klienta z przypomnieniem o płatności i odnotowuje wynik rozmowy.',
      'Po zapytaniu o wycenę agent zbiera dane, przygotowuje wstępną ofertę i wysyła ją klientowi.',
    ],
  },
]

type AiType = typeof aiTypes[number]

type AiCardProps = { ai: AiType; inView: boolean; i: number; allExpanded?: boolean; onToggleAll?: () => void }

function PackageCard({ pkg, inView, i }: { pkg: Package; inView: boolean; i: number }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
      <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.1, ease }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border p-5 sm:p-7 transition-[border-color,box-shadow] duration-300 ${
        isHovered
          ? 'border-[rgba(37,99,235,0.35)] shadow-[0_20px_40px_rgba(0,0,0,0.3),_0_0_0_1px_rgba(37,99,235,0.25)]'
          : 'border-[rgba(0,0,0,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
      }`}
      style={{
        background: '#FFFFFF',
      }}
    >
      <h3 className="text-[1.05rem] font-bold tracking-[-0.03em] text-[#111827] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
        {pkg.name}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.6] text-[#6B7280]">{pkg.forWho}</p>
      <p className="mt-3 text-[14px] leading-[1.72] text-[#6B7280]">{pkg.whatYouGet}</p>
      {pkg.sub && <p className="mt-2 text-[13px] leading-[1.6] text-[#6B7280]">{pkg.sub}</p>}
      <div className="mt-5 border-t border-[rgba(255,255,255,0.06)] pt-4">
        <span className="text-[1.1rem] font-bold text-[#111827]">{pkg.price}</span>
      </div>
    </m.div>
  )
}

function ProcessFlowDiagram({ type }: { type: 'simple' | 'ai' | 'agent' }) {
  if (type === 'simple') {
    return (
      <svg viewBox="0 0 380 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-simple-title">
        <title id="diagram-simple-title">Schemat prostej automatyzacji: Proces A połączony z Procesem B</title>
        <rect x="20" y="39" width="120" height="52" rx="12" fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="2" />
        <text x="80" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#93C5FD">Proces A</text>
        <line x1="152" y1="65" x2="210" y2="65" stroke="#2563EB" strokeWidth="2.5" />
        <path d="M210 57 L224 65 L210 73 Z" fill="#2563EB" />
        <rect x="234" y="39" width="120" height="52" rx="12" fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="2" />
        <text x="294" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#93C5FD">Proces B</text>
      </svg>
    )
  }
  if (type === 'ai') {
    return (
      <svg viewBox="0 0 420 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-ai-title">
        <title id="diagram-ai-title">Schemat automatyzacji AI: Proces przechodzi przez model AI, który podejmuje decyzję i zwraca wynik</title>
        <rect x="24" y="39" width="104" height="52" rx="12" fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="2" />
        <text x="76" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#93C5FD">Proces</text>
        <line x1="140" y1="65" x2="168" y2="65" stroke="#2563EB" strokeWidth="2.5" />
        <path d="M168 57 L182 65 L168 73 Z" fill="#2563EB" />
        <circle cx="212" cy="65" r="26" fill="#2563EB" />
        <text x="212" y="71" textAnchor="middle" fontFamily="inherit" fontSize="17" fontWeight="700" fill="#ffffff">A</text>
        <line x1="250" y1="65" x2="278" y2="65" stroke="#2563EB" strokeWidth="2.5" />
        <path d="M278 57 L292 65 L278 73 Z" fill="#2563EB" />
        <rect x="300" y="39" width="104" height="52" rx="12" fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="2" />
        <text x="352" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#93C5FD">Wynik</text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 380 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-agent-title">
      <title id="diagram-agent-title">Schemat agenta AI: centralny agent AI samodzielnie wybiera i łączy wiele narzędzi, żeby zrealizować cel</title>
      <line x1="117" y1="94" x2="286" y2="53" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 6" />
      <line x1="118" y1="100" x2="286" y2="100" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 6" />
      <line x1="117" y1="106" x2="286" y2="147" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 6" />
      <circle cx="300" cy="50" r="14" fill="rgba(37,99,235,0.2)" stroke="#2563EB" strokeWidth="2" />
      <circle cx="300" cy="100" r="14" fill="rgba(37,99,235,0.2)" stroke="#2563EB" strokeWidth="2" />
      <circle cx="300" cy="150" r="14" fill="rgba(37,99,235,0.2)" stroke="#2563EB" strokeWidth="2" />
      <circle cx="90" cy="100" r="28" fill="#2563EB" />
      <text x="90" y="106" textAnchor="middle" fontFamily="inherit" fontSize="18" fontWeight="700" fill="#ffffff">AI</text>
    </svg>
  )
}

export default function Services() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: '-120px' })
  const inView2 = useInView(ref2, { once: true, margin: '-120px' })
  const [expanded1, setExpanded1] = useState(false)
  const [expanded2, setExpanded2] = useState(false)
  const [allExamplesExpanded, setAllExamplesExpanded] = useState(false)

  const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section id="uslugi" ref={ref1} className="section-shell relative">
        <BackgroundParticlesServices />
        <div className="relative mx-auto max-w-7xl">
          <m.div
            className="section-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.78, ease }}
          >
            <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>
              <div className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.03em] leading-tight text-[#111827]">
                Strony internetowe
              </div>
            </h2>
            <p className="section-copy mt-6">
              Budujemy strony, które zamieniają wejście w kontakt. Szybkie, dopracowane na telefonie, z treścią, która sprzedaje. Pierwszą wizualizację widzisz w 24 godziny, a płacisz dopiero, gdy wszystko działa.
            </p>
          </m.div>

          <div className="mt-16">
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5">
              {packages.map((pkg, i) => <PackageCard key={pkg.name} pkg={pkg} inView={inView1} i={i} />)}
            </div>

            <div className="flex flex-col gap-4 lg:hidden">
              <PackageCard pkg={packages[0]} inView={inView1} i={0} />
              <AnimatePresence initial={false}>
                {expanded1 && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.36, ease }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-4">
                      {packages.slice(1).map((pkg, i) => <PackageCard key={pkg.name} pkg={pkg} inView={inView1} i={i + 1} />)}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
              {!expanded1 && (
                <button
                  onClick={() => setExpanded1(true)}
                  className="w-full rounded-xl border border-[rgba(0,0,0,0.1)] bg-transparent px-5 py-3 text-[14px] font-semibold text-[#2563EB] transition-colors hover:bg-[rgba(37,99,235,0.05)] hover:border-[rgba(37,99,235,0.4)]"
                >
                  Zobacz więcej
                </button>
              )}
            </div>
          </div>

          <m.div
            className="mt-8 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-6 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <h3 className="mb-1.5 text-[15px] font-bold tracking-[-0.02em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>
              SEO i GEO wbudowane w każdą stronę
            </h3>
            <p className="mb-5 text-[14px] leading-[1.7] text-[#6B7280]">
              Każdą stronę budujemy tak, żeby Google ją rozumiał i żeby modele AI jak ChatGPT, Gemini czy Perplexity mogły ją cytować jako wiarygodne źródło. Nie dokładamy SEO na końcu, budujemy je od środka.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'SEO techniczne', desc: 'Szybkość, Core Web Vitals, indeksowanie, dane strukturalne Schema.org i linkowanie wewnętrzne gotowe od pierwszego dnia.' },
                { label: 'Treść pod słowa kluczowe', desc: 'Nagłówki, meta tagi i teksty pisane pod frazy, których szukają Twoi klienci, nie pod to, co brzmi ładnie.' },
                { label: 'GEO dla wyszukiwarek AI', desc: 'Sekcje FAQ, odpowiedzi na pytania i znaczniki, które sprawiają że Twoja firma pojawia się w odpowiedziach ChatGPT i Gemini.' },
                { label: 'AI SEARCH — nowe wyszukiwarki', desc: 'Bieżąca optymalizacja pod nowe modele AI (Perplexity, Exa, DuckDuckGo AI i te, które się pojawią jutro). Żadna strona nie czeka na wyczerpanie się Google.' },
                { label: 'E-E-A-T i autorytet', desc: 'Sygnały doświadczenia i wiarygodności, które algorytmy Google i modele AI traktują jako potwierdzenie, że warto Cię pokazać.' },
                { label: 'Monitoring i raportowanie', desc: 'Masz dostęp do panelu z pozycjami, rankingami w AI, ruchem. Widzisz, co działa. Każdy miesiąc przygotowujemy raport z postępem.' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-[rgba(255,255,255,0.06)] px-4 py-4 bg-[rgba(255,255,255,0.02)]">
                  <p className="mb-1 text-[13.5px] font-semibold text-[#111827]">{item.label}</p>
                  <p className="text-[13px] leading-[1.65] text-[#6B7280]">{item.desc}</p>
                </div>
              ))}
            </div>
          </m.div>

          <m.div
            className="mt-5 rounded-2xl border border-[rgba(0,0,0,0.08)] px-6 py-5 bg-[rgba(255,255,255,0.02)]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.38 }}
          >
            <p className="mb-3 text-[13.5px] font-semibold text-[#111827]">Opieka miesięczna (opcjonalna dla Landing i Strona kompletna):</p>
            <ul className="mb-4 flex flex-col gap-1.5">
              <li className="text-[14px] leading-[1.6] text-[#6B7280]"><span className="font-semibold text-[#111827]">Landing:</span> + 39 zł/mies.</li>
              <li className="text-[14px] leading-[1.6] text-[#6B7280]"><span className="font-semibold text-[#111827]">Strona kompletna:</span> + 49 zł/mies.</li>
              <li className="text-[14px] leading-[1.6] text-[#6B7280]"><span className="font-semibold text-[#111827]">Strona z panelem:</span> + 99 zł/mies. (obowiązkowa)</li>
            </ul>
            <p className="text-[13px] leading-[1.6] text-[#6B7280]">
              <span className="font-semibold text-[#111827]">To zawiera:</span> hosting i domenę, SEO, GEO, AI SEARCH, kopie zapasowe, aktualizacje i bieżące zmiany.
            </p>
          </m.div>

          <m.div
            className="mt-5 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-6 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.42 }}
          >
            <h3 className="mb-4 text-[15px] font-bold tracking-[-0.02em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>
              Co obejmuje opieka
            </h3>
            <ul className="flex flex-col gap-2.5">
              {careItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.65] text-[#6B7280]">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#93C5FD]" style={{ background: 'rgba(37,99,235,0.15)' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </section>

      <section
        id="automatyzacje"
        ref={ref2}
        className="section-shell relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden rounded-none">
          <BackgroundNetworkAnimation />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <m.div
            className="section-heading"
            initial={{ opacity: 0, y: 28 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.78, ease }}
          >
            <span className="section-kicker">Automatyzacje i agenci AI</span>
            <h2 className="section-title">Przestań robić to, co AI może zrobić za Ciebie</h2>
            <p className="section-copy">
              Trzy różne rzeczy, które wszyscy wrzucają do jednego worka. Tłumaczymy raz, po ludzku.
            </p>
          </m.div>

          <div className="mt-16">
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 auto-rows-fr">
              {aiTypes.map((ai, i) => <AiCard key={ai.name} ai={ai} inView={inView2} i={i} allExpanded={allExamplesExpanded} onToggleAll={() => setAllExamplesExpanded(!allExamplesExpanded)} />)}
            </div>

            <div className="flex flex-col gap-4 lg:hidden">
              <AiCard ai={aiTypes[0]} inView={inView2} i={0} />
              <AnimatePresence initial={false}>
                {expanded2 && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.36, ease }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-4">
                      {aiTypes.slice(1).map((ai, i) => <AiCard key={ai.name} ai={ai} inView={inView2} i={i + 1} />)}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
              {!expanded2 && (
                <button
                  onClick={() => setExpanded2(true)}
                  className="w-full rounded-xl border border-[rgba(0,0,0,0.1)] bg-transparent px-5 py-3 text-[14px] font-semibold text-[#2563EB] transition-colors hover:bg-[rgba(37,99,235,0.05)] hover:border-[rgba(37,99,235,0.4)]"
                >
                  Zobacz więcej
                </button>
              )}
            </div>
          </div>

          <m.div
            className="mt-8 rounded-2xl border border-[rgba(0,0,0,0.08)] px-6 py-5 bg-[rgba(255,255,255,0.02)]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            <p className="text-[14px] leading-[1.7] text-[#6B7280]">
              <span className="font-semibold text-[#111827]">Wycena</span> dopasowana do Twoich potrzeb po krótkim spotkaniu, 15 minut. Rozpoznajemy na nim Twoje największe wąskie gardła i problemy, które realnie da się zautomatyzować albo poprawić. W najgorszym razie wychodzisz ze spotkania wiedząc dokładnie, co i jak usprawnić u siebie. Czyli i tak wygrywasz.
            </p>
          </m.div>

          <m.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.42 }}
          >
            <a href="#kontakt" onClick={handleContactClick} className="btn btn-primary">
              Umów spotkanie
            </a>
          </m.div>
        </div>
      </section>
    </>
  )
}

function AiCard({ ai, inView, i, allExpanded = false, onToggleAll }: AiCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [expandedExamples, setExpandedExamples] = useState(false)
  const isExpanded = allExpanded || expandedExamples

  const getProcessType = () => {
    if (ai.name === 'Automatyzacja') return 'simple'
    if (ai.name === 'Automatyzacja AI') return 'ai'
    return 'agent'
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.1, ease }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border p-7 transition-[border-color,box-shadow] duration-300 flex flex-col h-full ${
        isHovered
          ? 'border-[rgba(37,99,235,0.35)] shadow-[0_20px_40px_rgba(0,0,0,0.3),_0_0_0_1px_rgba(37,99,235,0.25)]'
          : 'border-[rgba(0,0,0,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
      }`}
      style={{
        background: '#FFFFFF',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white" style={{ background: '#2563EB', borderRadius: '4px' }}>
          {ai.tag}
        </span>
      </div>

      <h3 className="text-[1.2rem] font-bold tracking-[-0.03em] text-[#111827] leading-tight mb-5" style={{ fontFamily: 'var(--font-syne)' }}>
        {ai.name}
      </h3>

      <div className="mb-7 p-6 rounded-xl border border-[rgba(37,99,235,0.2)]" style={{ background: 'rgba(37,99,235,0.08)' }}>
        <ProcessFlowDiagram type={getProcessType()} />
      </div>

      <p className="text-[14px] leading-[1.72] text-[#6B7280] mb-5">{ai.desc}</p>

      <div className="space-y-2.5 mb-6">
        {ai.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <span className="text-[#2563EB] mt-1 flex-shrink-0 text-sm">●</span>
            <span className="text-[13.5px] leading-[1.6] text-[#6B7280]">{bullet}</span>
          </div>
        ))}
      </div>

      <div className="mb-5 rounded-xl px-4 py-3.5" style={{ background: 'rgba(37,99,235,0.08)' }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#93C5FD]">Przykład</p>
        <p className="mt-1.5 text-[13.5px] leading-[1.68] text-[#6B7280]">{ai.examples[0]}</p>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden mb-4"
          >
            <div className="space-y-3">
              {ai.examples.slice(1).map((example, idx) => (
                <div key={idx} className="rounded-xl px-4 py-3.5" style={{ background: 'rgba(37,99,235,0.08)' }}>
                  <p className="text-[13.5px] leading-[1.68] text-[#6B7280]">{example}</p>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (allExpanded) {
            onToggleAll?.()
          } else {
            setExpandedExamples(!expandedExamples)
          }
        }}
        className="mt-auto px-0 py-2.5 text-[13.5px] font-semibold text-[#93C5FD] text-left transition-all hover:text-[#2563EB] hover:translate-x-0.5"
      >
        {isExpanded ? 'Ukryj przykłady' : 'Pokaż więcej przykładów'}
      </button>
    </m.div>
  )
}
