'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionGlow from './ui/SectionGlow'

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1]

const steps = [
  {
    num: '01',
    meta: 'Rozmowa',
    title: 'Bezpłatna, krótka rozmowa',
    desc: 'Poznajemy Twoją firmę, klientów i cele. Ustalamy kierunek i zakres projektu. Zero zobowiązań, zero presji.',
  },
  {
    num: '02',
    meta: 'Od 24h',
    title: 'Wizualizacja Twojej strony (od 24h)',
    desc: 'Widzisz pierwszy projekt swojej strony w ciągu doby. Realny wygląd, nie makieta. Zgłaszasz uwagi, my poprawiamy, aż będzie dobrze.',
  },
  {
    num: '03',
    meta: 'Od 72h',
    title: 'Wdrożenie (od 72h)',
    desc: 'Budujemy stronę szybką, responsywną i widoczną w Google. Płacisz dopiero teraz, gdy wszystko Cię przekonuje. Zero ryzyka po Twojej stronie.',
  },
  {
    num: '04',
    meta: 'Po starcie',
    title: 'Opieka po starcie',
    desc: 'Aktualizacje, bezpieczeństwo i poprawki na bieżąco. Ty zajmujesz się firmą, my stroną.',
  },
] as const

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065 } },
}

const stepVariants = {
  hidden: { opacity: 0, transform: 'translate3d(0, 30px, 0) scale(0.985)', filter: 'blur(7px)' },
  show: { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)', transition: { duration: 0.76, ease } },
}

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

        <m.ol
          className={`process-journey ${inView ? 'is-in-view' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {steps.map((step) => (
            <m.li key={step.num} variants={stepVariants} className="process-step">
              <div className="process-marker" aria-hidden="true">
                <span>{step.num}</span>
              </div>
              <div className="process-step-copy">
                <span className="process-meta">{step.meta}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              <span className="process-arrow" aria-hidden="true">↗</span>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  )
}
