'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const steps = [
  {
    num: '01',
    title: 'Rozmowa i kierunek',
    desc: 'Analizujemy Twoją markę, konkurencję i cele biznesowe. Agenci AI przygotowują rekomendacje wstępne.',
  },
  {
    num: '02',
    title: 'Wizualizacja i strategie',
    desc: 'Tworzymy concept strony z użyciem automatycznych narzędzi AI. Przygotowujemy wstępne kopie i strukturę konwersji.',
  },
  {
    num: '03',
    title: 'Wdrożenie i optymalizacja',
    desc: 'Łączymy design, copywriting, AI-wspomagane testy A/B i technologię w spójny system. Agenci AI ciągle optymalizują.',
  },
  {
    num: '04',
    title: 'Start i ciągłe usprawnienia',
    desc: 'Publikujemy stronę z automatyzacją SEO i monitoringiem AI. Systematyczne ulepszenia bez interwencji.',
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
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px)',
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
          <span className="section-kicker" style={{ color: '#06B6D4' }}>Proces</span>
          <h2 className="section-title" style={{ color: '#F1F5F9' }}>Wspomagane przez AI, zautomatyzowane na całej długości.</h2>
          <p className="section-copy" style={{ color: '#CBD5E1' }}>
            Nasze agenty AI pracują na każdym etapie — od analizy do optymalizacji. Bez ręcznych błędów, bez opóźnień.
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
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-2xl border border-[#06B6D4]/30 bg-[#1E293B] p-7"
              style={{
                boxShadow: '0 1px 2px rgba(6,182,212,0.1), 0 4px 12px rgba(6,182,212,0.05)',
                transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(6,182,212,0.2), 0 12px 28px rgba(6,182,212,0.15)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(6,182,212,0.1), 0 4px 12px rgba(6,182,212,0.05)' }}
            >
              <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-gradient-to-b from-[#06B6D4] to-[#06B6D4]/20" />

              <div className="flex items-baseline gap-2 pl-1">
                <span className="font-bold leading-none tracking-[-0.06em] text-[#06B6D4]" style={{ fontFamily: 'var(--font-syne)', fontSize: '2.8rem' }}>{step.num}</span>
              </div>
              <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#06B6D4]/50 to-transparent" />
              <h3 className="mt-4 text-[1.1rem] font-bold tracking-[-0.03em] text-[#F1F5F9] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-7 text-[#64748B]">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
