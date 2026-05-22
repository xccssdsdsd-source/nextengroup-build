'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const steps = [
  {
    num: '01',
    title: 'Rozmowa i dostosowanie',
    desc: 'Poznajemy Twoją markę, cele i potrzeby. Razem definiujemy kierunek projektu dostosowany do biznesu.',
  },
  {
    num: '02',
    title: 'Projekt i strategia',
    desc: 'Tworzymy design i strategię konwersji. Każdy element zaplanowany z myślą o wyniku.',
  },
  {
    num: '03',
    title: 'Wdrożenie',
    desc: 'Budujemy stronę, optymalizujemy SEO i integrujemy narzędzia. Gotowo i bezpiecznie.',
  },
  {
    num: '04',
    title: 'Opieka i wsparcie',
    desc: 'Wspieramy Cię po starcie. Aktualizacje, poprawki i ciągłe ulepszenia.',
  },
] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proces" ref={ref} className="section-shell bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,85,255,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Proces</span>
          <h2 className="section-title">Prosto od konsultacji do wsparcia</h2>
          <p className="section-copy">
            Cztery etapy, które przeniosą Twoją ideę w działającą stronę. Wszystko w jednym miejscu, bez komplikacji.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {steps.map((step) => (
            <motion.article
              key={step.num}
              variants={{ hidden: { opacity: 0, y: 32, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } } }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
              className="group relative overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white p-7 transition-all duration-300"
              style={{
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,85,255,0.1)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#CCDAFF'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB'
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: 'linear-gradient(90deg, #0055FF, #0055FF99)' }}
              />

              <div className="text-[2.4rem] font-black tracking-[-0.06em] text-[#0055FF]" style={{ fontFamily: 'var(--font-syne)' }}>
                {step.num}
              </div>

              <h3 className="mt-4 text-[1.1rem] font-bold tracking-[-0.03em] text-[#0A0A0A] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#6B7280]">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
