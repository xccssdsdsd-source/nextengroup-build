'use client'

import { m, useInView } from 'framer-motion'
import { Shield, Users, Settings2, Zap } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const premiumSpring = { type: 'spring' as const, stiffness: 120, damping: 24 }

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
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
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="wartosci" ref={ref} className="section-shell relative">
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
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
                className="value-card group rounded-2xl p-5 sm:p-6 flex flex-col cursor-default"
                style={{ willChange: 'transform' }}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl animate-breathe transition-transform duration-200 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.10) 0%, rgba(79,70,229,0.10) 100%)', animationDelay: `${idx * 0.5}s` }}>
                  <Icon size={20} strokeWidth={1.8} style={{ color: '#4F46E5' }} />
                </div>
                <h3 className="text-[0.975rem] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-snug transition-colors duration-200 group-hover:text-[#2563EB]" style={{ fontFamily: 'var(--font-syne)' }}>
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
