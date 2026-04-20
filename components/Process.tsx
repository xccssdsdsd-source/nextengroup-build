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
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Proces</span>
          <h2 className="section-title">Szybko, jasno i bez chaosu po drodze.</h2>
          <p className="section-copy">
            Krótko, konkretnie i bez zbędnych rund. Od rozmowy do gotowej strony.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4" style={{ perspective: '1200px' }}>
          {steps.map((step, index) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 36, rotateX: 7, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.82, delay: index * 0.1, ease }}
              className="glass rounded-[28px] p-7 transition-[border-color,box-shadow] duration-300 hover:border-white/16 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2),inset_0_0_32px_rgba(0,100,220,0.06),0_40px_80px_rgba(0,0,0,0.38),0_10px_28px_rgba(0,0,0,0.22)]"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-syne text-[32px] font-bold leading-none tracking-[-0.04em] text-[#00d4ff]/40 drop-shadow-[0_0_12px_rgba(0,212,255,0.3)]">{step.num}</span>
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
