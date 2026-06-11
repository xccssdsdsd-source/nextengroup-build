'use client'

import { m, useInView } from 'framer-motion'
import { Shield, Users, Settings2, Zap } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
const premiumSpring = { type: 'spring' as const, stiffness: 80, damping: 20, mass: 0.8 }

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
    y: 12,
    scale: 0.97,
    filter: 'blur(4px)',
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { ...premiumSpring },
  },
}

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
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="wartosci" ref={ref} className="section-shell relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <m.ul
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {values.map((value, idx) => {
            const Icon = value.Icon
            return (
              <m.li
                key={idx}
                custom={idx}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.04, boxShadow: '0 16px 48px rgba(37,99,235,0.12), 0 4px 16px rgba(0,0,0,0.06)', transition: { type: 'spring', stiffness: 260, damping: 25 } }}
                className="value-card group rounded-2xl p-5 sm:p-6 flex flex-col cursor-default"
                style={{ willChange: 'transform' }}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl animate-breathe transition-transform duration-200 group-hover:scale-110" style={{ background: 'rgba(37,99,235,0.08)', animationDelay: `${idx * 0.5}s` }}>
                  <Icon size={20} strokeWidth={1.8} style={{ color: '#2563EB' }} />
                </div>
                <h3 className="text-[0.975rem] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-snug transition-colors duration-200 group-hover:text-[#1D4ED8]" style={{ fontFamily: 'var(--font-syne)' }}>
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
