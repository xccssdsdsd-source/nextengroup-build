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
    <section
      id="proces"
      ref={ref}
      className="section-shell border-y border-white/6 bg-white/[0.02]"
    >
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Proces</span>
          <h2 className="section-title">Szybko, jasno i bez chaosu po drodze.</h2>
          <p className="section-copy">
            Krótko, konkretnie i bez zbędnych rund. Od rozmowy do gotowej strony.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease }}
              className="glass rounded-[28px] p-7 transition-[border-color] duration-300 hover:border-white/14"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-syne text-[28px] font-bold leading-none tracking-[-0.04em] text-[#00d4ff]/30">{step.num}</span>
                <span className="text-[10px] uppercase tracking-[0.26em] text-[#79edff]">Etap</span>
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.04em] text-white leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#92acce] sm:text-[15px]">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
