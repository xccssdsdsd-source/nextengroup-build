'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const values = [
  {
    icon: '🎯',
    title: 'Zero ryzyka',
    desc: 'Najpierw robimy wizualizację Twojej strony za darmo. Płacisz dopiero wtedy, gdy wszystko działa tak jak ma.',
  },
  {
    icon: '🤝',
    title: 'Nie zostajesz z tym sam',
    desc: 'Prowadzimy Cię przez cały proces krok po kroku. Nie musisz znać się na technologii. Mówisz czego potrzebujesz, resztę bierzemy na siebie.',
  },
  {
    icon: '⚙️',
    title: 'Pod Twoją firmę',
    desc: 'Najpierw rozumiemy jak działa Twój biznes i skąd masz klientów. Dopiero potem budujemy stronę, która pasuje do tego jak naprawdę pracujesz.',
  },
  {
    icon: '⚡',
    title: 'Szybko',
    desc: 'Pierwszą wizualizację widzisz zwykle w 24 godziny. Nie przeciągamy procesu i nie znikamy po drodze.',
  },
]

export default function ValueProps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="wartosci" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
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
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#2563EB] hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_12px_24px_rgba(37,99,235,0.12)]"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="text-3xl mb-4">{value.icon}</div>
              <h3 className="text-[1rem] font-bold tracking-[-0.03em] text-[var(--text)]" style={{ fontFamily: 'var(--font-syne)' }}>
                {value.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                {value.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
