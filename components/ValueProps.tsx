'use client'

import { m, useInView } from 'framer-motion'
import { Shield, Users, Settings2, Zap } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const values = [
  {
    num: '01',
    title: 'Zero ryzyka',
    desc: 'Wizualizacja za darmo. Płacisz dopiero, gdy projekt działa.',
    Icon: Shield,
  },
  {
    num: '02',
    title: 'Pełne wsparcie',
    desc: 'Prowadzimy Cię krok po kroku. Ty określasz cel, my dostarczamy technologię.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Pod Twoją firmę',
    desc: 'Zrozumienie biznesu to podstawa. Budujemy to, co wspiera Twoją pracę.',
    Icon: Settings2,
  },
  {
    num: '04',
    title: 'Szybkie tempo',
    desc: 'Pierwsza koncepcja w 24 godziny. Sprawna i bezproblemowa realizacja.',
    Icon: Zap,
  },
]

export default function ValueProps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="wartosci" ref={ref} className="section-shell relative">
      <div className="relative mx-auto max-w-7xl">
        <m.ul
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {values.map((value, idx) => {
            const Icon = value.Icon
            return (
              <m.li
                key={idx}
                variants={{ hidden: { opacity: 0, y: 28, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } } }}
                className="value-card rounded-2xl p-5 sm:p-6 flex flex-col"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(37,99,235,0.08)' }}>
                  <Icon size={20} strokeWidth={1.8} style={{ color: '#2563EB' }} />
                </div>
                <h3 className="text-[0.975rem] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                  {value.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-[#555555]">
                  {value.desc}
                </p>
              </m.li>
            )
          })}
        </m.ul>
      </div>
    </section>
  )
}
