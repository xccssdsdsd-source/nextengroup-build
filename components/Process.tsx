'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
const BackgroundPathsProcess = dynamic(() => import('./BackgroundPathsProcess'), { ssr: false })

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
    title: 'Rozmowa i dostosowanie',
    desc: 'Poznajemy Twoją markę, cele i to, co ma naprawdę działać. Na tej podstawie definiujemy kierunek projektu i grupę odbiorców, do których chcesz trafić.',
  },
  {
    num: '02',
    title: 'Projekt i strategia',
    desc: 'Projektujemy stronę tak, żeby każdy element skłaniał do działania. Układ, treść i przyciski mają jeden cel: zamieniać wejście w kontakt.',
  },
  {
    num: '03',
    title: 'Wdrożenie',
    desc: 'Budujemy stronę szybką, dopracowaną na każdym urządzeniu i połączoną z narzędziami, których już używasz. Konfigurujemy widoczność w Google i oddajemy gotowy projekt z pełną dokumentacją.',
  },
  {
    num: '04',
    title: 'Opieka i wsparcie',
    desc: 'Wspieramy Cię po starcie. Regularne aktualizacje, bezpieczeństwo i poprawki na bieżąco, żebyś mógł skupić się na swoim biznesie.',
  },
] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="proces" ref={ref} className="section-shell relative" data-no-entrance suppressHydrationWarning>
      <BackgroundPathsProcess />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>Proces</span>
          <h2 className="section-title" suppressHydrationWarning>Prosto od konsultacji do wsparcia</h2>
          <p className="section-copy">
            Cztery etapy, które przeniosą Twoją ideę w działającą stronę. Wszystko w jednym miejscu, bez komplikacji.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial={false}
          animate="show"
        >
          {steps.map((step) => <StepCard key={step.num} step={step} />)}
        </motion.div>
      </div>
    </section>
  )
}

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <motion.article
      variants={stepVariants}
      whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(34,211,238,0.4)', boxShadow: '0 1px 3px rgba(0,0,0,0.45), 0 12px 32px rgba(34,211,238,0.18)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="step-card group relative overflow-hidden rounded-2xl border border-[var(--border)] p-5 sm:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.45),_0_2px_8px_rgba(0,0,0,0.4)]"
      style={{ background: 'var(--bg-card)', willChange: 'transform' }}
    >
      <div className="step-number animate-float" style={{ animationDelay: `${parseInt(step.num, 10) * 0.8}s` }}>
        {step.num}
      </div>

      <h3 className="mt-5 text-[1.05rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
        {step.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.72] text-[var(--text-secondary)]">
        {step.desc}
      </p>
    </motion.article>
  )
}
