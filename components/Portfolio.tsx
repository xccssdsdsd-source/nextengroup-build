'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" className="py-28 px-6" ref={ref}>
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
            Nasze prace
          </span>
          <h2 className="font-syne text-[clamp(36px,5vw,60px)] font-bold text-[#e8f0ff] tracking-[-0.03em] leading-tight">
            Realizacje / Portfolio
          </h2>
          <p
            className="text-[#4a6080] text-lg mt-3"
            style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
          >
            Projekty, z których jesteśmy dumni
          </p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <div
            className="px-16 py-12 text-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)' }}
            >
              <span className="text-2xl">✦</span>
            </div>
            <p
              className="text-[#4a6080] text-base"
              style={{ fontFamily: 'var(--font-figtree)', fontWeight: 400 }}
            >
              Realizacje wkrótce
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
