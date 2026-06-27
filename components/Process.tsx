'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const premiumSpring = { type: 'spring' as const, stiffness: 120, damping: 24 }

const containerVariants = {
  show: { transition: { staggerChildren: 0.12 } },
}

const stepVariants = {
  show: { opacity: 1, y: 0, scale: 1, transition: { ...premiumSpring } },
}

const steps = [
  {
    num: '01',
    badge: '24h',
    title: 'Bezpłatna konsultacja i wizualizacja',
    desc: 'Poznajemy Twoje cele i przygotowujemy bezpłatną wizualizację strony — widzisz efekt, zanim cokolwiek zapłacisz. Bez zobowiązań i bez presji.',
  },
  {
    num: '02',
    badge: '2–5 dni',
    title: 'Projekt i wycena bez niespodzianek',
    desc: 'Dostajesz stałą, konkretną kwotę z góry — bez ukrytych kosztów. Projektujemy każdy element pod jeden cel: zamieniać wejścia w zapytania. Poprawki bez limitu, aż będziesz w pełni zadowolony.',
  },
  {
    num: '03',
    badge: 'wg zakresu',
    title: 'Wdrożenie i integracje',
    desc: 'Budujemy stronę szybką i dopracowaną na każdym urządzeniu, połączoną z narzędziami, których już używasz. Konfigurujemy widoczność w Google i AI — przy minimum pracy po Twojej stronie.',
  },
  {
    num: '04',
    badge: 'ciągłe',
    title: 'Opieka i rozwój',
    desc: 'Wspieramy Cię po starcie. Aktualizacje, bezpieczeństwo i poprawki na bieżąco — Ty skupiasz się na biznesie, my dbamy o resztę.',
  },
] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="proces" ref={ref} className="section-shell relative" data-no-entrance suppressHydrationWarning>
      <div className="relative mx-auto max-w-7xl">
        <m.div
          className="section-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>Proces</span>
          <h2 className="section-title" suppressHydrationWarning>Prosto od konsultacji do wsparcia</h2>
          <p className="section-copy">
            Cztery jasne etapy — bez ryzyka i bez niespodzianek. Wizualizację widzisz w 24h, a płacisz dopiero za efekt, który zaakceptujesz.
          </p>
        </m.div>

        <m.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial={false}
          animate="show"
        >
          {steps.map((step) => <StepCard key={step.num} step={step} />)}
        </m.div>

        <m.div
          className="mt-12 flex flex-col items-center gap-3"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); scrollToSection('kontakt') }}
            className="btn btn-primary inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold"
          >
            Umów bezpłatną konsultację
          </a>
          <span className="text-[13px] text-[var(--text-secondary)]">
            Odpowiadamy w ciągu 24 godzin · bez zobowiązań
          </span>
        </m.div>
      </div>
    </section>
  )
}

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <m.article
      variants={stepVariants}
      whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(34,211,238,0.4)', boxShadow: '0 1px 3px rgba(0,0,0,0.45), 0 12px 32px rgba(34,211,238,0.18)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="step-card group relative overflow-hidden rounded-2xl border border-[var(--border)] p-5 sm:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.45),_0_2px_8px_rgba(0,0,0,0.4)]"
      style={{ background: 'var(--bg-card)', willChange: 'transform' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="step-number animate-float" style={{ animationDelay: `${parseInt(step.num, 10) * 0.8}s` }}>
          {step.num}
        </div>
        <span className="mt-1 inline-flex items-center rounded-full border border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.08)] px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em] text-[#22D3EE] whitespace-nowrap">
          {step.badge}
        </span>
      </div>

      <h3 className="mt-5 text-[1.05rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
        {step.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.72] text-[var(--text-secondary)]">
        {step.desc}
      </p>
    </m.article>
  )
}

