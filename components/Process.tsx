'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]

const steps = [
  { num: '01', title: 'Konsultacja', desc: 'Bezpłatna rozmowa o Twojej firmie, celach i potrzebach.' },
  { num: '02', title: 'Wizualizacja 24h', desc: 'Kompletny projekt wizualny strony w ciągu jednego dnia roboczego.' },
  { num: '03', title: 'Wdrożenie', desc: 'Kodujemy i wdrażamy gotową stronę z pełną integracją.' },
  { num: '04', title: 'Rozwój', desc: 'Optymalizacja, nowe funkcje i wsparcie techniczne po starcie.' },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="py-28 px-6 relative"
      ref={ref}
      style={{
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span
            className="text-xs text-[#00d4ff] tracking-[0.2em] uppercase mb-3 block"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            Jak działamy
          </span>
          <h2 className="font-syne text-[clamp(36px,5vw,60px)] font-bold text-[#e8f0ff] tracking-[-0.03em] leading-tight">
            Proces
          </h2>
        </motion.div>

        <div className="relative flex flex-col md:flex-row gap-0">
          <div
            className="hidden md:block absolute top-9 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 15%, rgba(255,255,255,0.08) 85%, transparent)' }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative flex-1 flex flex-col items-center text-center px-6 pb-0 pt-0 md:pt-0"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
            >
              <motion.div
                className="relative z-10 w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 group"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
                whileHover={{
                  boxShadow: '0 0 0 4px rgba(0,212,255,0.15), 0 4px 24px rgba(0,212,255,0.2)',
                  borderColor: 'rgba(0,212,255,0.5)',
                }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="font-barlow text-2xl text-[#e8f0ff] leading-none"
                  style={{ fontWeight: 900 }}
                >
                  {step.num}
                </span>
              </motion.div>

              <h3
                className="font-syne text-lg font-bold text-[#e8f0ff] tracking-[-0.02em] mb-2"
                style={{ fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p
                className="text-[#4a6080] text-sm leading-[1.7]"
                style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
