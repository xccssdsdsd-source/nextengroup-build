'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const steps = [
  {
    num: '01',
    title: 'Rozmowa i kierunek',
    desc: 'Ustalamy ofertę, priorytety i to, co realnie ma sprzedawać.',
  },
  {
    num: '02',
    title: 'Wizualizacja w 24h',
    desc: 'Pokazujemy pierwszą koncepcję bez przeciągania procesu.',
  },
  {
    num: '03',
    title: 'Wdrożenie i dopracowanie',
    desc: 'Składamy design, copy, CTA i technikę w jeden spójny system.',
  },
  {
    num: '04',
    title: 'Start i optymalizacja',
    desc: 'Publikujemy stronę i porządkujemy kolejne usprawnienia.',
  },
] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      id="proces"
      ref={ref}
      className="section-shell border-y border-neutral-100 bg-[#F7F8FA]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Proces</span>
          <h2 className="section-title">Szybko, jasno i bez chaosu po drodze.</h2>
          <p className="section-copy">
            Krótko, konkretnie i bez zbędnych rund. Od rozmowy do gotowej strony.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {steps.map((step, index) => (
            <motion.article
              key={step.num}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/60"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-syne text-[32px] font-bold leading-none tracking-[-0.04em] text-[#0EA5E9]">{step.num}</span>
                <span className="text-[10px] uppercase tracking-[0.26em] text-[#6B7280]">Etap</span>
              </div>
              <div className="mt-2 h-0.5 w-8 rounded-full bg-[#0EA5E9]/30" />
              <h3 className="mt-4 text-xl font-bold tracking-[-0.04em] text-[#0A0A0A] leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6B7280] sm:text-[15px]">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
