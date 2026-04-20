'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useRef, useState } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const faqs = [
  {
    q: 'Ile trwa przygotowanie pierwszego projektu?',
    a: 'Pierwszą wizualizację pokazujemy zwykle w 24 godziny od zebrania materiałów i ustalenia kierunku.',
  },
  {
    q: 'Czy pomagacie w treści i strukturze strony?',
    a: 'Tak. Porządkujemy układ sekcji, skracamy komunikaty i wzmacniamy CTA, żeby całość sprzedawała lepiej.',
  },
  {
    q: 'Czy strona będzie dopracowana na telefonie?',
    a: 'Tak. Projektujemy mobile-first, więc czytelność, spacing i hierarchia treści działają najpierw na małych ekranach.',
  },
  {
    q: 'Czy możecie dodać automatyzację AI do obsługi leadów?',
    a: 'Tak. Możemy połączyć stronę z procesem zbierania i porządkowania zapytań, tak aby kontakt trafiał dalej szybciej.',
  },
] as const

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" ref={ref} className="section-shell">
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">FAQ</span>
          <h2 className="section-title max-w-[11ch]">Najczęstsze pytania przed startem.</h2>
          <p className="section-copy">
            To, co najczęściej pada przed startem współpracy.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, index) => {
            const isOpen = open === index

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: index * 0.08, ease }}
                className={`overflow-hidden rounded-[24px] border transition-[border-color,background,box-shadow] duration-200 ${
                  isOpen
                    ? 'border-[#00d4ff]/28 bg-[linear-gradient(152deg,rgba(0,40,80,0.72),rgba(3,10,26,0.88))] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.12),inset_0_0_32px_rgba(0,120,220,0.07),0_20px_48px_rgba(0,0,0,0.32)]'
                    : 'border-white/9 bg-[linear-gradient(152deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/14 hover:bg-[linear-gradient(152deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_8px_24px_rgba(0,0,0,0.2)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-semibold leading-6 text-[#f0f7ff] sm:text-base">
                    {faq.q}
                  </span>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] text-[#8fefff] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease }}
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-[#9db4d2] sm:px-6 sm:text-[15px]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
