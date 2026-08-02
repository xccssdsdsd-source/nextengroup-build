'use client'

import { useInView } from 'framer-motion'
import { Blocks, Gauge, ScanSearch, Workflow } from 'lucide-react'
import { useRef } from 'react'
import SectionGlow from './ui/SectionGlow'

const steps = [
  {
    num: '01',
    meta: 'Diagnoza',
    title: 'Poznajemy cel i obecny sposób działania',
    desc: 'Na krótkiej rozmowie ustalamy, co ma się zmienić i po czym poznamy, że wdrożenie działa.',
    website: 'Oferta, odbiorcy, treści i najważniejsza ścieżka kontaktu.',
    icon: ScanSearch,
  },
  {
    num: '02',
    meta: 'Prototyp',
    title: 'Pokazujemy rozwiązanie przed pełnym wdrożeniem',
    desc: 'Najpierw dostajesz coś, co można zobaczyć i sprawdzić. Uwagi zbieramy na konkretnym materiale, nie na obietnicach.',
    website: 'Pierwszy kierunek wizualny zwykle w 24 godziny.',
    icon: Blocks,
  },
  {
    num: '03',
    meta: 'Wdrożenie',
    title: 'Budujemy i integrujemy',
    desc: 'Realizujemy zaakceptowany zakres, sprawdzamy scenariusze brzegowe i przygotowujemy rozwiązanie do codziennego użycia.',
    website: 'Mobile, formularze, analityka, szybkość oraz podstawy SEO, GEO i AEO.',
    icon: Workflow,
  },
  {
    num: '04',
    meta: 'Uruchomienie',
    title: 'Publikujemy i zapewniamy opiekę',
    desc: 'Po starcie obserwujemy działanie, usuwamy problemy i rozwijamy rozwiązanie wtedy, gdy firma tego potrzebuje.',
    website: '30 lub 60 dni wsparcia w cenie; później opieka i hosting od 29 do 99 zł/mies.',
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
          <h2 className="section-title max-w-[16ch]">Jak wygląda współpraca</h2>
          <p className="section-copy">
            Diagnoza, wdrażamy rozwiązanie przed pełnym wdrożeniem, budujemy i integrujemy. Publikujemy i zapewniamy opiekę.
          </p>
        </div>

        <ol className={`process-deck ${inView ? 'is-in-view' : ''}`} aria-label="Etapy współpracy">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <li key={step.num} className="process-card premium-card overview-card group">
                <span aria-hidden="true" className="overview-num pointer-events-none absolute right-5 top-3 select-none">{step.num}</span>

                {/* Sized to the longest title (4 lines) so the rails below line
                    up across the row regardless of how the copy wraps. */}
                <div className="flex items-start gap-3.5 lg:min-h-[126px]">
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

                {/* min-height keeps the "Strona" blocks on one line across the
                    row even though the descriptions run 3–4 lines. */}
                <p className="mt-4 text-[13.5px] leading-[1.65] text-[#A6B2C4] transition-colors duration-300 group-hover:text-[#C0CCDC] lg:min-h-[92px]">{step.desc}</p>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="process-output process-output--site">
                    <span>Strona</span>
                    <p>{step.website}</p>
                  </div>
                </div>

                <div className="mt-auto pt-5" aria-hidden="true">
                  <span className="process-divider-track"><span className="process-divider-fill" /></span>
                </div>

                <span className="process-shine" aria-hidden="true" />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
