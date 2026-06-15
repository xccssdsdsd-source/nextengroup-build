'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState, type MouseEvent } from 'react'
import dynamic from 'next/dynamic'

const BackgroundParticlesServices = dynamic(() => import('./BackgroundParticlesServices'), { ssr: false })
const BackgroundNetworkAnimation = dynamic(() => import('./BackgroundNetworkAnimation'), { ssr: false })

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const premiumSpring = { type: 'spring' as const, stiffness: 120, damping: 24 }
const hoverSpring = { type: 'spring' as const, stiffness: 200, damping: 20 }

const packages = [
  {
    name: 'Landing',
    intro: 'Dla Ciebie, jeśli dopiero startujesz i chcesz szybko sprzedać jedną usługę.',
    features: [
      'Jedna strona, jeden cel',
      'Sekcja oferty, opinie i wezwanie do kontaktu',
      'Prosty formularz kontaktowy',
      'Pełna responsywność na telefonie',
      'Błyskawiczne ładowanie',
    ],
    amount: 2099,
    priceSuffix: ' zł',
    featured: false,
  },
  {
    name: 'Strona kompletna',
    intro: 'Wszystko co w Landingu, plus:',
    features: [
      'Kilka rozbudowanych sekcji i FAQ',
      'Mapa i teksty pisane pod sprzedaż',
      'Optymalizacja pod Google i wyszukiwarki AI (ChatGPT, Perplexity)',
      'Konfiguracja Profilu Firmy w Google',
      'Rezerwacja terminów przez Calendly',
      'Formularz z automatycznym potwierdzeniem na maila dla klienta',
      'Gwarancja 90/90/90/100 w Lighthouse i ładowania poniżej 3 sekund',
    ],
    amount: 2499,
    priceSuffix: ' zł',
    featured: true,
  },
  {
    name: 'Strona z panelem',
    intro: 'Wszystko co w Stronie kompletnej, plus:',
    features: [
      'Panel administracyjny po polsku',
      'Samodzielne dodawanie mieszkań i ogłoszeń',
      'Własny blog i wpisy bez pomocy programisty',
      'Edycja treści kiedy chcesz',
      'Miesięczny raport analityczny: ile osób weszło na stronę, skąd przychodzą klienci, i czego szukają',
      'Bieżące wsparcie techniczne w ramach abonamentu',
    ],
    amount: 3999,
    priceSuffix: ' zł + 99 zł/mies',
    featured: false,
  },
]

const careItems = [
  'Hosting i domena — pilnujemy, żeby strona zawsze była online.',
  'Kopie zapasowe i monitoring — śpisz spokojnie, bo nic Ci nie przepadnie.',
  'SEO — dbamy, żeby Google znajdował Cię na frazy, których szukają Twoi klienci.',
  'GEO — jesteś widoczny tam, gdzie ludzie coraz częściej pytają: ChatGPT, Gemini, Perplexity.',
  'AI SEARCH — nadążamy za nowymi wyszukiwarkami AI, które pojawiają się niemal co miesiąc.',
  'Trzymamy rękę na pulsie konkurencji i na bieżąco dostrajamy strategię.',
  'Aktualizacje, poprawki bezpieczeństwa i drobne zmiany bierzemy na siebie.',
  'Im wyższy pakiet, tym więcej zmian w cenie i tym szybciej je wdrażamy.',
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
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...premiumSpring, delay: i * 0.1 }}
      whileHover={{ y: -8, scale: 1.02, transition: hoverSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`pkg-card relative overflow-hidden rounded-2xl border p-5 sm:p-7 transition-[border-color,box-shadow] duration-300 flex flex-col ${
        pkg.featured
          ? 'border-[rgba(34,211,238,0.3)] shadow-[0_0_0_2px_rgba(34,211,238,0.1),_0_4px_24px_rgba(34,211,238,0.18),_0_0_40px_rgba(34,211,238,0.1)]'
          : isHovered
          ? 'border-[rgba(255,255,255,0.14)] shadow-[0_12px_36px_rgba(0,0,0,0.5),_0_4px_12px_rgba(0,0,0,0.4)]'
          : 'border-[rgba(255,255,255,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.45)]'
      }`}
      style={{ background: 'var(--bg-elevated)', willChange: 'transform' }}
    >
      {pkg.featured && (
        <>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#22D3EE] rounded-t-2xl" />
          <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)]" />
        </>
      )}
      {pkg.featured ? (
        <div className="mb-3 mt-1">
          <span className="inline-block px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#06141A] bg-[#22D3EE] rounded-full">
            Najpopularniejszy
          </span>
        </div>
      ) : (
        <div className="mb-3 mt-1 h-[22px]" />
      )}
      <h3 className="text-[1.05rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
        {pkg.name}
      </h3>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-[#A6B2C4]">{pkg.intro}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[#A6B2C4]">
            <span className="mt-[7px] flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5 border-t border-[rgba(255,255,255,0.08)]">
        <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-[#6B7891] mb-1">Cena</span>
        <span className="text-[1.7rem] font-extrabold tracking-tight text-[#EAF0F7]">
          <span className="price-counter" data-counter-final={pkg.amount} suppressHydrationWarning>{pkg.amount}</span>
          <span className="text-[#A6B2C4] font-bold text-[1.15rem]">{pkg.priceSuffix}</span>
        </span>
      </div>
    </motion.div>
  )
}

function ProcessFlowDiagram({ type }: { type: 'simple' | 'ai' | 'agent' }) {
  if (type === 'simple') {
    return (
      <svg viewBox="0 0 380 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-simple-title">
        <title id="diagram-simple-title">Schemat prostej automatyzacji: Proces A połączony z Procesem B</title>
        <rect x="20" y="39" width="120" height="52" rx="12" fill="rgba(255,255,255,0.06)" stroke="#EAF0F7" strokeWidth="2" />
        <text x="80" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#EAF0F7">Proces A</text>
        <line x1="152" y1="65" x2="210" y2="65" stroke="#EAF0F7" strokeWidth="2.5" />
        <path d="M210 57 L224 65 L210 73 Z" fill="#EAF0F7" />
        <rect x="234" y="39" width="120" height="52" rx="12" fill="rgba(255,255,255,0.06)" stroke="#EAF0F7" strokeWidth="2" />
        <text x="294" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#EAF0F7">Proces B</text>
      </svg>
    )
  }
  if (type === 'ai') {
    return (
      <svg viewBox="0 0 420 130" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-ai-title">
        <title id="diagram-ai-title">Schemat automatyzacji AI: Proces przechodzi przez model AI, który podejmuje decyzję i zwraca wynik</title>
        <rect x="24" y="39" width="104" height="52" rx="12" fill="rgba(255,255,255,0.06)" stroke="#EAF0F7" strokeWidth="2" />
        <text x="76" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#EAF0F7">Proces</text>
        <line x1="140" y1="65" x2="168" y2="65" stroke="#EAF0F7" strokeWidth="2.5" />
        <path d="M168 57 L182 65 L168 73 Z" fill="#EAF0F7" />
        <circle cx="212" cy="65" r="26" fill="#22D3EE" />
        <text x="212" y="71" textAnchor="middle" fontFamily="inherit" fontSize="17" fontWeight="700" fill="#06141A">A</text>
        <line x1="250" y1="65" x2="278" y2="65" stroke="#EAF0F7" strokeWidth="2.5" />
        <path d="M278 57 L292 65 L278 73 Z" fill="#EAF0F7" />
        <rect x="300" y="39" width="104" height="52" rx="12" fill="rgba(255,255,255,0.06)" stroke="#EAF0F7" strokeWidth="2" />
        <text x="352" y="71" textAnchor="middle" fontFamily="inherit" fontSize="16" fontWeight="600" fill="#EAF0F7">Wynik</text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 380 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-agent-title">
      <title id="diagram-agent-title">Schemat agenta AI: centralny agent AI samodzielnie wybiera i łączy wiele narzędzi, żeby zrealizować cel</title>
      <line x1="117" y1="94" x2="286" y2="53" stroke="#EAF0F7" strokeWidth="2" strokeDasharray="4 6" />
      <line x1="118" y1="100" x2="286" y2="100" stroke="#EAF0F7" strokeWidth="2" strokeDasharray="4 6" />
      <line x1="117" y1="106" x2="286" y2="147" stroke="#EAF0F7" strokeWidth="2" strokeDasharray="4 6" />
      <circle cx="300" cy="50" r="14" fill="rgba(255,255,255,0.08)" stroke="#EAF0F7" strokeWidth="2" />
      <circle cx="300" cy="100" r="14" fill="rgba(255,255,255,0.08)" stroke="#EAF0F7" strokeWidth="2" />
      <circle cx="300" cy="150" r="14" fill="rgba(255,255,255,0.08)" stroke="#EAF0F7" strokeWidth="2" />
      <circle cx="90" cy="100" r="28" fill="#22D3EE" />
      <text x="90" y="106" textAnchor="middle" fontFamily="inherit" fontSize="18" fontWeight="700" fill="#06141A">AI</text>
    </svg>
  )
}

export default function Services() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: '-50px' })
  const inView2 = useInView(ref2, { once: true, margin: '-50px' })
  const [allExamplesExpanded, setAllExamplesExpanded] = useState(false)
  const [seoExpanded, setSeoExpanded] = useState(false)
  const [careExpanded, setCareExpanded] = useState(false)

  const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section id="uslugi" ref={ref1} className="section-shell relative" data-no-entrance suppressHydrationWarning>
        <BackgroundParticlesServices />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="section-heading"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }} suppressHydrationWarning>
              <div className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.03em] leading-tight text-[#EAF0F7]">
                Strony internetowe
              </div>
            </h2>
            <p className="section-copy mt-6">
              Robimy strony, na których ktoś wchodzi i naprawdę się odzywa. Szybkie, dopięte na telefonie, z treścią, która sprzedaje za Ciebie. Pierwszą wizualizację pokażemy Ci w 24 godziny, a płacisz dopiero wtedy, gdy wszystko gra.
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="hidden lg:grid gap-4 lg:grid-cols-3 lg:gap-5">
              {packages.map((pkg, i) => (
                <PackageCard
                  key={pkg.name}
                  pkg={pkg}
                  inView={inView1}
                  i={i}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4 overflow-hidden lg:hidden">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -64 : 64 }}
                  animate={inView1 ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...premiumSpring, delay: i * 0.12 }}
                >
                  <PackageCard pkg={pkg} inView={inView1} i={i} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] px-6 py-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <h3 className="mb-1.5 text-[15px] font-bold tracking-[-0.02em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-syne)' }}>
              SEO i GEO wbudowane w każdą stronę
            </h3>
            <p className="text-[14px] leading-[1.7] text-[#A6B2C4]">
              Każdą stronę robimy tak, żeby Google ją rozumiał, a ChatGPT, Gemini czy Perplexity chętnie się na Ciebie powoływały. SEO nie doklejamy na końcu — siedzi w środku od pierwszego dnia.
            </p>

            <AnimatePresence initial={false}>
              {seoExpanded && (
                <motion.div
                  initial={false}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.36, ease }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      { label: 'SEO techniczne', desc: 'Szybkość, Core Web Vitals, indeksowanie, dane strukturalne Schema.org i linkowanie wewnętrzne gotowe od pierwszego dnia.' },
                      { label: 'Treść pod słowa kluczowe', desc: 'Nagłówki, meta tagi i teksty pisane pod frazy, których szukają Twoi klienci, nie pod to, co brzmi ładnie.' },
                      { label: 'GEO dla wyszukiwarek AI', desc: 'Sekcje FAQ, odpowiedzi na pytania i znaczniki, które sprawiają że Twoja firma pojawia się w odpowiedziach ChatGPT i Gemini.' },
                      { label: 'AI SEARCH — nowe wyszukiwarki', desc: 'Bieżąca optymalizacja pod nowe modele AI (Perplexity, Exa, DuckDuckGo AI i te, które się pojawią jutro). Żadna strona nie czeka na wyczerpanie się Google.' },
                      { label: 'E-E-A-T i autorytet', desc: 'Sygnały doświadczenia i wiarygodności, które algorytmy Google i modele AI traktują jako potwierdzenie, że warto Cię pokazać.' },
                      { label: 'Monitoring i raportowanie', desc: 'Masz dostęp do panelu z pozycjami, rankingami w AI, ruchem. Widzisz, co działa. Każdy miesiąc przygotowujemy raport z postępem.' },
                    ].map((item) => (
                      <div key={item.label} className="seo-card rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-4 bg-[rgba(255,255,255,0.02)]">
                        <p className="mb-1 text-[13.5px] font-semibold text-[#EAF0F7]">{item.label}</p>
                        <p className="text-[13px] leading-[1.65] text-[#A6B2C4]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setSeoExpanded((v) => !v)}
              aria-expanded={seoExpanded}
              className="mt-5 w-full rounded-xl border border-[rgba(255,255,255,0.14)] bg-transparent px-5 py-3 text-[14px] font-semibold text-[#EAF0F7] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.2)]"
            >
              {seoExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
            </button>
          </motion.div>

          <motion.div
            className="mt-5 rounded-2xl border border-[rgba(255,255,255,0.08)] px-6 py-5 bg-[rgba(255,255,255,0.02)]"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.38 }}
          >
            <p className="mb-3 text-[13.5px] font-semibold text-[#EAF0F7]">Opieka miesięczna (opcjonalna dla Landing i Strona kompletna):</p>
            <ul className="mb-4 flex flex-col gap-1.5">
              <li className="text-[14px] leading-[1.6] text-[#A6B2C4]"><span className="font-semibold text-[#EAF0F7]">Landing:</span> + 39 zł/mies.</li>
              <li className="text-[14px] leading-[1.6] text-[#A6B2C4]"><span className="font-semibold text-[#EAF0F7]">Strona kompletna:</span> + 49 zł/mies.</li>
              <li className="text-[14px] leading-[1.6] text-[#A6B2C4]"><span className="font-semibold text-[#EAF0F7]">Strona z panelem:</span> + 99 zł/mies. (obowiązkowa)</li>
            </ul>
            <p className="text-[13px] leading-[1.6] text-[#A6B2C4]">
              <span className="font-semibold text-[#EAF0F7]">To zawiera:</span> hosting i domenę, SEO, GEO, AI SEARCH, kopie zapasowe, aktualizacje i bieżące zmiany.
            </p>
          </motion.div>

          <motion.div
            className="mt-5 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] px-6 py-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.42 }}
          >
            <button
              className="mb-0 lg:mb-4 flex w-full items-center justify-between text-left text-[15px] font-bold tracking-[-0.02em] text-[#EAF0F7] lg:pointer-events-none"
              style={{ fontFamily: 'var(--font-syne)' }}
              onClick={() => setCareExpanded((v) => !v)}
              aria-expanded={careExpanded}
            >
              Co obejmuje opieka?
              <span className="block lg:hidden ml-2 text-[#22D3EE] text-[18px] leading-none" aria-hidden="true">
                {careExpanded ? '−' : '+'}
              </span>
            </button>

            {/* Desktop: always visible */}
            <ul className="hidden lg:flex flex-col gap-2.5 mt-4">
              {careItems.map((item, i) => (
                <li key={i} className="care-item flex items-start gap-3 rounded-xl px-3 py-2.5 text-[14px] leading-[1.65] text-[#A6B2C4]">
                  <span className="care-bullet mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#22D3EE]" style={{ background: 'rgba(34,211,238,0.15)' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Mobile: collapsible */}
            <AnimatePresence initial={false}>
              {careExpanded && (
                <motion.div
                  className="block lg:hidden overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease }}
                >
                  <ul className="flex flex-col gap-2.5 mt-4">
                    {careItems.map((item, i) => (
                      <li key={i} className="care-item flex items-start gap-3 rounded-xl px-3 py-2.5 text-[14px] leading-[1.65] text-[#A6B2C4]">
                        <span className="care-bullet mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#22D3EE]" style={{ background: 'rgba(34,211,238,0.15)' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section
        id="automatyzacje"
        ref={ref2}
        className="section-shell relative overflow-hidden"
        data-no-entrance
        suppressHydrationWarning
      >
        <div className="absolute inset-0 z-0 overflow-hidden rounded-none">
          <BackgroundNetworkAnimation />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            className="section-heading"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-kicker" suppressHydrationWarning>Automatyzacje i agenci AI</span>
            <h2 className="section-title" suppressHydrationWarning>Przestań robić to, co AI może zrobić za Ciebie</h2>
            <p className="section-copy">
              Trzy różne rzeczy, które wszyscy wrzucają do jednego worka. Tłumaczymy raz, po ludzku.
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="hidden lg:grid gap-4 lg:grid-cols-3 lg:gap-6 auto-rows-fr">
              {aiTypes.map((ai, i) => <AiCard key={ai.name} ai={ai} inView={inView2} i={i} allExpanded={allExamplesExpanded} onToggleAll={() => setAllExamplesExpanded(!allExamplesExpanded)} />)}
            </div>

            <div className="flex flex-col gap-4 overflow-hidden lg:hidden">
              {aiTypes.map((ai, i) => (
                <motion.div
                  key={ai.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -64 : 64 }}
                  animate={inView2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...premiumSpring, delay: i * 0.12 }}
                >
                  <AiCard ai={ai} inView={inView2} i={i} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-8 rounded-2xl border border-[rgba(255,255,255,0.08)] px-6 py-5 bg-[rgba(255,255,255,0.02)]"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            <p className="text-[14px] leading-[1.7] text-[#A6B2C4]">
              <span className="font-semibold text-[#EAF0F7]">Wycena</span> dopasowana do Twoich potrzeb po krótkim spotkaniu, 15 minut. Rozpoznajemy na nim Twoje największe wąskie gardła i problemy, które realnie da się zautomatyzować albo poprawić. W najgorszym razie wychodzisz ze spotkania wiedząc dokładnie, co i jak usprawnić u siebie. Czyli i tak wygrywasz.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.42 }}
          >
            <a href="#kontakt" onClick={handleContactClick} className="btn btn-primary">
              Umów spotkanie
            </a>
          </motion.div>
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
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...premiumSpring, delay: i * 0.1 }}
      whileHover={{ y: -8, scale: 1.02, transition: hoverSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`ai-card rounded-2xl border p-7 flex flex-col h-full ${
        isHovered
          ? 'border-[rgba(255,255,255,0.14)]'
          : 'border-[rgba(255,255,255,0.08)]'
      }`}
      style={{ background: 'var(--bg-elevated)', willChange: 'transform' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="ai-tag inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#06141A]" style={{ background: '#22D3EE', borderRadius: '4px' }}>
          {ai.tag}
        </span>
      </div>

      <h3 className="text-[1.2rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-tight mb-5" style={{ fontFamily: 'var(--font-syne)' }}>
        {ai.name}
      </h3>

      <div className="mb-7 p-6 rounded-xl border border-[rgba(34,211,238,0.2)]" style={{ background: 'rgba(34,211,238,0.08)' }}>
        <ProcessFlowDiagram type={getProcessType()} />
      </div>

      <p className="text-[14px] leading-[1.72] text-[#A6B2C4] mb-5">{ai.desc}</p>

      <div className="space-y-2.5 mb-6">
        {ai.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <span className="text-[#22D3EE] mt-1 flex-shrink-0 text-sm">●</span>
            <span className="text-[13.5px] leading-[1.6] text-[#A6B2C4]">{bullet}</span>
          </div>
        ))}
      </div>

      <div className="mb-5 rounded-xl px-4 py-3.5" style={{ background: 'rgba(34,211,238,0.08)' }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5EEAFF]">Przykład</p>
        <p className="mt-1.5 text-[13.5px] leading-[1.68] text-[#A6B2C4]">{ai.examples[0]}</p>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden mb-4"
          >
            <div className="space-y-3">
              {ai.examples.slice(1).map((example, idx) => (
                <div key={idx} className="rounded-xl px-4 py-3.5" style={{ background: 'rgba(34,211,238,0.08)' }}>
                  <p className="text-[13.5px] leading-[1.68] text-[#A6B2C4]">{example}</p>
                </div>
              ))}
            </div>
          </motion.div>
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
        className="mt-auto px-0 py-2.5 text-[13.5px] font-semibold text-[#A6B2C4] text-left transition-all hover:text-[#5EEAFF] hover:translate-x-0.5"
      >
        {isExpanded ? 'Ukryj przykłady' : 'Pokaż więcej przykładów'}
      </button>
    </motion.div>
  )
}
