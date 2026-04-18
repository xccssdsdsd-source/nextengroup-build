'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Zap, MessageSquare } from 'lucide-react'

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]

const services = [
  {
    num: '01',
    icon: Globe,
    title: 'Strona WWW',
    desc: 'Tworzymy strony internetowe, które aktywnie generują zapytania od klientów — nie tylko wyglądają dobrze.',
    features: ['Projekt UI/UX dopasowany do branży', 'Optymalizacja konwersji (CRO)', 'W pełni responsywna na każde urządzenie', 'Podstawowe SEO i szybkość ładowania'],
  },
  {
    num: '02',
    icon: Zap,
    title: 'Automatyzacje AI',
    desc: 'Systemy, które pracują za Ciebie 24/7 — zbierają leady, odpowiadają na pytania i prowadzą klientów przez ścieżkę zakupu.',
    features: ['Chatbot AI dostępny całą dobę', 'Automatyczne zbieranie leadów', 'Integracja z CRM i systemami', 'Automatyczne follow-upy'],
  },
  {
    num: '03',
    icon: MessageSquare,
    title: 'Asystent AI',
    desc: 'Inteligentny asystent obsługi klienta, który zna Twoją ofertę, odpowiada na pytania i umawia wizyty bez Twojego udziału.',
    features: ['Automatyczna obsługa zapytań', 'Umawianie wizyt i spotkań', 'Rekomendacje w Google Maps', 'Personalizacja odpowiedzi'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="uslugi" className="py-28 px-6 relative" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(26,111,255,0.06) 0%, transparent 60%)' }}
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
            Co robimy
          </span>
          <h2
            className="font-syne text-[clamp(36px,5vw,60px)] font-bold text-[#e8f0ff] tracking-[-0.03em] leading-tight"
          >
            Usługi
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className="relative group p-7 flex flex-col gap-5 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                borderRadius: '16px',
              }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                style={{ background: 'linear-gradient(90deg, #00d4ff, #1a6fff)', scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease }}
              />

              <span
                className="absolute top-5 right-6 font-barlow text-[72px] leading-none text-[#e8f0ff] select-none"
                style={{ fontWeight: 900, opacity: 0.04 }}
              >
                {svc.num}
              </span>

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                }}
              >
                <svc.icon size={20} color="#00d4ff" strokeWidth={1.5} />
              </div>

              <div>
                <h3
                  className="font-syne text-xl font-bold text-[#e8f0ff] tracking-[-0.02em] mb-2"
                  style={{ fontWeight: 700 }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-[#4a6080] text-sm leading-[1.7]"
                  style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
                >
                  {svc.desc}
                </p>
              </div>

              <ul className="flex flex-col gap-2 mt-auto">
                {svc.features.map(f => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-[#e8f0ff]/80"
                    style={{ fontFamily: 'var(--font-figtree)', fontWeight: 400 }}
                  >
                    <span className="text-[#00d4ff] mt-0.5 flex-shrink-0">→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
