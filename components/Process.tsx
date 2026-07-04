'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

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
    title: 'Bezpłatna rozmowa (30 minut)',
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
          variants={containerVariants}
          initial={false}
          animate="show"
        >
          {steps.map((step) => <StepCard key={step.num} step={step} />)}
        </m.div>

        <m.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
        >
          <a
            href="/#kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0_8px_24px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Umów bezpłatną rozmowę
          </a>
          <a
            href="/#portfolio"
            className="inline-flex items-center justify-center gap-2 text-[14px] font-medium text-[#A6B2C4] transition-colors duration-200 hover:text-[#EAF0F7]"
          >
            Najpierw zobacz nasze realizacje →
          </a>
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
      <div className="step-number animate-float" style={{ animationDelay: `${parseInt(step.num, 10) * 0.8}s` }}>
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

