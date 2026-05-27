'use client'

import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { useRef, useState } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    quote: 'Po wdrożeniu strona wreszcie wyglądała jak marka premium, a nie kolejna przypadkowa wizytówka.',
    name: 'Paweł M.',
    role: 'PM-Apartments',
  },
  {
    quote: 'Największa różnica była taka, że komunikacja stała się prostsza, a klienci szybciej przechodzili do kontaktu.',
    name: 'Anna K.',
    role: 'Branża beauty',
  },
  {
    quote: 'Projekt dostaliśmy szybko, a cały landing był znacznie czytelniejszy i bardziej profesjonalny.',
    name: 'Marcin R.',
    role: 'Usługi lokalne',
  },
] as const

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="opinie"
      ref={ref}
      className="section-shell relative overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Opinie</span>
          <h2 className="section-title">Co mówią firmy, które z nami pracowały.</h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-5 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {testimonials.map((item) => <TestimonialCard key={item.name} item={item} ease={ease} />)}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ item, ease }: { item: typeof testimonials[0], ease: [number, number, number, number] }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
      whileHover={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border bg-white p-7 transition-all duration-200 will-change-auto ${
        isHovered ? 'border-black/[0.07] shadow-[0_4px_8px_rgba(0,0,0,0.06),_0_12px_28px_rgba(0,0,0,0.08),_0_32px_64px_rgba(0,0,0,0.05)]' : 'border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.05),_0_20px_40px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className="flex gap-0.5 text-[#FBBF24]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      <p className="mt-5 text-[15px] leading-[1.8] text-[#374151]">
        "{item.quote}"
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0EA5E9]/15 to-[#6366F1]/15 text-[11px] font-bold text-[#0EA5E9]" style={{ fontFamily: 'var(--font-syne)' }}>
          {item.name.charAt(0)}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#0A0A0A]">{item.name}</div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF]">{item.role}</div>
        </div>
      </div>
    </motion.article>
  )
}
