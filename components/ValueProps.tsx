'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const values = [
  {
    title: 'Zero ryzyka',
    desc: 'Wizualizacja za darmo. Płacisz dopiero, gdy projekt działa.',
  },
  {
    title: 'Pełne wsparcie',
    desc: 'Prowadzimy Cię krok po kroku. Ty określasz cel, my dostarczamy technologię.',
  },
  {
    title: 'Pod Twoją firmę',
    desc: 'Zrozumienie biznesu to podstawa. Budujemy to, co wspiera Twoją pracę.',
  },
  {
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
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {values.map((value, idx) => (
            <motion.article
              key={idx}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#2563EB] hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_12px_24px_rgba(37,99,235,0.12)] flex flex-col justify-center"
              style={{ background: 'var(--bg-card)' }}
            >
              <h3 className="text-[1rem] font-bold tracking-[-0.03em] text-[var(--text)]" style={{ fontFamily: 'var(--font-syne)' }}>
                {value.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                {value.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
