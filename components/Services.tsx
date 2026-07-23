'use client'

import { AnimatePresence, m } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1]

const packages = [
  {
    name: 'Landing',
    eyebrow: 'Jedna usługa, jeden konkretny cel',
    problem: 'Potrzebujesz profesjonalnie pokazać ofertę i ułatwić klientowi kontakt.',
    outcome: 'Otrzymujesz gotową stronę opartą na Twojej ofercie, sposobie pracy i pytaniach, które zadają klienci.',
    features: [
      'Struktura strony ułożona pod Twój biznes',
      'Komplet najważniejszych sekcji sprzedażowych',
      'Pomoc w uporządkowaniu i napisaniu treści',
      'Oferta, realizacje, opinie, FAQ i kontakt',
      'Formularz kontaktowy z powiadomieniem',
      'Pełna wersja mobilna i szybkie ładowanie',
      'Analityka i mierzenie najważniejszych kliknięć',
    ],
    amount: 1997,
    featured: false,
    support: '30 dni opieki w cenie, potem opcjonalnie od 29 do 99 zł/mies. zależnie od konfiguracji.',
    cta: 'Wybieram Landing',
  },
  {
    name: 'Strona z obsługą klienta',
    eyebrow: 'Strona, która odpowiada i umawia',
    problem: 'Klienci pytają o to samo, czekają na odpowiedź albo rezygnują przed kontaktem.',
    outcome: 'Strona przedstawia ofertę, odpowiada na typowe pytania i prowadzi klienta do wiadomości lub rezerwacji terminu.',
    features: [
      'Wszystko, co zawiera pakiet Landing',
      'Rozbudowana prezentacja kilku usług',
      'Chatbot AI z wiedzą o Twojej firmie',
      'Rozbudowany formularz dopasowany do usługi',
      'Automatyczne potwierdzenie dla klienta',
      'Natychmiastowe powiadomienie o zapytaniu',
      'Rezerwacja terminu spotkania',
      'Dodatkowe scenariusze obsługi najczęstszych pytań',
    ],
    amount: 2299,
    featured: true,
    support: '30 dni opieki w cenie, potem opcjonalnie od 29 do 99 zł/mies. zależnie od konfiguracji.',
    cta: 'Chcę stronę z AI',
  },
  {
    name: 'Pełny pakiet z panelem',
    eyebrow: 'Dla firmy, która regularnie się rozwija',
    problem: 'Chcesz samodzielnie rozwijać ofertę, publikować wiedzę i aktualizować materiały dla klientów oraz AI.',
    outcome: 'Otrzymujesz pełną stronę z panelem, blogiem, bazą wiedzy i możliwością dalszego rozwoju bez budowania wszystkiego od nowa.',
    features: [
      'Wszystko, co zawiera pakiet z obsługą klienta',
      'Pełna strona z kilkoma podstronami',
      'Panel administracyjny po polsku',
      'Samodzielna edycja oferty i realizacji',
      'Dodawanie wpisów na blogu i do bazy wiedzy',
      'Aktualizowanie wiedzy chatbota AI',
      'Rozbudowana analityka zachowań klientów',
      'Instrukcja obsługi i wdrożenie do panelu',
    ],
    amount: 3099,
    featured: false,
    support: '60 dni opieki w cenie, potem opcjonalnie od 29 do 99 zł/mies. zależnie od konfiguracji.',
    cta: 'Potrzebuję pełnego pakietu',
  },
] as const

const automationExamples = [
  'Chatbot zna Twoją ofertę, odpowiada klientom i przekazuje trudniejsze pytania Tobie.',
  'Klient wysyła formularz, od razu dostaje potwierdzenie, a Ty komplet informacji o zapytaniu.',
  'AI czyta długą wiadomość, przygotowuje krótkie podsumowanie i propozycję odpowiedzi.',
  'Po wykonaniu usługi klient automatycznie otrzymuje przypomnienie lub prośbę o opinię.',
] as const

const includedInEveryWebsite = [
  'Analiza oferty i sposobu działania firmy',
  'Projekt dopasowany do telefonu i komputera',
  'Szybkość, bezpieczeństwo i podstawowa analityka',
  'SEO, GEO i AEO wbudowane w strukturę strony',
] as const

const clientQuestions = [
  {
    label: 'Strona',
    question: 'Klient trafia na stronę, ale nadal nie rozumie, dlaczego ma wybrać właśnie Ciebie?',
    answer: 'Porządkujemy ofertę i pokazujemy wartość firmy językiem decyzji klienta — bez pustych haseł i przypadkowych sekcji.',
  },
  {
    label: 'Strona + obsługa',
    question: 'Te same pytania wracają przed każdym telefonem, mailem lub wyceną?',
    answer: 'Strona odpowiada wcześniej, zbiera właściwe informacje i prowadzi klienta do kontaktu albo rezerwacji terminu.',
  },
  {
    label: 'Automatyzacja',
    question: 'Zespół ręcznie przepisuje dane, pilnuje statusów i wykonuje w kółko te same kroki?',
    answer: 'Najpierw upraszczamy proces, a potem automatyzujemy tylko tę część, która realnie oszczędza czas i ogranicza błędy.',
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
            Nowe podstrony, funkcje i większa przebudowa są zawsze wyceniane przed rozpoczęciem pracy. Przy dodatkowych automatyzacjach lub funkcjach AI cena może się różnić zależnie od kosztu używanych narzędzi, liczby operacji i wybranego modelu AI.
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
  {
    id: 'roznice-ai',
    title: 'Automatyzacja, AI i agent AI — czym się różnią?',
    summary: 'Dobieramy najprostsze rozwiązanie, które naprawdę wystarczy do wykonania zadania.',
    content: (
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Automatyzacja', 'Wykonuje stałą sekwencję kroków.', 'Po formularzu wysyła potwierdzenie, zapisuje dane i powiadamia Cię o zapytaniu.'],
          ['Automatyzacja z AI', 'Rozumie treść wiadomości lub dokumentu.', 'Czyta pytanie klienta, przygotowuje podsumowanie albo dopasowuje wersję odpowiedzi.'],
          ['Agent AI', 'Dobiera kolejne działania w ustalonych granicach.', 'Prowadzi rozmowę, dopytuje o brakujące informacje i może zaproponować lub zarezerwować termin.'],
        ].map(([title, desc, example]) => (
          <div key={title} className="rounded-xl border border-[rgba(255,255,255,0.09)] bg-[#0D1219] p-5">
            <h4 className="text-[15px] font-bold text-[#EAF0F7]">{title}</h4>
            <p className="mt-2 text-[13.5px] leading-[1.65] text-[#A6B2C4]">{desc}</p>
            <p className="mt-4 border-t border-[rgba(255,255,255,0.08)] pt-4 text-[13px] leading-[1.65] text-[#C4CFDC]">
              <span className="font-semibold text-[#8CD8FF]">Przykład: </span>{example}
            </p>
          </div>
        ))}
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
      data-anime-card
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
          <div className="flex items-center justify-between gap-3">
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
            <li key={feature} className={`flex items-start gap-2.5 text-[13.5px] leading-[1.55] ${index === 0 && pkg.name !== 'Landing' ? 'font-semibold text-[#EAF0F7]' : 'text-[#A6B2C4]'}`}>
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
    <section id="uslugi" className="section-shell relative overflow-hidden !pt-20 sm:!pt-24 lg:!pt-28" data-no-entrance suppressHydrationWarning>
      <div className="relative mx-auto max-w-7xl">
        <div className="section-heading">
          <span className="section-kicker" suppressHydrationWarning>Usługi</span>
          <h2 className="section-title io-visible max-w-[18ch]" suppressHydrationWarning>
            Strony i automatyzacje dopasowane do tego, jak naprawdę działa Twoja firma
          </h2>
          <p className="section-copy io-visible max-w-[680px]">
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
                Nie musisz wiedzieć, czy potrzebujesz strony, AI czy automatyzacji. Wystarczy opisać moment, w którym tracisz czas, zapytania albo uwagę klienta.
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
              Każda strona powstaje na podstawie Twojego biznesu. Pakiety różnią się zakresem obsługi klienta, możliwością samodzielnej edycji i poziomem automatyzacji.
            </p>
          </div>

          <div id="strony" className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
            {packages.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} onLearnMoreAboutCare={() => openDetailPanel('opieka')} />)}
          </div>

          <article id="automatyzacje" data-anime-card className="service-automation-card mt-7 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#10151D] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
              <div className="flex flex-col">
                <span className="text-[12px] font-medium text-[#8B97A8]">Automatyzacja procesu biznesowego</span>
                <h3 className="mt-4 text-[clamp(25px,3vw,38px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Oddaj powtarzalny proces systemowi
                </h3>
                <p className="mt-5 text-[14px] leading-[1.75] text-[#A6B2C4]">
                  Pokaż nam zadanie, które regularnie zabiera Ci czas. Na bezpłatnej konsultacji sprawdzimy, czy da się je bezpiecznie uprościć i jaki rodzaj automatyzacji ma w Twojej firmie sens.
                </p>
                <div className="mt-6 border-y border-[rgba(255,255,255,0.08)] py-5">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[#8A96A8]">Koszt wdrożenia</span>
                  <span className="mt-1 block text-[1.65rem] font-extrabold tracking-[-0.035em] text-[#EAF0F7]">Wycena po konsultacji</span>
                  <span className="mt-1 block text-[12px] text-[#7C879B]">Jednorazowa cena ustalona przed rozpoczęciem pracy.</span>
                </div>
                <a href="#kontakt" onClick={handleContactClick} className="btn btn-primary mt-6 w-full px-5 py-3.5 text-[13px] font-semibold sm:w-auto">
                  Omów mój proces
                </a>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#8B97A8]">Przykładowe zastosowania</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {automationExamples.map((example) => (
                    <li key={example} className="flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0D1219] p-4 text-[13px] leading-[1.65] text-[#C4CFDC]">
                      <CheckMark />
                      {example}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDetail(openDetail === 'roznice-ai' ? null : 'roznice-ai')
                    window.setTimeout(() => document.getElementById('szczegoly-uslug')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
                  }}
                  className="mt-5 text-left text-[13.5px] font-semibold text-[#8CD8FF] transition-colors hover:text-[#EAF0F7]"
                >
                  Dowiedz się, czym różni się automatyzacja od agenta AI ↓
                </button>
              </div>
            </div>
          </article>
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
