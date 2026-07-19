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
    amount: 1799,
    featured: false,
    support: '30 dni opieki w cenie, potem opcjonalnie 99 zł/mies.',
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
    support: '30 dni opieki w cenie, potem opcjonalnie 99 zł/mies.',
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
    support: '60 dni opieki w cenie, potem opcjonalnie 99 zł/mies.',
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

const detailPanels = [
  {
    id: 'realizacja',
    title: 'Jak wygląda realizacja strony?',
    summary: 'Od krótkiej rozmowy do pierwszej wizualizacji i publikacji.',
    content: (
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['01', 'Poznajemy firmę', 'Rozmawiamy o ofercie, klientach, przewagach i o tym, jak dziś wygląda kontakt z Twoją firmą.'],
          ['02', 'Pierwszy kierunek w 24h', 'Po zebraniu materiałów pokazujemy realną wizualizację strony. Nie wybierasz projektu wyłącznie z opisu.'],
          ['03', 'Dopracowujemy bez limitu', 'W ramach ustalonego zakresu zgłaszasz uwagi, a my poprawiamy projekt aż do akceptacji.'],
          ['04', 'Wdrażamy i publikujemy', 'Prosty landing może być gotowy nawet od 72 godzin. Większy projekt otrzymuje termin po ustaleniu zakresu.'],
        ].map(([no, title, desc]) => (
          <div key={no} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] p-4">
            <span className="font-mono text-[11px] font-semibold text-[#3AAFE8]">{no}</span>
            <h4 className="mt-2 text-[14px] font-bold text-[#EAF0F7]">{title}</h4>
            <p className="mt-2 text-[13px] leading-[1.65] text-[#A6B2C4]">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
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
            <span className="text-[2rem] font-extrabold tracking-[-0.04em] text-[#EAF0F7]">99 zł</span>
            <span className="pb-1 text-[13px] font-medium text-[#8B97A8]">miesięcznie</span>
          </div>
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
          <p className="mt-4 border-t border-[rgba(255,255,255,0.08)] pt-4 text-[12.5px] leading-[1.6] text-[#748094]">
            Nowe podstrony, funkcje i większa przebudowa są zawsze wyceniane przed rozpoczęciem pracy.
          </p>
        </div>
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

function PackageCard({ pkg }: { pkg: (typeof packages)[number] }) {
  return (
    <article
      className={`relative h-full overflow-hidden rounded-2xl border ${
        pkg.featured
          ? 'border-[rgba(75,168,209,0.42)] bg-[#121A23]'
          : 'border-[rgba(255,255,255,0.08)] bg-[#10151D]'
      }`}
    >
      <div
        className="flex h-full flex-col p-5 sm:p-7"
      >
        {pkg.featured && <span className="absolute inset-x-0 top-0 h-[2px] bg-[#4BA8D1]" aria-hidden="true" />}
        <div className="lg:min-h-[82px]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] font-medium text-[#8B97A8]">{pkg.eyebrow}</span>
            {pkg.featured && (
              <span className="flex-shrink-0 text-[10.5px] font-semibold text-[#75C0E2]">
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
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[#6B7891]">Cena jednorazowa</span>
          <span className="mt-1 block text-[2rem] font-extrabold tracking-[-0.04em] text-[#EAF0F7] tabular-nums">
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
          <p className="mb-4 text-center text-[11.5px] font-medium text-[#7C879B]">{pkg.support}</p>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease }}
            className="overflow-hidden"
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

  return (
    <section id="uslugi" className="section-shell relative overflow-hidden !pt-20 sm:!pt-24 lg:!pt-28" data-no-entrance suppressHydrationWarning>
      <div className="relative mx-auto max-w-7xl">
        <m.div
          className="section-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>Usługi</span>
          <h2 className="section-title io-visible max-w-[18ch]" suppressHydrationWarning>
            Strony i automatyzacje dopasowane do tego, jak naprawdę działa Twoja firma
          </h2>
          <p className="section-copy io-visible max-w-[720px]">
            Najpierw poznajemy Twoją ofertę, klientów i codzienny sposób pracy. Stronę budujemy wokół prawdziwej wartości, którą dajesz klientom, a automatyzację wokół procesu, który niepotrzebnie zabiera czas. Pierwszy kierunek strony widzisz zwykle w 24 godziny, prosty Landing możemy wdrożyć nawet od 72 godzin, a płacisz dopiero po zaakceptowaniu efektu.
          </p>
        </m.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#10151D] p-6 sm:p-8">
            <span className="text-[12px] font-medium text-[#8B97A8]">Strony internetowe</span>
            <h3 className="mt-3 text-[1.45rem] font-bold tracking-[-0.03em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
              Pokazujemy prawdziwą wartość Twojej firmy
            </h3>
            <p className="mt-5 text-[15px] font-semibold leading-[1.55] text-[#EAF0F7]">
              Klient szybko rozumie, co robisz, komu pomagasz i dlaczego warto wybrać właśnie Ciebie.
            </p>
            <p className="mt-3 text-[14px] leading-[1.72] text-[#A6B2C4]">
              Wyciągamy z Twojej oferty to, co naprawdę ważne: problem klienta, sposób, w jaki go rozwiązujesz, oraz przewagi wynikające z doświadczenia i obsługi. Na tej podstawie układamy treść i drogę do wiadomości, telefonu lub rezerwacji.
            </p>
            <a href="#pakiety" onClick={handlePackageScroll} className="mt-7 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#8CD8FF] transition-colors hover:text-[#EAF0F7]">
              Zobacz pakiety stron <span aria-hidden="true">↓</span>
            </a>
          </article>

          <article className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#10151D] p-6 sm:p-8">
            <span className="text-[12px] font-medium text-[#8B97A8]">Procesy biznesowe</span>
            <h3 className="mt-3 text-[1.45rem] font-bold tracking-[-0.03em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
              Porządkujemy i automatyzujemy sposób pracy
            </h3>
            <p className="mt-5 text-[15px] font-semibold leading-[1.55] text-[#EAF0F7]">
              Mniej ręcznego pilnowania, przepisywania i odpowiadania na te same pytania.
            </p>
            <p className="mt-3 text-[14px] leading-[1.72] text-[#A6B2C4]">
              Najpierw rozpisujemy, jak zadanie wygląda dzisiaj, usuwamy niepotrzebne kroki i dopiero potem automatyzujemy powtarzalną część. Dzięki temu narzędzie rzeczywiście oszczędza czas i zasoby zamiast dokładać kolejny system do obsługi.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setOpenDetail(openDetail === 'roznice-ai' ? null : 'roznice-ai')
                  window.setTimeout(() => document.getElementById('szczegoly-uslug')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
                }}
                className="text-left text-[13.5px] font-semibold text-[#8CD8FF] transition-colors hover:text-[#EAF0F7]"
              >
                Poznaj przykłady i różnice ↓
              </button>
              <a href="#kontakt" onClick={handleContactClick} className="text-[13.5px] font-semibold text-[#EAF0F7] transition-colors hover:text-[#8CD8FF] sm:border-l sm:border-white/10 sm:pl-3">
                Sprawdź proces na konsultacji
              </a>
            </div>
          </article>
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
            {packages.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}
          </div>

          <aside className="care-summary" aria-labelledby="care-summary-title">
            <div className="care-summary__price">
              <span>Po okresie wsparcia w pakiecie</span>
              <strong id="care-summary-title">Opieka i hosting</strong>
              <p><b>99 zł</b><small>/ miesiąc</small></p>
              <span>Opcjonalnie, po 30 lub 60 dniach wsparcia w cenie strony.</span>
            </div>
            <ul>
              <li><CheckMark /><span><strong>Hosting i monitoring</strong>Stała dostępność, kopie zapasowe i kontrola działania.</span></li>
              <li><CheckMark /><span><strong>Bezpieczeństwo</strong>Aktualizacje techniczne i reakcja na ewentualne błędy.</span></li>
              <li><CheckMark /><span><strong>Drobne zmiany</strong>Aktualizacja treści, oferty i wiedzy chatbota bez limitu zgłoszeń.</span></li>
            </ul>
            <p className="care-summary__scope">
              <strong>Jasna granica zakresu</strong>
              Nowe podstrony, funkcje i większe przebudowy wyceniamy osobno przed rozpoczęciem pracy.
            </p>
          </aside>

          <div className="mt-7 rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[#0F141C] p-5 sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[#8CD8FF]">W każdej z trzech stron</span>
                <h3 className="mt-2 text-[18px] font-extrabold tracking-[-0.025em] text-[#EAF0F7]">Podstawy, których nie musisz dokupować</h3>
                <p className="mt-2 text-[12.5px] leading-[1.65] text-[#7C879B]">
                  SEO, GEO i AEO są elementem wdrożenia strony, a nie osobną usługą w naszej ofercie.
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {includedInEveryWebsite.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-[#C4CFDC]">
                    <CheckMark />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <article id="automatyzacje" className="mt-7 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#10151D] p-6 sm:p-8 lg:p-10">
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
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[#6B7891]">Koszt wdrożenia</span>
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
              Wszystko, co warto wiedzieć przed startem
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
