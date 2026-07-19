'use client'

import { useInView } from 'framer-motion'
import { Blocks, Gauge, ScanSearch, Workflow } from 'lucide-react'
import { useRef, type CSSProperties } from 'react'
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
    website: '30 lub 60 dni wsparcia w cenie; później opieka i hosting za 50 lub 99 zł/mies., zależnie od pakietu.',
    automation: 'Monitoring i rozwój wyceniamy według zakresu oraz kosztów używanych narzędzi lub modeli AI.',
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

        <ol className={`process-system ${inView ? 'is-in-view' : ''}`} aria-label="Etapy współpracy dla stron i automatyzacji">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={step.num} className="process-stage" style={{ '--process-delay': `${index * 90}ms` } as CSSProperties}>
                <div className="process-stage__index">
                  <span>{step.num}</span>
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <div className="process-stage__main">
                  <span className="process-stage__meta">{step.meta}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>

                <div className="process-stage__outputs">
                  <div className="process-output process-output--site">
                    <span>Strona</span>
                    <p>{step.website}</p>
                  </div>
                  <div className="process-output process-output--automation">
                    <span>Automatyzacja</span>
                    <p>{step.automation}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
