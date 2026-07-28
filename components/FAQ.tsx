'use client'

import { AnimatePresence, m, useInView } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import SectionGlow from './ui/SectionGlow'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const faqs = [
  {
    q: 'W czym dokładnie możecie nam pomóc?',
    a: 'Tworzymy nowoczesne strony WWW dla agentów i biur nieruchomości z wbudowanym Agentem AI 24/7 oraz intuicyjnym panelem do samodzielnego zarządzania ofertami.',
  },
  {
    q: 'Ile kosztuje strona dla agenta nieruchomości?',
    a: 'Pakiety strony wyceniamy od 1997 zł (Strona na jedną usługę), przez 2397 zł (Strona z chatbotem AI) do 2997 zł (Strona z panelem do zarządzania ofertami). Pierwszą wizualizację otrzymujesz w 24h bez zobowiązań.',
  },
  {
    q: 'Ile kosztuje opieka nad stroną i hosting?',
    a: 'Stała opieka i hosting to od 29 do 99 zł miesięcznie, zależnie od wybranej konfiguracji — obejmuje hosting, monitoring, kopie zapasowe, aktualizacje bezpieczeństwa i drobne poprawki bez limitu zgłoszeń. Nowe podstrony i większą przebudowę wyceniamy osobno.',
  },
  {
    q: 'Co jeśli projekt mi się nie spodoba? Czy coś ryzykuję?',
    a: 'Nie ryzykujesz nic — płacisz dopiero za rezultat, który akceptujesz. Zasady poprawek i bezpłatnej wizualizacji opisaliśmy wyżej.',
  },
  {
    q: 'Czy strona będzie zoptymalizowana pod SEO i GEO?',
    a: 'Tak, podstawy SEO, GEO i AEO są wbudowane w każdy pakiet strony. Od początku tworzymy stronę tak, aby Google i systemy AI (np. ChatGPT) mogły ją poprawnie odczytać i rekomendować.',
  },
  {
    q: 'Czym jest agent AI i co może robić na stronie agenta?',
    a: 'Agent AI to inteligentny asystent pracujący 24/7. Odpowiada na zapytania klientów o lokacjach i cenach, kwalifikuje kupujących/sprzedających i prowadzi ich do umawiania prezentacji.',
  },
  {
    q: 'Czy strona będzie dopracowana na telefonie?',
    a: 'Tak. Projektujemy z myślą o urządzeniach mobilnych, więc czytelność, zdjęcia nieruchomości i wyszukiwarka działają idealnie na małych ekranach.',
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

const VISIBLE_COUNT = 4

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const visible = expanded ? faqs : faqs.slice(0, VISIBLE_COUNT)

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <section
      id="faq"
      ref={ref}
      className="section-shell relative"
      data-no-entrance
      suppressHydrationWarning
    >
      <SectionGlow variant="faq" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1fr] lg:gap-20">
        <div>
          <span className="section-kicker" suppressHydrationWarning>FAQ</span>
          <h2 className="section-title max-w-[11ch]" suppressHydrationWarning>Wszystko co musisz wiedzieć przed startem.</h2>
          <p className="section-copy">
            To pytania, które najczęściej słyszymy przed rozpoczęciem współpracy.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {visible.map((faq, index) => {
            const isOpen = open === index

            return (
              <div
                key={faq.q}
                className={`faq-item rounded-xl border-l-[3px] transition-[border-color,background-color,box-shadow] duration-200 ${
                  isOpen
                    ? 'border-l-[#3AAFE8] bg-[rgba(58,175,232,0.08)] shadow-[0_1px_3px_rgba(0,0,0,0.5),_0_6px_16px_rgba(58,175,232,0.18)]'
                    : 'border-l-transparent bg-transparent'
                }`}
                style={{ display: 'grid' }}
              >
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left border-b border-[rgba(255,255,255,0.06)]"
                >
                  <span className="text-[14.5px] font-semibold leading-snug text-[#EAF0F7] transition-colors duration-200 hover:text-[#3AAFE8]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {faq.q}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease }}
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-[background-color,color,box-shadow] duration-200 ease-out ${
                      isOpen
                        ? 'bg-[#3AAFE8] text-[#06141A] shadow-[0_2px_8px_rgba(58,175,232,0.3)]'
                        : 'bg-transparent text-[#3AAFE8] border border-[rgba(58,175,232,0.3)]'
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
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ opacity: 0, transform: 'translateY(-4px)' }}
                      animate={{ opacity: 1, transform: 'translateY(0)' }}
                      exit={{ opacity: 0, transform: 'translateY(-2px)' }}
                      transition={{ duration: 0.18, ease }}
                    >
                      <p className="px-5 py-5 text-[14px] leading-[1.72] text-[#A6B2C4]">
                        {faq.a}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}

          <button
            type="button"
            onClick={() => {
              setExpanded((current) => !current)
              if (expanded && open !== null && open >= VISIBLE_COUNT) setOpen(null)
            }}
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3.5 text-[13.5px] font-medium text-[#A6B2C4] hover:border-white/20 hover:text-[#EAF0F7] transition-colors duration-200"
          >
            <Plus
              size={14}
              strokeWidth={2}
              className={`transition-transform duration-200 ${expanded ? 'rotate-45' : ''}`}
            />
            {expanded ? 'Pokaż mniej pytań' : `Pokaż więcej pytań (${faqs.length - VISIBLE_COUNT})`}
          </button>
        </div>
      </div>
    </section>
    </>
  )
}
