'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const steps = [
  {
    num: '01',
    title: 'Rozmowa i dostosowanie',
    desc: 'Poznajemy Twoją markę, cele biznesowe i konkretne potrzeby. Razem definiujemy kierunek projektu, docelową grupę odbiorcy oraz mierniki sukcesu dostosowane do Twojego biznesu. To jest fundament całego procesu.',
  },
  {
    num: '02',
    title: 'Projekt i strategia',
    desc: 'Tworzymy nowoczesny design interfejsu oraz strategię konwersji opartą na dobrych praktykach UX/UI. Każdy element zaplanowany z myślą o wyniku biznesowym i doświadczeniu użytkownika.',
  },
  {
    num: '03',
    title: 'Wdrożenie',
    desc: 'Budujemy responsywną stronę na najnowszych technologiach, optymalizujemy SEO, integrujemy niezbędne narzędzia i systemy. Gotowo, bezpiecznie i z pełną dokumentacją.',
  },
  {
    num: '04',
    title: 'Opieka i wsparcie',
    desc: 'Wspieramy Cię po starcie projektu. Regularne aktualizacje, poprawki bezpieczeństwa i ciągłe ulepszenia oparte na analizie danych użytkowników.',
  },
] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proces" ref={ref} className="section-shell bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 60%)' }}
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
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
              className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-7 transition-all duration-300"
              style={{
                boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.06), 0 12px 24px rgba(37,99,235,0.12)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#2563EB'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'
              }}
            >
              <div className="text-[2.4rem] font-black tracking-[-0.03em] text-[#2563EB]" style={{ fontFamily: 'var(--font-syne)' }}>
                {step.num}
              </div>

              <h3 className="mt-4 text-[1.1rem] font-bold tracking-[-0.03em] text-[#0A0A0F] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#6b7280]">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
