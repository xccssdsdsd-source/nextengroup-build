'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]

const faqs = [
  {
    q: 'Ile kosztuje strona WWW?',
    a: 'Ceny zaczynają się od 1 500 zł za stronę wizytówkową. Dokładna wycena zależy od zakresu projektu, liczby podstron i funkcji. Bezpłatna konsultacja i wizualizacja pozwolą nam dopasować ofertę do Twojego budżetu.',
  },
  {
    q: 'Jak szybko dostanę gotową stronę?',
    a: 'Wizualizację projektu dostarczamy w ciągu 24h od konsultacji. Pełne wdrożenie strony trwa od 5 do 14 dni roboczych w zależności od złożoności projektu.',
  },
  {
    q: 'Czy AI na mojej stronie wymaga technicznej wiedzy?',
    a: 'Nie. Całą konfigurację i integrację obsługujemy po naszej stronie. Ty korzystasz z gotowego rozwiązania — bez konieczności znajomości technologii.',
  },
  {
    q: 'Dla jakich branż to działa najlepiej?',
    a: 'Nasze rozwiązania sprawdzają się szczególnie dobrze w branży remontowej, nieruchomości, turystyce, klinikach i gabinetach kosmetycznych, firmach usługowych oraz wszelkich lokalnych biznesach opartych na zapytaniach od klientów.',
  },
  {
    q: 'Co zawiera "bezpłatny projekt"?',
    a: 'Bezpłatny projekt to kompletna wizualizacja Twojej strony przygotowana w ciągu 24h — bez żadnych zobowiązań. Możesz zobaczyć jak będzie wyglądać Twoja strona, zanim podejmiesz decyzję o współpracy.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" className="py-28 px-6" ref={ref}>
      <div className="max-w-[780px] mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span
            className="text-xs text-[#00d4ff] tracking-[0.2em] uppercase mb-3 block"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            Pytania
          </span>
          <h2 className="font-syne text-[clamp(36px,5vw,60px)] font-bold text-[#e8f0ff] tracking-[-0.03em] leading-tight">
            FAQ
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: open === i ? '1px solid rgba(0,212,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'border-color 0.3s',
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="text-[#e8f0ff] text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="flex-shrink-0"
                >
                  <Plus size={18} color={open === i ? '#00d4ff' : '#4a6080'} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <p
                      className="px-6 pb-5 text-sm text-[#4a6080] leading-[1.8]"
                      style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
