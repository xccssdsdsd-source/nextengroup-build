'use client'

import { AnimatePresence, m, useInView } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import BackgroundPathsFAQ from './BackgroundPathsFAQ'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const faqs = [
  {
    q: 'W czym dokładnie możecie nam pomóc?',
    a: 'Tworzymy nowoczesne strony WWW dla firm, wdrażamy automatyzacje oparte na AI oraz budujemy agentów AI. Jedno źródło dla strony, która generuje zapytania, i dla rozwiązań, które odciążają zespół z powtarzalnej pracy.',
  },
  {
    q: 'Czy strona będzie zoptymalizowana pod SEO i GEO?',
    a: 'Tak. Każdą stronę projektujemy pod SEO i GEO (Generative Engine Optimization). SEO zapewnia widoczność w Google, a GEO sprawia, że Twoja firma pojawia się w odpowiedziach generowanych przez ChatGPT, Gemini i Perplexity. Wdrażamy dane strukturalne (Schema.org), FAQ, treści formatowane pod AI i sygnały E-E-A-T, które modele językowe cytują jako wiarygodne źródła.',
  },
  {
    q: 'Czym jest agent AI i co może robić w mojej firmie?',
    a: 'Agent AI to inteligentny asystent pracujący 24/7. Odpowiada na zapytania klientów, kwalifikuje leady, umawia spotkania i wspiera decyzje. Budujemy go pod konkretne procesy w Twojej firmie, więc działa w Twoim języku i zna Twoją ofertę.',
  },
  {
    q: 'Jakie procesy możecie zautomatyzować dzięki AI?',
    a: 'Najczęściej automatyzujemy obsługę zapytań, segregowanie i kierowanie leadów, generowanie raportów oraz integrację systemów (CRM, e-mail, arkusze). Efekt to mniej ręcznej pracy, mniej błędów i więcej czasu dla zespołu na to, co naprawdę ważne.',
  },
  {
    q: 'Czy automatyzacje i agenta AI da się połączyć z moją stroną i narzędziami?',
    a: 'Tak. Łączymy stronę, formularze i agenta AI z narzędziami, których już używasz, tak aby zapytanie od razu trafiało do właściwej osoby lub systemu. Wszystko działa jako jeden spójny proces, a nie osobne wyspy.',
  },
  {
    q: 'Ile trwa przygotowanie pierwszego projektu?',
    a: 'Pierwszą wizualizację strony pokazujemy zwykle w ciągu 24 godzin od zebrania materiałów i ustalenia kierunku. Przy automatyzacjach i agentach AI najpierw mapujemy proces, a działające demo dostajesz w kilka dni.',
  },
  {
    q: 'Czy strona będzie dopracowana na telefonie?',
    a: 'Tak. Projektujemy z myślą o urządzeniach mobilnych, więc czytelność, odstępy i hierarchia treści dobrze działają także na małych ekranach — a szybkie ładowanie na telefonie dodatkowo wspiera pozycję w Google.',
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
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <section
      id="faq"
      ref={ref}
      className="section-shell relative"
    >
      <BackgroundPathsFAQ />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1fr] lg:gap-20">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.68, ease }}
        >
          <span className="section-kicker">FAQ</span>
          <h2 className="section-title max-w-[11ch]">Najczęstsze pytania przed startem.</h2>
          <p className="section-copy">
            To pytania, które najczęściej słyszymy przed rozpoczęciem współpracy.
          </p>
        </m.div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = open === index

            return (
              <m.div
                key={faq.q}
                layout="position"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.42, delay: index * 0.055, ease }}
                className={`overflow-hidden rounded-xl border-l-[3px] transition-[border-color,background-color,box-shadow] duration-200 ${
                  isOpen
                    ? 'border-l-[#2563EB] bg-[rgba(37,99,235,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.2),_0_6px_16px_rgba(37,99,235,0.1)]'
                    : 'border-l-transparent bg-transparent'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left border-b border-[rgba(255,255,255,0.06)]"
                >
                  <span className="text-[14.5px] font-semibold leading-snug text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>
                    {faq.q}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.26, ease }}
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#2563EB] text-white shadow-[0_2px_8px_rgba(37,99,235,0.30)]'
                        : 'bg-transparent text-[#2563EB] border border-[rgba(37,99,235,0.3)]'
                    }`}
                  >
                    <Plus size={14} strokeWidth={2.2} />
                  </m.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`faq-answer-${index}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 py-5 text-[14px] leading-[1.72] text-[#6B7280]">
                        {faq.a}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
    </>
  )
}
