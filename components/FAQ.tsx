'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const faqs = [
  {
    q: 'Ile trwa przygotowanie pierwszego projektu?',
    a: 'Pierwszą wizualizację pokazujemy zwykle w ciągu 24 godzin od zebrania materiałów i ustalenia kierunku.',
  },
  {
    q: 'Czy pomagacie w treści i strukturze strony?',
    a: 'Tak. Porządkujemy układ sekcji, skracamy komunikaty i wzmacniamy CTA, żeby całość skuteczniej sprzedawała.',
  },
  {
    q: 'Czy strona będzie dopracowana na telefonie?',
    a: 'Tak. Projektujemy z myślą o urządzeniach mobilnych, więc czytelność, odstępy i hierarchia treści dobrze działają także na małych ekranach.',
  },
  {
    q: 'Czy możecie dodać automatyzację AI do obsługi zapytań?',
    a: 'Tak. Możemy połączyć stronę z procesem zbierania i porządkowania zapytań, tak aby kontakt szybciej trafiał do właściwej osoby.',
  },
  {
    q: 'Ile kosztuje strona?',
    a: 'Wycena zależy od zakresu projektu. Skontaktuj się z nami, a przygotujemy ofertę dopasowaną do Twojego budżetu.',
  },
  {
    q: 'Co jeśli nie będę zadowolony?',
    a: 'Pracujemy iteracyjnie. Pierwsza wizualizacja powstaje w 24 godziny, a poprawki wprowadzamy tak długo, aż efekt będzie zgodny z ustalonym kierunkiem.',
  },
  {
    q: 'Czy dajesz gwarancję?',
    a: 'Tak. Poprawki i drobne zmiany po wdrożeniu są bezpłatne przez 30 dni. Pracujesz ze mną bezpośrednio, więc nie ma ryzyka, że ktoś zgubi Twój temat.',
  },
  {
    q: 'Co jeśli nie mam treści ani zdjęć?',
    a: 'Nie ma problemu. Pomagam ułożyć treści na podstawie krótkiej rozmowy. Jeśli brakuje zdjęć, korzystamy z dobrej jakości stocków pasujących do branży.',
  },
  {
    q: 'Jak wygląda płatność?',
    a: 'Płatność w dwóch ratach: 50% na start, 50% po wdrożeniu. Bez ukrytych kosztów. Wszystko ustalamy przed rozpoczęciem pracy.',
  },
] as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <section
      id="faq"
      ref={ref}
      className="section-shell relative bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.025) 1px, transparent 1px)',
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
            To pytania, które najczęściej słyszymy przed rozpoczęciem współpracy.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = open === index

            return (
              <motion.div
                key={faq.q}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08, ease }}
                className={`overflow-hidden rounded-2xl border-l-4 transition-all duration-200 ${
                  isOpen
                    ? 'border-l-[#2563EB] bg-[#f5f7fa] shadow-[0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.08)]'
                    : 'border-l-transparent bg-white shadow-[0 1px 2px rgba(0,0,0,0.06)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5"
                >
                  <span className="text-[15px] font-medium leading-snug text-[#0A0A0F]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.24, ease }}
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${isOpen ? 'bg-[#2563EB] text-white' : 'bg-white text-[#9CA3AF] border border-[#e5e7eb]'}`}
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
                      <div className="mx-4 mb-3 h-px bg-[#e5e7eb] sm:mx-5" />
                      <p className="px-4 pb-4 text-[14px] leading-[1.6] text-[#6b7280] sm:px-5 sm:pb-5">
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
    </>
  )
}
