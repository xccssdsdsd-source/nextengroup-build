'use client'

import { useInView } from 'framer-motion'
import { Blocks, ChevronsLeft, ChevronsRight, Gauge, ScanSearch, Workflow } from 'lucide-react'
import { useRef } from 'react'
import SectionGlow from './ui/SectionGlow'

const steps = [
  {
    num: '01',
    meta: 'Diagnoza',
    title: 'Poznajemy cel i obecny sposób działania',
    desc: 'Na krótkiej rozmowie ustalamy, co ma się zmienić i po czym poznamy, że wdrożenie działa.',
    website: 'Oferta, odbiorcy, treści i najważniejsza ścieżka kontaktu.',
    automation: 'Proces dziś, ręczne kroki, wyjątki i używane narzędzia.',
    icon: ScanSearch,
  },
  {
    num: '02',
    meta: 'Prototyp',
    title: 'Pokazujemy rozwiązanie przed pełnym wdrożeniem',
    desc: 'Najpierw dostajesz coś, co można zobaczyć i sprawdzić. Uwagi zbieramy na konkretnym materiale, nie na obietnicach.',
    website: 'Pierwszy kierunek wizualny zwykle w 24 godziny.',
    automation: 'Schemat działania i demo kluczowego scenariusza w kilka dni.',
    icon: Blocks,
  },
  {
    num: '03',
    meta: 'Wdrożenie',
    title: 'Budujemy, integrujemy i testujemy',
    desc: 'Realizujemy zaakceptowany zakres, sprawdzamy scenariusze brzegowe i przygotowujemy rozwiązanie do codziennego użycia.',
    website: 'Mobile, formularze, analityka, szybkość oraz podstawy SEO, GEO i AEO.',
    automation: 'Integracje, reguły, uprawnienia, obsługa błędów i monitoring procesu.',
    icon: Workflow,
  },
  {
    num: '04',
    meta: 'Uruchomienie',
    title: 'Publikujemy, mierzymy i zapewniamy opiekę',
    desc: 'Po starcie obserwujemy działanie, usuwamy problemy i rozwijamy rozwiązanie wtedy, gdy firma tego potrzebuje.',
    website: '30 lub 60 dni wsparcia w cenie; później opieka i hosting od 29 do 99 zł/mies.',
    automation: 'Monitoring i rozwój wyceniamy według zakresu oraz kosztów narzędzi lub modeli AI.',
    icon: Gauge,
  },
] as const

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proces" ref={ref} className="section-shell relative" data-no-entrance suppressHydrationWarning>
      <SectionGlow variant="process" />
      <div className="relative mx-auto max-w-7xl">
        <div className="section-heading">
          <span className="section-kicker">Proces współpracy</span>
          <h2 className="section-title max-w-[16ch]">Jeden proces. Dwa rodzaje wdrożeń.</h2>
          <p className="section-copy">
            Strona i automatyzacja wymagają innych narzędzi, ale tej samej dyscypliny: najpierw diagnoza, potem działający prototyp, testy i opieka po starcie.
          </p>
        </div>

        <div className="process-legend" aria-label="Legenda procesu">
          <span><i className="process-legend__site" /> Strona internetowa</span>
          <span><i className="process-legend__automation" /> Automatyzacja</span>
        </div>

        <ol className={`process-deck ${inView ? 'is-in-view' : ''}`} aria-label="Etapy współpracy dla stron i automatyzacji">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <li key={step.num} className="process-card premium-card overview-card group">
                <span aria-hidden="true" className="overview-num pointer-events-none absolute right-5 top-3 select-none">{step.num}</span>

                <div className="flex items-center gap-3.5">
                  <span className="overview-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[rgba(58,175,232,0.25)]" style={{ background: 'rgba(58,175,232,0.08)' }}>
                    <Icon size={22} strokeWidth={1.8} className="text-[#8CD8FF]" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="process-meta text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#8A96A8]">{step.meta}</span>
                    <h3 className="mt-1 text-[1.2rem] font-bold tracking-[-0.03em] leading-tight text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-[13.5px] leading-[1.65] text-[#A6B2C4] transition-colors duration-300 group-hover:text-[#C0CCDC]">{step.desc}</p>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="process-output process-output--site">
                    <span>Strona</span>
                    <p>{step.website}</p>
                  </div>
                  <div className="process-output process-output--automation">
                    <span>Automatyzacja</span>
                    <p>{step.automation}</p>
                  </div>
                </div>

                <div className="mt-auto pt-5" aria-hidden="true">
                  <span className="process-divider-track"><span className="process-divider-fill" /></span>
                </div>

                <span className="process-shade" aria-hidden="true" />
                <span className="process-shine" aria-hidden="true" />
              </li>
            )
          })}
        </ol>

        <div className="process-hint" aria-hidden="true">
          <ChevronsLeft size={13} strokeWidth={2.2} className="process-hint-chev process-hint-chev--left" />
          <span>Najedź na karty, aby zobaczyć kolejne kroki</span>
          <ChevronsRight size={13} strokeWidth={2.2} className="process-hint-chev process-hint-chev--right" />
        </div>
      </div>
    </section>
  )
}
