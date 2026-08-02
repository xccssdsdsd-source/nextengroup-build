'use client'

import { AnimatePresence, m } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1]

const packages = [
  {
    name: 'Strona na jedną usługę',
    eyebrow: 'Pozyskiwanie wyłączności lub dedykowana usługa',
    problem: 'Chcesz przekonać sprzedającego do umowy na wyłączność lub promować konkretny rejon/inwestycję.',
    outcome: 'Otrzymujesz dopracowaną stronę sprzedażową skupioną na pozyskiwaniu leadów i budowaniu zaufania.',
    features: [
      'Struktura ułożona pod pozyskiwanie wyłączności i klientów',
      'Sekcja zaufania, opinii klientów i wyników sprzedaży',
      'Formularz darmowej wyceny / zgłoszenia nieruchomości',
      'Pomoc w uporządkowaniu i napisaniu przekonujących treści',
      'Pełna wersja mobilna i szybkie ładowanie',
      'Analityka i mierzenie zgłoszeń klientów',
    ],
    amount: 1997,
    featured: false,
    support: '30 dni opieki w cenie, potem opcjonalnie od 29 do 99 zł/mies. zależnie od konfiguracji.',
    cta: 'Wybieram stronę na jedną usługę',
  },
  {
    name: 'Strona z chatbotem AI',
    eyebrow: 'Obsługa klientów i kwalifikacja 24/7',
    problem: 'Klienci pytają o nieruchomości wieczorami i w weekendy, a Ty tracisz czas na niekwalifikowane rozmowy.',
    outcome: 'Strona z Agentem AI 24/7, który odpowiada na pytania o lokale, zbiera wymagania i umawia prezentacje.',
    features: [
      'Wszystko, co zawiera pakiet Strona na jedną usługę',
      'Rozbudowana prezentacja wszystkich usług biura',
      'Agent AI 24/7 z pełną wiedzą o Twojej firmie i rejonie',
      'Wstępna kwalifikacja kupujących (budżet, metraż, lokalizacja)',
      'Automatyczne umawianie spotkań i prezentacji',
      'Natychmiastowe powiadomienie o gorącym zapytaniu',
      'Dedykowane scenariusze odpowiedzi dla kupujących i sprzedających',
    ],
    amount: 2397,
    featured: true,
    support: '30 dni opieki w cenie, potem opcjonalnie od 29 do 99 zł/mies. zależnie od konfiguracji.',
    cta: 'Chcę stronę z AI agentem',
  },
  {
    name: 'Strona z panelem do zarządzania',
    eyebrow: 'Twój własny portal nieruchomości z AI',
    problem: 'Chcesz błyskawicznie samemu dodawać i edytować oferty bez znajomości kodowania i drogich abonamentów.',
    outcome: 'Otrzymujesz pełną stronę biura z intuicyjnym panelem oraz AI agentem połączonym z aktualną bazą ofert.',
    features: [
      'Wszystko, co zawiera pakiet Strona z chatbotem AI',
      'Dedykowany panel administracyjny w języku polskim',
      'Dodawanie i edycja ofert w 2 minuty (zdjęcia, cena, parametry)',
      'Automatyczna synchronizacja bazy ofert z wiedzą AI Agenta',
      'Moduł bloga / bazy wiedzy o rynku nieruchomości (SEO)',
      'Rozbudowana analityka popularności ofert',
      'Instrukcja wideo i przeszkolenie z obsługi panelu',
    ],
    amount: 2997,
    featured: false,
    support: '60 dni opieki w cenie, potem opcjonalnie od 29 do 99 zł/mies. zależnie od konfiguracji.',
    cta: 'Potrzebuję strony z panelem',
  },
] as const

const includedInEveryWebsite = [
  'Analiza oferty i specyfiki rynku nieruchomości',
  'Projekt idealnie dopasowany do telefonu i komputera',
  'Szybkość, bezpieczeństwo i podstawowa analityka',
  'SEO, GEO i AEO wbudowane w strukturę strony',
] as const

const clientQuestions = [
  {
    label: 'Strona na usługę',
    question: 'Właściciel nieruchomości nie rozumie, dlaczego ma powierzyć sprzedaż właśnie Tobie na wyłączność?',
    answer: 'Porządkujemy Twoją ofertę i udowadniamy wartość Twojej pracy językiem korzyści dla sprzedającego — budując natychmiastowe zaufanie.',
  },
  {
    label: 'Strona + AI Agent',
    question: 'Telefon dzwoni po godzinach pracy, a pytania o metraż i cenę powtarzają się bez końca?',
    answer: 'Agent AI odpowiada 24/7 na pytania o rejony i nieruchomości, zbiera wymagania klienta i umawia prezentację bezpośrednio do Twojego kalendarza.',
  },
  {
    label: 'Strona z panelem',
    question: 'Wprowadzanie nowych ofert na własną stronę jest powolne lub płacisz wysokie abonamenty?',
    answer: 'Przekazujemy Ci banalnie prosty panel po polsku — dodajesz ofertę w 2 minuty, a chatbot AI od razu poznaje nowe nieruchomości.',
  },
] as const

const detailPanels = [
  {
    id: 'opieka',
    title: 'Jak wygląda opieka po wdrożeniu?',
    summary: 'Nie zostajesz sam ze stroną, gdy firma i oferta zaczynają się zmieniać.',
    content: (
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h4 className="text-[15px] font-bold text-[#EAF0F7]">Strona może rozwijać się razem z firmą</h4>
          <p className="mt-2 text-[13.5px] leading-[1.75] text-[#A6B2C4]">
            Po publikacji otrzymujesz okres wsparcia wskazany w pakiecie. Pomagamy w uruchomieniu, usuwamy ewentualne błędy i odpowiadamy na pytania. Później możesz korzystać ze stałej opieki tak długo, jak jej potrzebujesz — również przez kolejne lata.
          </p>
          <p className="mt-3 text-[13.5px] leading-[1.75] text-[#A6B2C4]">
            Poprawki bez limitu dotyczą etapu projektowania w ramach uzgodnionego zakresu. Po publikacji drobne zmiany realizujemy w ramach ustalonej opieki, a większą rozbudowę wyceniamy przed rozpoczęciem pracy.
          </p>
        </div>
        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#0D1219] p-5">
          <span className="text-[12px] font-medium text-[#8B97A8]">Stała opieka i hosting</span>
          <div className="mt-1 flex items-end gap-1.5">
            <span className="text-[2rem] font-extrabold tracking-[-0.04em] text-[#EAF0F7]">od 29 do 99 zł</span>
            <span className="pb-1 text-[13px] font-medium text-[#8B97A8]">miesięcznie</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-[1.6] text-[#8CD8FF]">
            Dokładna kwota zależy od Twojej strony i wybranej konfiguracji opieki — ustalamy ją indywidualnie przed startem.
          </p>
          <ul className="mt-5 grid gap-2">
          {[
            'Hosting, monitoring i kopie zapasowe',
            'Aktualizacje oraz bezpieczeństwo',
            'Drobne poprawki bez limitu zgłoszeń',
            'Aktualizacja treści, oferty i wiedzy chatbota',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 py-1 text-[13.5px] leading-[1.55] text-[#C4CFDC]">
              <CheckMark />
              {item}
            </li>
          ))}
          </ul>
          <p className="mt-4 border-t border-[rgba(255,255,255,0.08)] pt-4 text-[12.5px] leading-[1.6] text-[#94A0B4]">
            Nowe podstrony, funkcje i większa przebudowa są zawsze wyceniane przed rozpoczęciem pracy.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'podstawy',
    title: 'Co jest wliczone w każdą stronę i nie wymaga dokupienia?',
    summary: 'SEO, GEO i AEO to element wdrożenia, nie osobna usługa w naszej ofercie.',
    content: (
      <div>
        <p className="text-[13.5px] leading-[1.75] text-[#A6B2C4]">
          SEO, GEO i AEO są elementem wdrożenia strony, a nie osobną usługą w naszej ofercie — otrzymujesz je w ramach każdego z trzech pakietów.
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {includedInEveryWebsite.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[#C4CFDC]">
              <CheckMark />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
] as const

function CheckMark() {
  return (
    <span className="mt-[9px] h-px w-3 flex-shrink-0 bg-[#4BA8D1]" aria-hidden="true" />
  )
}

function PackageCard({ pkg, onLearnMoreAboutCare }: { pkg: (typeof packages)[number]; onLearnMoreAboutCare: () => void }) {
  return (
    <article
      data-featured={pkg.featured ? 'true' : 'false'}
      className={`service-package-card group relative h-full overflow-hidden rounded-2xl border transition-[box-shadow,border-color] duration-300 ${
        pkg.featured
          ? 'border-[rgba(58,175,232,0.5)] bg-[#121A23] shadow-[0_0_0_1px_rgba(58,175,232,0.12),0_8px_32px_-8px_rgba(58,175,232,0.28),0_24px_64px_-32px_rgba(58,175,232,0.22)]'
          : 'border-[rgba(255,255,255,0.08)] bg-[#10151D]'
      }`}
    >
      <div
        className="flex h-full flex-col p-5 sm:p-7"
      >
        {pkg.featured && (
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#4BA8D1] to-transparent"
            aria-hidden="true"
          />
        )}
        <div className="lg:min-h-[82px]">
          <div className="flex min-h-[26px] items-center justify-between gap-3">
            <span className="text-[12px] font-medium text-[#8B97A8]">{pkg.eyebrow}</span>
            {pkg.featured && (
              <span className="flex-shrink-0 rounded-full bg-[rgba(58,175,232,0.12)] px-2.5 py-1 text-[10.5px] font-semibold text-[#75C0E2] shadow-[0_0_16px_rgba(58,175,232,0.18)]">
                Najczęściej wybierany
              </span>
            )}
          </div>
          <h3 className="mt-4 text-[1.25rem] font-extrabold leading-tight tracking-[-0.035em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
            {pkg.name}
          </h3>
        </div>

        <p className="mt-4 lg:min-h-[66px] text-[14px] font-semibold leading-[1.55] text-[#EAF0F7]">{pkg.problem}</p>
        <p className="mt-3 lg:min-h-[90px] text-[13.5px] leading-[1.65] text-[#A6B2C4]">{pkg.outcome}</p>

        <div className="mt-5 border-y border-[rgba(255,255,255,0.08)] py-5">
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[#8A96A8]">Cena jednorazowa</span>
          <span className="package-price mt-1 block text-[2rem] font-extrabold tracking-[-0.04em] text-[#EAF0F7] tabular-nums">
            <span>{pkg.amount}</span>
            <span className="ml-1 text-[1rem] font-bold text-[#A6B2C4]">zł</span>
          </span>
        </div>

        <p className="mt-5 text-[12px] font-semibold text-[#8B97A8]">W pakiecie otrzymujesz</p>
        <ul className="mt-4 flex flex-col gap-2.5">
          {pkg.features.map((feature, index) => (
            <li key={feature} className={`flex items-start gap-2.5 text-[13.5px] leading-[1.55] ${index === 0 && pkg.name !== 'Strona na jedną usługę' ? 'font-semibold text-[#EAF0F7]' : 'text-[#A6B2C4]'}`}>
              <CheckMark />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <p className="text-left text-[11.5px] font-medium leading-[1.55] text-[#7C879B]">{pkg.support}</p>
          <button
            type="button"
            onClick={onLearnMoreAboutCare}
            className="mb-4 mt-1.5 block w-full text-left text-[11.5px] font-semibold text-[#8CD8FF] transition-colors hover:text-[#EAF0F7]"
          >
            Dowiedz się więcej o opiece przy Twojej stronie
          </button>
          <a
            href="#kontakt"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('kontakt')
            }}
            className={`btn ${pkg.featured ? 'btn-primary' : 'btn-ghost'} w-full px-4 py-3 text-[13px] font-semibold`}
          >
            {pkg.cta}
          </a>
        </div>
      </div>
    </article>
  )
}

function DetailPanel({ panel, open, onToggle }: {
  panel: (typeof detailPanels)[number]
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border transition-[border-color,background-color] duration-200 ${open ? 'border-[rgba(58,175,232,0.32)] bg-[rgba(58,175,232,0.055)]' : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`service-detail-${panel.id}`}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
      >
        <span>
          <span className="block text-[15px] font-bold text-[#EAF0F7]">{panel.title}</span>
          <span className="mt-1 block text-[12.5px] leading-[1.55] text-[#7C879B]">{panel.summary}</span>
        </span>
        <m.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease }}
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border ${open ? 'border-[#3AAFE8] bg-[#3AAFE8] text-[#06141A]' : 'border-[rgba(58,175,232,0.28)] text-[#3AAFE8]'}`}
        >
          <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
        </m.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={`service-detail-${panel.id}`}
            initial={{ opacity: 0, transform: 'translateY(-4px)' }}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            exit={{ opacity: 0, transform: 'translateY(-2px)' }}
            transition={{ duration: 0.2, ease }}
          >
            <div className="border-t border-[rgba(255,255,255,0.08)] px-5 py-6 sm:px-6">
              {panel.content}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Services() {
  const [openDetail, setOpenDetail] = useState<string | null>(null)

  const handlePackageScroll = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('pakiety')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToSection('kontakt')
  }

  const openDetailPanel = (id: string) => {
    setOpenDetail(id)
    window.setTimeout(() => document.getElementById('szczegoly-uslug')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
  }

  return (
    <section id="uslugi" className="section-shell relative overflow-hidden" data-no-entrance suppressHydrationWarning>
      <div className="relative mx-auto max-w-7xl">
        <div className="section-heading">
          <span className="section-kicker" suppressHydrationWarning>Usługi</span>
          <h2 className="section-title io-visible" suppressHydrationWarning>
            Strony dopasowane do Twojej firmy
          </h2>
          <p className="section-copy io-visible">
            Zaczynamy od sytuacji, którą chcesz zmienić — nie od wyboru technologii. Pierwszy kierunek strony widzisz zwykle w 24 godziny, prosty Landing możemy wdrożyć nawet od 72 godzin, a płacisz dopiero po zaakceptowaniu efektu.
          </p>
        </div>

        <div className="service-diagnostic mt-12 grid overflow-hidden rounded-[1.35rem] border border-[rgba(140,216,255,0.12)] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="service-diagnostic__intro flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8CD8FF]">Zacznij od problemu</span>
              <h3 className="mt-4 max-w-[13ch] text-[clamp(1.55rem,3vw,2.45rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#F5F9FD]" style={{ fontFamily: 'var(--font-heading)' }}>
                Co dziś blokuje klienta albo Twój zespół?
              </h3>
              <p className="mt-5 max-w-[38ch] text-[13.5px] leading-[1.72] text-[#A6B2C4]">
                Nie musisz wiedzieć, czy potrzebujesz strony czy AI. Wystarczy opisać moment, w którym tracisz czas, zapytania albo uwagę klienta.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              <a href="#pakiety" onClick={handlePackageScroll} className="service-text-link inline-flex items-center gap-2 text-[13px] font-semibold text-[#DDF3FF]">
                Zobacz pakiety <span aria-hidden="true">↓</span>
              </a>
              <a href="#kontakt" onClick={handleContactClick} className="service-text-link inline-flex items-center gap-2 text-[13px] font-semibold text-[#8CD8FF]">
                Opisz swój problem <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="service-question-list" data-stagger-group data-reveal-pattern="soft">
            {clientQuestions.map((item, index) => (
              <article key={item.question} className="service-question">
                <div className="flex items-center justify-between gap-4">
                  <span className="service-question__label">{item.label}</span>
                  <span className="font-mono text-[10px] text-[#68778D]" aria-hidden="true">0{index + 1}</span>
                </div>
                <h4 className="mt-4 max-w-[48ch] text-[15px] font-bold leading-[1.48] tracking-[-0.015em] text-[#F0F6FC]">
                  {item.question}
                </h4>
                <p className="mt-2 max-w-[60ch] text-[13.5px] leading-[1.68] text-[#A6B2C4]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="pakiety" className="mt-16 scroll-mt-28">
          <div className="section-heading">
            <span className="section-kicker">Nasze pakiety</span>
            <h2 className="section-title io-visible max-w-[15ch]">Wybierz zakres dopasowany do etapu firmy</h2>
            <p className="section-copy io-visible max-w-[690px]">
              Każda strona powstaje na podstawie Twojego biznesu. Pakiety różnią się zakresem obsługi klienta i możliwością samodzielnej edycji.
            </p>
          </div>

          <div id="strony" data-cta-zone className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
            {packages.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} onLearnMoreAboutCare={() => openDetailPanel('opieka')} />)}
          </div>
        </div>

        <div id="szczegoly-uslug" className="mt-12 scroll-mt-28">
          <div className="mb-6">
            <span className="section-kicker">Więcej informacji</span>
            <h2 className="mt-3 text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.035em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
              Odpowiedzi, które ułatwią Ci wybór właściwego zakresu
            </h2>
          </div>
          <div className="grid gap-3">
            {detailPanels.map((panel) => (
              <DetailPanel
                key={panel.id}
                panel={panel}
                open={openDetail === panel.id}
                onToggle={() => setOpenDetail(openDetail === panel.id ? null : panel.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.018)] p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-[17px] font-bold text-[#EAF0F7]">Nie wiesz, który wariant pasuje do Twojej firmy?</h3>
            <p className="mt-1.5 text-[13px] leading-[1.6] text-[#7C879B]">Na krótkiej rozmowie porównamy potrzeby i wskażemy najprostsze rozwiązanie bez zobowiązań.</p>
          </div>
          <a href="#kontakt" onClick={handleContactClick} className="btn btn-ghost flex-shrink-0 px-6 py-3 text-[13px] font-semibold">
            Sprawdź na konsultacji
          </a>
        </div>
      </div>
    </section>
  )
}
