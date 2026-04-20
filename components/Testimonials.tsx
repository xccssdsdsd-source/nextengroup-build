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
    <section
      id="opinie"
      ref={ref}
      className="section-shell border-y border-white/6 bg-white/[0.02]"
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

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, delay: index * 0.1, ease }}
              className="glass rounded-[28px] p-7"
            >
              <div className="flex gap-1 text-[#8fefff]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" strokeWidth={1.3} />
                ))}
              </div>

              <p className="mt-5 text-base leading-8 text-[#ecf5ff]">
                {item.quote}
              </p>

              <div className="mt-6 border-t border-white/8 pt-5">
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#7f98b8]">
                  {item.role}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
