'use client'

import { AnimatePresence, m, useInView } from 'framer-motion'
import { MonitorSmartphone, Sparkles } from 'lucide-react'
import { useRef, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

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
    amount: 1997,
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
    amount: 2449,
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
    amount: 3997,
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

const seoCards = [
  { label: 'SEO techniczne', desc: 'Szybkość, Core Web Vitals, indeksowanie, dane strukturalne Schema.org i linkowanie wewnętrzne gotowe od pierwszego dnia.' },
  { label: 'Treść pod słowa kluczowe', desc: 'Nagłówki, meta tagi i teksty pisane pod frazy, których szukają Twoi klienci, nie pod to, co brzmi ładnie.' },
  { label: 'GEO dla wyszukiwarek AI', desc: 'Sekcje FAQ, odpowiedzi na pytania i znaczniki, które sprawiają, że Twoja firma pojawia się w odpowiedziach ChatGPT i Gemini.' },
  { label: 'AI SEARCH — nowe wyszukiwarki', desc: 'Bieżąca optymalizacja pod nowe modele AI (Perplexity, Exa, DuckDuckGo AI i te, które się pojawią jutro). Żadna strona nie czeka na wyczerpanie się Google.' },
  { label: 'E-E-A-T i autorytet', desc: 'Sygnały doświadczenia i wiarygodności, które algorytmy Google i modele AI traktują jako potwierdzenie, że warto Cię pokazać.' },
  { label: 'Monitoring i raportowanie', desc: 'Masz dostęp do panelu z pozycjami, rankingami w AI, ruchem. Widzisz, co działa. Każdy miesiąc przygotowujemy raport z postępem.' },
]

const overview = [
  {
    no: '01',
    name: 'Strony internetowe',
    problem: 'Twoja strona nie przynosi klientów — albo nie masz jej wcale.',
    desc: 'Budujemy szybkie strony, które zamieniają wejście w telefon albo wiadomość. Widoczne w Google i w wyszukiwarkach AI, dopięte na telefonie, z treścią, która sprzedaje za Ciebie.',
    solves: [
      ['Nie widać Cię w Google', 'SEO i GEO wbudowane od pierwszego dnia'],
      ['Klienci uciekają z wolnej strony', 'Błyskawiczne ładowanie i pełna responsywność'],
      ['Strona nie oddaje jakości firmy', 'Projekt pod sprzedaż, nie pod ozdobę'],
    ],
    target: 'strony',
  },
  {
    no: '02',
    name: 'Automatyzacje i agenci AI',
    problem: 'Tracisz godziny na powtarzalne zadania i ręczne przepisywanie.',
    desc: 'Wdrażamy automatyzacje i agentów AI, którzy odpowiadają klientom, umawiają spotkania i ogarniają papierologię — całą dobę, bez Ciebie.',
    solves: [
      ['Zapytania stygną, zanim odpiszesz', 'Agent AI odpowiada od razu, 24/7'],
      ['Przepisujesz dane między narzędziami', 'Automatyzacja robi to za Ciebie'],
      ['Jesteś wąskim gardłem firmy', 'Proste zadania dzieją się bez Ciebie'],
    ],
    target: 'automatyzacje',
  },
] as const

type Package = typeof packages[number]
type Overview = typeof overview[number]

const aiTypes = [
  {
    name: 'Automatyzacja',
    tag: 'Reguły',
    desc: 'Sztywne reguły: jeśli stanie się to, zrób tamto.',
    bullets: ['Działa zero jeden', 'Bez kontekstu', 'Najtańsza w utrzymaniu'],
    examples: [
      'Klient wypełnia formularz → dostaje maila z potwierdzeniem, a Ty widzisz go od razu w arkuszu. Nic ręcznie.',
      'Po wizycie klient dostaje SMS z prośbą o opinię w Google — sam, bez Twojego kliknięcia.',
      'Nowy lead z reklamy trafia od razu na Twój WhatsApp z danymi kontaktowymi.',
    ],
  },
  {
    name: 'Automatyzacja AI',
    tag: 'AI w środku',
    desc: 'Automatyzacja z modelem AI, który rozumie treść i sam decyduje.',
    bullets: ['Rozumie treść', 'Decyduje sama', 'Obsługuje warianty'],
    examples: [
      'Klient pisze maila z pytaniem o cenę. AI czyta, rozumie o co chodzi i odpisuje dopasowaną wiadomością — zanim Ty zdążysz sprawdzić skrzynkę.',
      'Nowe opinie w Google są streszczane co tydzień automatycznie: co klienci chwalą i na co narzekają.',
    ],
  },
  {
    name: 'Agent AI',
    tag: 'Pełna autonomia',
    desc: 'Samodzielny pracownik cyfrowy, który dostaje cel i sam dobiera kroki.',
    bullets: ['Wykonuje cel', 'Używa narzędzi', 'Pracuje 24/7'],
    examples: [
      'Klient pisze o 23:00 z pytaniem o termin. Agent odpowiada, pyta o szczegóły, sprawdza kalendarz i rezerwuje wizytę. Rano masz gotowe spotkanie.',
      'Agent pilnuje skrzynki całą dobę: sam odpowiada na typowe pytania, trudniejsze przekazuje Tobie z gotowym streszczeniem wątku.',
    ],
  },
]

type AiType = typeof aiTypes[number]

type AiCardProps = { ai: AiType; inView: boolean; i: number; asHeading?: boolean }

function PackageCard({ pkg, inView, i, asHeading = true }: { pkg: Package; inView: boolean; i: number; asHeading?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <m.div
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...premiumSpring, delay: i * 0.1 }}
      whileHover={{ y: -4, scale: 1.005, transition: hoverSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`premium-card pkg-card relative overflow-hidden rounded-2xl border p-5 sm:p-7 transition-[border-color,box-shadow] duration-300 flex flex-col ${
        pkg.featured
          ? 'border-[rgba(34,211,238,0.3)] shadow-[0_0_0_2px_rgba(34,211,238,0.1),_0_4px_24px_rgba(34,211,238,0.18),_0_0_40px_rgba(34,211,238,0.1)]'
          : isHovered
          ? 'border-[rgba(255,255,255,0.14)] shadow-[0_12px_36px_rgba(0,0,0,0.5),_0_4px_12px_rgba(0,0,0,0.4)]'
          : 'border-[rgba(255,255,255,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.45)]'
      }`}
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0) 34%) , var(--bg-elevated)', willChange: 'transform' }}
    >
      <div className="absolute inset-x-6 top-5 h-1 rounded-full bg-gradient-to-r from-[#22D3EE]/70 via-[#5EEAFF]/35 to-[#22D3EE]/20" />
      {pkg.featured ? (
        <div className="mb-3 mt-8">
          <span className="inline-block px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#06141A] bg-[#22D3EE] rounded-full shadow-[0_10px_30px_rgba(34,211,238,0.18)]">
            Najpopularniejszy
          </span>
        </div>
      ) : (
        <div className="mb-3 mt-8 h-[22px]" />
      )}
      {asHeading ? (
        <h3 className="text-[1.05rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
          {pkg.name}
        </h3>
      ) : (
        <div className="text-[1.05rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
          {pkg.name}
        </div>
      )}
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
    </m.div>
  )
}

function OverviewCard({ item, i }: { item: Overview; i: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.target === 'strony' ? MonitorSmartphone : Sparkles

  return (
    <m.div
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...premiumSpring, delay: i * 0.1 }}
      whileHover={{ y: -4, transition: hoverSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-active={isHovered ? 'true' : 'false'}
      className="overview-glow group relative isolate rounded-2xl"
      style={{ willChange: 'transform' }}
    >
      <span aria-hidden="true" className="overview-glow-border" />

      <div
        className={`premium-card overview-card relative z-[1] flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-8 transition-[border-color,box-shadow] duration-300 ${
          isHovered
            ? 'border-[rgba(34,211,238,0.35)] shadow-[0_16px_44px_rgba(0,0,0,0.5)]'
            : 'border-[rgba(255,255,255,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.45)]'
        }`}
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0) 34%), var(--bg-elevated)' }}
      >
        <span aria-hidden="true" className="overview-num pointer-events-none absolute right-5 top-3 select-none">{item.no}</span>

        <div className="flex items-center gap-3.5">
          <span className="overview-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[rgba(34,211,238,0.25)]" style={{ background: 'rgba(34,211,238,0.08)' }}>
            <Icon size={22} strokeWidth={1.8} className="text-[#5EEAFF]" aria-hidden="true" />
          </span>
          <h3 className="text-[1.45rem] font-bold tracking-[-0.03em] leading-tight text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
            {item.name}
          </h3>
        </div>

        <p className="mt-5 text-[15px] font-semibold leading-snug text-[#EAF0F7]">{item.problem}</p>

        <p className="mt-2.5 text-[14px] leading-[1.7] text-[#A6B2C4]">{item.desc}</p>

              <ul className="mt-6 flex flex-col gap-3">
          {item.solves.map(([pain, fix]) => (
            <li key={pain} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(34,211,238,0.15)' }} aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[13.5px] leading-[1.55] text-[#A6B2C4]">
                <span className="text-[#7C879B] line-through decoration-[rgba(124,135,155,0.5)]">{pain}</span>
                <span className="mx-1.5 text-[#22D3EE]">→</span>
                <span className="text-[#EAF0F7]">{fix}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7" aria-hidden="true">
          <span className="block h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.10),transparent)]" />
        </div>
      </div>
    </m.div>
  )
}

function ProcessFlowDiagram({ type }: { type: 'simple' | 'ai' | 'agent' }) {
  if (type === 'simple') {
    return (
      <svg viewBox="0 0 380 130" className="max-h-full w-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-simple-title">
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
      <svg viewBox="0 0 420 130" className="max-h-full w-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-ai-title">
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
    <svg viewBox="0 0 380 200" className="max-h-full w-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="diagram-agent-title">
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
  const [detailsExpanded, setDetailsExpanded] = useState(false)

  const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('kontakt')
  }

  return (
    <>
      <section id="uslugi" ref={ref1} className="section-shell relative" data-no-entrance suppressHydrationWarning>
        <div className="relative mx-auto max-w-7xl">
          <m.div
            className="section-heading"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-kicker" suppressHydrationWarning>Usługi</span>
            <h2 className="section-title" suppressHydrationWarning>Dwie rzeczy, które robimy dla Twojej firmy</h2>
            <p className="section-copy">
              Pracujemy z małymi i średnimi firmami usługowymi. Skupiamy się na dwóch rzeczach, które realnie przekładają się na klientów i Twój czas: stronach, które same pozyskują zapytania, i automatyzacjach, które przejmują powtarzalną robotę. Pierwszą wizualizację widzisz w 24 godziny, a płacisz dopiero wtedy, gdy wszystko gra.
            </p>
          </m.div>

          <div className="mt-14 grid items-start gap-5 md:grid-cols-2 lg:gap-6" data-stagger-group>
            {overview.map((item, i) => (
              <OverviewCard key={item.name} item={item} i={i} />
            ))}
          </div>

          {/* ── Część 2: Strony internetowe ── */}
          <m.div
            id="strony"
            className="section-heading mt-24"
            style={{ scrollMarginTop: 'var(--nav-h)' }}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-kicker" suppressHydrationWarning>01 — Strony internetowe</span>
            <h2 className="section-title" suppressHydrationWarning>Strona, która pozyskuje klientów za Ciebie</h2>
            <p className="section-copy">
              Wybierz zakres, który pasuje do etapu Twojej firmy. Każdy pakiet jest szybki, dopięty na telefonie i napisany pod sprzedaż — a SEO, GEO i opiekę masz wbudowane w cenę.
            </p>
            <p className="section-copy mt-3 text-[14px]">
              Jednorazowa opłata za gotową stronę — bez abonamentu na start i bez prowizji od agencji. Jeden nowy klient pozyskany dzięki stronie zwykle zwraca cały koszt.
            </p>
          </m.div>

          <div className="mt-12">
            <div className="hidden lg:grid gap-4 lg:grid-cols-3 lg:gap-5" data-stagger-group>
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
                <m.div
                  key={pkg.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -64 : 64 }}
                  animate={inView1 ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...premiumSpring, delay: i * 0.12 }}
                >
                  <PackageCard pkg={pkg} inView={inView1} i={i} asHeading={false} />
                </m.div>
              ))}
            </div>
          </div>

          {/* ── Połączony box: SEO + opieka + hosting (szczegóły po rozwinięciu) ── */}
          <m.div
            className="mt-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] px-6 py-6"
            data-fade-in
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <h3 className="mb-1.5 text-[15px] font-bold tracking-[-0.02em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
              SEO, opieka i hosting — wszystko w cenie
            </h3>
            <p className="text-[14px] leading-[1.7] text-[#A6B2C4]">
              Każdą stronę robimy tak, żeby Google ją rozumiał, a ChatGPT, Gemini czy Perplexity chętnie się na Ciebie powoływały. Hosting, domenę, kopie zapasowe, aktualizacje i bieżące poprawki bierzemy na siebie — Ty zajmujesz się firmą, nie stroną.
            </p>

            <AnimatePresence initial={false}>
              {detailsExpanded && (
                <m.div
                  initial={false}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.36, ease }}
                  className="overflow-hidden"
                >
                  {/* SEO / GEO / AI SEARCH */}
                  <p className="mt-7 mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5EEAFF]">SEO i GEO — widoczność w Google i w AI</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {seoCards.map((item) => (
                      <div key={item.label} className="seo-card rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-4 bg-[rgba(255,255,255,0.02)]">
                        <p className="mb-1 text-[13.5px] font-semibold text-[#EAF0F7]">{item.label}</p>
                        <p className="text-[13px] leading-[1.65] text-[#A6B2C4]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Co obejmuje opieka */}
                  <p className="mt-8 mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5EEAFF]">Co obejmuje opieka</p>
                  <ul className="flex flex-col gap-2.5">
                    {careItems.map((item, i) => (
                      <li key={i} className="care-item flex items-start gap-3 rounded-xl px-3 py-2.5 text-[14px] leading-[1.65] text-[#A6B2C4]">
                        <span className="care-bullet mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(34,211,238,0.15)' }} aria-hidden>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M5 13l4 4L19 7" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Cennik opieki miesięcznej */}
                  <p className="mt-8 mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5EEAFF]">Opieka miesięczna</p>
                  <div className="rounded-xl border border-[rgba(255,255,255,0.08)] px-5 py-4 bg-[rgba(255,255,255,0.02)]">
                    <p className="mb-3 text-[13.5px] text-[#A6B2C4]">Opcjonalna dla pakietów Landing i Strona kompletna, w cenie reszta:</p>
                    <ul className="mb-3 flex flex-col gap-1.5">
                      <li className="text-[14px] leading-[1.6] text-[#A6B2C4]"><span className="font-semibold text-[#EAF0F7]">Landing:</span> + 39 zł/mies.</li>
                      <li className="text-[14px] leading-[1.6] text-[#A6B2C4]"><span className="font-semibold text-[#EAF0F7]">Strona kompletna:</span> + 49 zł/mies.</li>
                      <li className="text-[14px] leading-[1.6] text-[#A6B2C4]"><span className="font-semibold text-[#EAF0F7]">Strona z panelem:</span> + 99 zł/mies. (obowiązkowa)</li>
                    </ul>
                    <p className="text-[13px] leading-[1.6] text-[#A6B2C4]">
                      <span className="font-semibold text-[#EAF0F7]">To zawiera:</span> hosting i domenę, SEO, GEO, AI SEARCH, kopie zapasowe, aktualizacje i bieżące zmiany.
                    </p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setDetailsExpanded((v) => !v)}
              aria-expanded={detailsExpanded}
              className="mt-5 w-full rounded-xl border border-[rgba(255,255,255,0.14)] bg-transparent px-5 py-3 text-[14px] font-semibold text-[#EAF0F7] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.2)]"
            >
              {detailsExpanded ? 'Pokaż mniej' : 'Pokaż szczegóły (SEO, opieka, cennik)'}
            </button>
          </m.div>
        </div>
      </section>

      <section
        id="automatyzacje"
        ref={ref2}
        className="section-shell relative overflow-hidden"
        data-no-entrance
        suppressHydrationWarning
      >
        <div className="relative mx-auto max-w-7xl">
          <m.div
            className="section-heading"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-kicker" suppressHydrationWarning>02 — Automatyzacje i agenci AI</span>
            <h2 className="section-title" suppressHydrationWarning>Przestań robić to, co AI może zrobić za Ciebie</h2>
            <p className="section-copy">
              Trzy poziomy tego samego: od prostych reguł, przez AI rozumiejące treść, po agenta, który sam realizuje cel. Każdy z nich zdejmuje z Ciebie powtarzalną robotę — wyjaśniamy konkretnie, bez żargonu.
            </p>
          </m.div>

          <div className="mt-16">
            <div className="hidden lg:grid gap-4 lg:grid-cols-3 lg:gap-6 auto-rows-fr" data-stagger-group>
              {aiTypes.map((ai, i) => <AiCard key={ai.name} ai={ai} inView={inView2} i={i} />)}
            </div>

            <div className="flex flex-col gap-4 overflow-hidden lg:hidden">
              {aiTypes.map((ai, i) => (
                <m.div
                  key={ai.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -64 : 64 }}
                  animate={inView2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...premiumSpring, delay: i * 0.12 }}
                >
                  <AiCard ai={ai} inView={inView2} i={i} asHeading={false} />
                </m.div>
              ))}
            </div>
          </div>

          <m.div
            className="mt-8 rounded-2xl border border-[rgba(255,255,255,0.08)] px-6 py-5 bg-[rgba(255,255,255,0.02)]"
            data-fade-in
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            <p className="text-[14px] leading-[1.7] text-[#A6B2C4]">
              <span className="font-semibold text-[#EAF0F7]">Wycena</span> dopasowana do Twoich potrzeb po krótkim spotkaniu. Rozpoznajemy na nim Twoje największe wąskie gardła i problemy, które realnie da się zautomatyzować albo poprawić. W najgorszym razie wychodzisz ze spotkania wiedząc dokładnie, co i jak usprawnić u siebie. Czyli i tak wygrywasz.
            </p>
          </m.div>

          {/* CTA removed per design: keep section clean and focused on offerings */}
        </div>
      </section>
    </>
  )
}

function AiCard({ ai, inView, i, asHeading = true }: AiCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getProcessType = () => {
    if (ai.name === 'Automatyzacja') return 'simple'
    if (ai.name === 'Automatyzacja AI') return 'ai'
    return 'agent'
  }

  return (
    <m.div
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...premiumSpring, delay: i * 0.1 }}
      whileHover={{ y: -4, scale: 1.005, transition: hoverSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`premium-card ai-card rounded-2xl border p-7 flex flex-col h-full transition-[border-color,box-shadow] duration-300 ${
        isHovered
          ? 'border-[rgba(34,211,238,0.3)] shadow-[0_16px_44px_rgba(0,0,0,0.5),_0_4px_22px_rgba(34,211,238,0.14)]'
          : 'border-[rgba(255,255,255,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.45)]'
      }`}
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0) 34%), var(--bg-elevated)', willChange: 'transform' }}
    >

      <div className="mb-6">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#6B7485]">{ai.tag}</span>
        {asHeading ? (
          <h3 className="mt-2 text-[1.2rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {ai.name}
          </h3>
        ) : (
          <div className="mt-2 text-[1.2rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {ai.name}
          </div>
        )}
      </div>

      <div className="mb-6 flex h-[148px] items-center justify-center rounded-xl border border-[rgba(255,255,255,0.07)] px-5" style={{ background: 'rgba(255,255,255,0.025)' }}>
        <ProcessFlowDiagram type={getProcessType()} />
      </div>

      <p className="text-[14px] leading-[1.7] text-[#A6B2C4] mb-5 min-h-[2.75rem]">{ai.desc}</p>

      <div className="space-y-2.5 mb-6">
        {ai.bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#22D3EE]" />
            <span className="text-[13.5px] leading-[1.5] text-[#A6B2C4]">{bullet}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5EEAFF]">
          {ai.examples.length > 1 ? 'Przykłady' : 'Przykład'}
        </p>
        {ai.examples.map((example, idx) => (
          <div key={idx} className="rounded-r-md border-l-2 border-[#22D3EE] px-4 py-3.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <p className="text-[13.5px] leading-[1.68] text-[#A6B2C4]">{example}</p>
          </div>
        ))}
      </div>
    </m.div>
  )
}

