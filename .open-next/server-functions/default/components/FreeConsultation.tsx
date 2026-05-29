'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function FreeConsultation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="konsultacja" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Bezpłatna konsultacja</span>
          <h2 className="section-title">Konsultacja AI — zupełnie za darmo</h2>
          <p className="section-copy">
            Nie musisz podejmować decyzji od razu. Umów się na bezpłatną 15-minutową rozmowę i sprawdź, jak AI może rzeczywiście wspomóc Twój biznes.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <Link href="#kontakt" className="btn btn-primary">
            Umów
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
