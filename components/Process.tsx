'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import BackgroundPathsProcess from './BackgroundPathsProcess'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
    <section id="proces" ref={ref} className="section-shell relative">
      <BackgroundPathsProcess />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <m.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Proces</span>
          <h2 className="section-title">Prosto od konsultacji do wsparcia</h2>
          <p className="section-copy">
            Cztery etapy, które przeniosą Twoją ideę w działającą stronę. Wszystko w jednym miejscu, bez komplikacji.
          </p>
        </m.div>

        <m.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {steps.map((step) => <StepCard key={step.num} step={step} ease={ease} />)}
        </m.div>
      </div>
    </section>
  )
}

function StepCard({ step, ease }: { step: (typeof steps)[number], ease: [number, number, number, number] }) {
  return (
    <m.article
      variants={{ hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } } }}
      whileHover={{ y: -4, borderColor: '#93b4f8', boxShadow: '0 1px 3px rgba(13,22,41,0.06), 0 8px 24px rgba(37,99,235,0.12)' }}
      transition={{ duration: 0.22, ease }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] p-5 sm:p-7 shadow-[0_1px_2px_rgba(13,22,41,0.05),_0_2px_8px_rgba(13,22,41,0.04)]"
      style={{ background: 'var(--bg-card)', willChange: 'transform' }}
    >
      <div className="step-number">
        {step.num}
      </div>

      <h3 className="mt-5 text-[1.05rem] font-bold tracking-[-0.03em] text-[var(--text)] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
        {step.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.72] text-[var(--text-secondary)]">
        {step.desc}
      </p>
    </m.article>
  )
}
