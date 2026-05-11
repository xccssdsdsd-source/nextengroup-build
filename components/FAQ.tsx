'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Plus } from 'lucide-react'
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
    <section
      id="faq"
      ref={ref}
      className="section-shell relative bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">FAQ</span>
          <h2 className="section-title max-w-[11ch]">Najczęstsze pytania przed startem.</h2>
          <p className="section-copy">
            To, co najczęściej pada przed startem współpracy.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = open === index

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.68, delay: index * 0.09, ease }}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-blue-100 bg-blue-50 shadow-[0_4px_16px_rgba(0,85,255,0.08)]'
                    : 'border-transparent bg-gray-50 shadow-none hover:border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold leading-snug text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.24, ease }}
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white ${isOpen ? 'bg-blue-600 text-white' : 'bg-white text-gray-400'}`}
                  >
                    <Plus size={15} strokeWidth={2.2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease }}
                    >
                      <div className="mx-6 mb-5 h-px bg-neutral-100" />
                      <p className="px-6 pb-6 text-[15px] leading-7 text-[#6B7280]">
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
