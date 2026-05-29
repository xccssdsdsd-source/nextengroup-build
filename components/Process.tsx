'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import BackgroundPathsProcess from './BackgroundPathsProcess'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const steps = [
  {
    num: '01',
    title: 'Rozmowa i dostosowanie',
    desc: 'Poznajemy Twoją markę, cele biznesowe i konkretne potrzeby. Razem definiujemy kierunek projektu, docelową grupę odbiorcy oraz mierniki sukcesu dostosowane do Twojego biznesu. To jest fundament całego procesu. Dzięki temu wiemy dokładnie co budować.',
  },
  {
    num: '02',
    title: 'Projekt i strategia',
    desc: 'Projektujemy stronę tak żeby klienci rzeczywiście podejmowali działania. Każdy przycisk, każdy tekst, każde zdjęcie ma być na miejscu. Działa to.',
  },
  {
    num: '03',
    title: 'Wdrożenie',
    desc: 'Budujemy stronę szybką, na każdym urządzeniu, i wszystko ustawiamy żeby znalazł Cię Google. Powiązujemy to ze swoimi narzędziami. Gotowo, bezpiecznie i z pełną dokumentacją.',
  },
  {
    num: '04',
    title: 'Opieka i wsparcie',
    desc: 'Wspieramy Cię po starcie projektu. Regularne aktualizacje, poprawki bezpieczeństwa i ciągłe ulepszenia oparte na tym jak rzeczywiście działa Twój biznes.',
  },
] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proces" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
      <BackgroundPathsProcess />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)' }}
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

function StepCard({ step, ease }: { step: (typeof steps)[number], ease: [number, number, number, number] }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border bg-white p-5 sm:p-7 transition-[border-color,box-shadow] duration-200 ${
        isHovered ? 'border-[#2563EB] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_12px_24px_rgba(37,99,235,0.12)]' : 'border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_2px_8px_rgba(0,0,0,0.04)]'
      }`}
      style={{ background: 'var(--bg-card)' }}
    >
      <div className="text-[2.6rem] font-black tracking-[-0.03em]" style={{ color: 'var(--accent)', fontFamily: 'var(--font-syne)' }}>
        {step.num}
      </div>

      <h3 className="mt-4 text-[1.15rem] font-bold tracking-[-0.03em] text-[var(--text)] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
        {step.title}
      </h3>
      <p className="mt-4 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
        {step.desc}
      </p>
    </motion.article>
  )
}
