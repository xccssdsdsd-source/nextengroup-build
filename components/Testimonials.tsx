'use client'

import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    quote: 'Po wdrożeniu strona wreszcie wyglądała jak marka premium, a nie kolejna przypadkowa wizytówka.',
    name: 'Paweł M.',
    role: 'PM-Apartments',
  },
  {
    quote: 'Największa różnica była w tym, że komunikat stał się prosty i klienci szybciej przechodzili do kontaktu.',
    name: 'Anna K.',
    role: 'Branża beauty',
  },
  {
    quote: 'Dostaliśmy projekt szybko, a cały landing był znacznie czytelniejszy i bardziej profesjonalny.',
    name: 'Marcin R.',
    role: 'Usługi lokalne',
  },
] as const

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      id="opinie"
      ref={ref}
      className="section-shell border-y border-neutral-100 bg-[#F7F8FA]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Social proof</span>
          <h2 className="section-title">Co mówią firmy, które z nami pracowały.</h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {testimonials.map((item) => (
            <motion.article
              key={item.name}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/60"
            >
              <div className="flex gap-1 text-[#0EA5E9]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" strokeWidth={1.3} />
                ))}
              </div>

              <p className="mt-5 text-base leading-8 text-[#0A0A0A]">
                {item.quote}
              </p>

              <div className="mt-6 border-t border-neutral-100 pt-5">
                <div className="text-sm font-semibold text-[#0A0A0A]">{item.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#6B7280]">
                  {item.role}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
