'use client'

import { motion, useInView } from 'framer-motion'
import { Shield, Users, Settings2, Zap } from 'lucide-react'
import { useRef } from 'react'

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

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 110, damping: 22 } },
}

export default function ValueProps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="wartosci" className="section-shell relative" data-no-entrance suppressHydrationWarning>
      <div className="relative mx-auto max-w-7xl">
        <motion.ul
          ref={ref}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {values.map((value, idx) => {
            const Icon = value.Icon
            return (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="value-card group rounded-2xl p-5 sm:p-6 flex flex-col cursor-default"
                style={{ position: 'relative' }}
                whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
              >
                <div className="tilt-glare" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 60%)', opacity: 0, zIndex: 1 }} />
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl animate-breathe transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14) 0%, rgba(14,116,144,0.14) 100%)', animationDelay: `${idx * 0.5}s` }}>
                  <Icon size={20} strokeWidth={1.8} style={{ color: '#22D3EE' }} />
                </div>
                <h3 className="text-[0.975rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-snug transition-colors duration-200 group-hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-syne)' }}>
                  {value.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-[#A6B2C4]">
                  {value.desc}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
