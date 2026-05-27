'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import BackgroundPathsProcess from './BackgroundPathsProcess'

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
    <section id="proces" ref={ref} className="section-shell relative bg-white">
      <BackgroundPathsProcess />
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
          {steps.map((step) => <StepCard key={step.num} step={step} ease={ease} />)}
        </motion.div>
      </div>
    </section>
  )
}

function StepCard({ step, ease }: { step: typeof steps[0], ease: [number, number, number, number] }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
      whileHover={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border bg-white p-7 transition-all duration-200 will-change-auto ${
        isHovered ? 'border-[#2563EB] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_12px_24px_rgba(37,99,235,0.12)]' : 'border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_2px_8px_rgba(0,0,0,0.04)]'
      }`}
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
  )
}
