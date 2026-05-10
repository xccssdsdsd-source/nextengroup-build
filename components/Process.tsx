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
      className="section-shell relative"
      style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

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
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {steps.map((step) => (
            <motion.article
              key={step.num}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-7"
              style={{
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)' }}
            >
              <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-gradient-to-b from-[#0EA5E9] to-[#0EA5E9]/20" />

              <div className="flex items-baseline gap-2 pl-1">
                <span className="font-bold leading-none tracking-[-0.06em] text-[#0EA5E9]" style={{ fontFamily: 'var(--font-syne)', fontSize: '2.8rem' }}>{step.num}</span>
              </div>
              <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#0EA5E9]/50 to-transparent" />
              <h3 className="mt-4 text-[1.1rem] font-bold tracking-[-0.03em] text-[#0A0A0A] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-7 text-[#6B7280]">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
