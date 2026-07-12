'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionGlow from './ui/SectionGlow'

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
    title: 'Bezpłatna, krótka rozmowa',
    desc: 'Poznajemy Twoją firmę, klientów i cele. Ustalamy kierunek i zakres projektu. Zero zobowiązań, zero presji.',
  },
  {
    num: '02',
    title: 'Wizualizacja Twojej strony (od 24h)',
    desc: 'Widzisz pierwszy projekt swojej strony w ciągu doby. Realny wygląd, nie makieta. Zgłaszasz uwagi, my poprawiamy, aż będzie dobrze.',
  },
  {
    num: '03',
    title: 'Wdrożenie (od 72h)',
    desc: 'Budujemy stronę szybką, responsywną i widoczną w Google. Płacisz dopiero teraz, gdy wszystko Cię przekonuje. Zero ryzyka po Twojej stronie.',
  },
  {
    num: '04',
    title: 'Opieka po starcie',
    desc: 'Aktualizacje, bezpieczeństwo i poprawki na bieżąco. Ty zajmujesz się firmą, my stroną.',
  },
] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="proces" ref={ref} className="section-shell relative" data-no-entrance suppressHydrationWarning>
      <SectionGlow variant="process" />
      <div className="relative mx-auto max-w-7xl">
        <m.div
          className="section-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>Proces</span>
          <h2 className="section-title" suppressHydrationWarning>Od pierwszej rozmowy do gotowej strony, krok po kroku</h2>
          <p className="section-copy">
            Ty poświęcasz minimum czasu. My prowadzimy Cię przez cały proces, od pomysłu do live&apos;a.
          </p>
        </m.div>

        <m.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          data-stagger-group
          variants={containerVariants}
          initial={false}
          animate="show"
        >
          {steps.map((step) => <StepCard key={step.num} step={step} />)}
        </m.div>

        {/* CTA removed from Process section to reduce action noise per design brief */}
      </div>
    </section>
  )
}

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <m.article
      variants={stepVariants}
      whileHover={{ y: -4, scale: 1.005, borderColor: 'rgba(190,220,230,0.16)', boxShadow: '0 1px 2px rgba(0,0,0,0.42), 0 18px 46px rgba(0,0,0,0.34)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="premium-card step-card group relative overflow-hidden rounded-lg border-l-2 border-[var(--border)] border-l-[rgba(34,211,238,0.35)] p-5 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_1px_2px_rgba(0,0,0,0.45),_0_2px_8px_rgba(0,0,0,0.4)]"
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0) 34%), var(--bg-card)', willChange: 'transform' }}
    >
      <div className="step-number">
        {step.num}
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

