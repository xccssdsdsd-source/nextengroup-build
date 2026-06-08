'use client'

import { m, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const values = [
  {
    num: '01',
    title: 'Zero ryzyka',
    desc: 'Wizualizacja za darmo. Płacisz dopiero, gdy projekt działa.',
  },
  {
    num: '02',
    title: 'Pełne wsparcie',
    desc: 'Prowadzimy Cię krok po kroku. Ty określasz cel, my dostarczamy technologię.',
  },
  {
    num: '03',
    title: 'Pod Twoją firmę',
    desc: 'Zrozumienie biznesu to podstawa. Budujemy to, co wspiera Twoją pracę.',
  },
  {
    num: '04',
    title: 'Szybkie tempo',
    desc: 'Pierwsza koncepcja w 24 godziny. Sprawna i bezproblemowa realizacja.',
  },
]

export default function ValueProps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="wartosci" ref={ref} className="section-shell relative">
      <div className="relative mx-auto max-w-7xl">
        <m.ul
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {values.map((value, idx) => (
            <m.li
              key={idx}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
              className="value-card rounded-2xl p-5 sm:p-6 flex flex-col"
            >
              <span className="text-[11px] font-bold tabular-nums tracking-[0.14em] text-[#2563eb]/50 mb-3" style={{ fontFamily: 'var(--font-syne)' }}>
                {value.num}
              </span>
              <h3 className="text-[0.975rem] font-bold tracking-[-0.03em] text-[var(--text)] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {value.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-[var(--text-secondary)]">
                {value.desc}
              </p>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
