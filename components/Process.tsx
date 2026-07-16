'use client'

import { useInView } from 'framer-motion'
import { PhoneCall, LayoutTemplate, Rocket, ShieldCheck } from 'lucide-react'
import { useRef } from 'react'
import SectionGlow from './ui/SectionGlow'

const steps = [
  {
    num: '01',
    meta: 'Rozmowa',
    title: 'Bezpłatna, krótka rozmowa',
    desc: 'Poznajemy Twoją firmę, klientów i cele. Ustalamy kierunek i zakres projektu. Zero zobowiązań, zero presji.',
    icon: PhoneCall,
  },
  {
    num: '02',
    meta: 'Od 24h',
    title: 'Wizualizacja Twojej strony (od 24h)',
    desc: 'Widzisz pierwszy projekt swojej strony w ciągu doby. Realny wygląd, nie makieta. Zgłaszasz uwagi, my poprawiamy, aż będzie dobrze.',
    icon: LayoutTemplate,
  },
  {
    num: '03',
    meta: 'Od 72h',
    title: 'Wdrożenie (od 72h)',
    desc: 'Budujemy stronę szybką, responsywną i widoczną w Google. Płacisz dopiero teraz, gdy wszystko Cię przekonuje. Zero ryzyka po Twojej stronie.',
    icon: Rocket,
  },
  {
    num: '04',
    meta: 'Po starcie',
    title: 'Opieka po starcie',
    desc: 'Aktualizacje, bezpieczeństwo i poprawki na bieżąco. Ty zajmujesz się firmą, my stroną.',
    icon: ShieldCheck,
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
          <span className="section-kicker" suppressHydrationWarning>Proces</span>
          <h2 className="section-title" suppressHydrationWarning>Od pierwszej rozmowy do gotowej strony, krok po kroku</h2>
          <p className="section-copy">
            Ty poświęcasz minimum czasu. My prowadzimy Cię przez cały proces, od pomysłu do live&apos;a.
          </p>
        </div>

        <ol className={`process-deck ${inView ? 'is-in-view' : ''}`} aria-label="Etapy współpracy">
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
                    <span className="process-meta text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#6B7485]">{step.meta}</span>
                    <h3 className="mt-1 text-[1.2rem] font-bold tracking-[-0.03em] leading-tight text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-[14px] leading-[1.7] text-[#A6B2C4] transition-colors duration-300 group-hover:text-[#C0CCDC]">{step.desc}</p>

                <div className="mt-auto pt-6" aria-hidden="true">
                  <span className="process-divider-track"><span className="process-divider-fill" /></span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
