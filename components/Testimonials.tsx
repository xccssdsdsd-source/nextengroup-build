'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    quote: 'Od momentu uruchomienia liczba zapytań wzrosła wyraźnie. Wizualizacja już następnego dnia — dokładnie tak jak obiecali.',
    name: 'Paweł M.',
    role: 'P&M Apartments',
    initials: 'PM',
    color: '#0d4fc7',
  },
  {
    quote: 'Chatbot AI odpowiada klientom zanim zdążę odebrać telefon. Ogromna różnica w konwersji.',
    name: 'Anna K.',
    role: 'Gabinet Kosmetologiczny',
    initials: 'AK',
    color: '#00d4ff',
  },
  {
    quote: 'Najlepsza inwestycja w marketing jaką zrobiłem. Strona realnie generuje zapytania.',
    name: 'Marcin R.',
    role: 'Firma Remontowa',
    initials: 'MR',
    color: '#1a6fff',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="opinie"
      className="py-28 px-6 relative"
      ref={ref}
      style={{
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.04) 0%, transparent 60%)' }}
      />
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
            Co mówią klienci
          </span>
          <h2 className="font-syne text-[clamp(36px,5vw,60px)] font-bold text-[#e8f0ff] tracking-[-0.03em] leading-tight">
            Opinie
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col gap-5 p-7"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                borderRadius: '16px',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{ y: -6 }}
            >
              <span
                className="absolute top-4 right-6 text-[80px] leading-none text-[#e8f0ff] select-none"
                style={{ opacity: 0.06, fontFamily: 'Georgia, serif', lineHeight: 1 }}
              >
                "
              </span>

              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-[#00d4ff] text-base">★</span>
                ))}
              </div>

              <p
                className="text-[#e8f0ff]/80 text-sm leading-[1.8] italic"
                style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
              >
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, rgba(0,0,0,0.3))`,
                    color: '#e8f0ff',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="text-sm font-semibold text-[#e8f0ff]"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs text-[#4a6080]"
                    style={{ fontFamily: 'var(--font-figtree)' }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
