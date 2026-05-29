'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
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
    q: 'Czy strona będzie zoptymalizowana pod SEO?',
    a: 'Tak. Każdą stronę projektujemy pod SEO — czysty kod, szybkie ładowanie, poprawna struktura nagłówków, metadane i dane strukturalne. Dzięki temu Google łatwiej indeksuje treść, a Ty zyskujesz ruch z wyszukiwarki bez płacenia za każde kliknięcie.',
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
  {
    q: 'Ile kosztuje współpraca?',
    a: 'Wycena zależy od zakresu — od samej strony, przez automatyzacje, po pełne wdrożenie agenta AI. Skontaktuj się z nami, a po krótkiej rozmowie przygotujemy ofertę dopasowaną do Twoich celów i budżetu.',
  },
  {
    q: 'Co jeśli nie mam treści ani zdjęć?',
    a: 'Nie ma problemu. Pomagamy ułożyć treści i strukturę strony na podstawie krótkiej rozmowy, wzmacniamy komunikaty i CTA. Jeśli brakuje zdjęć, korzystamy z dobrej jakości stocków pasujących do branży.',
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
      className="section-shell relative"
      style={{ background: 'var(--bg)' }}
    >
      <BackgroundPathsFAQ />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.015) 1px, transparent 1px)',
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
                layout="position"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06, ease }}
                className={`overflow-hidden rounded-2xl border-l-4 transition-[border-color,background-color,box-shadow] duration-200 ${
                  isOpen
                    ? 'border-l-[var(--accent)] shadow-[0_1px_3px_rgba(15,23,42,0.08),_0_8px_16px_rgba(59,130,246,0.08)]'
                    : 'border-l-transparent shadow-[0_1px_3px_rgba(15,23,42,0.06)]'
                }`}
                style={{ background: isOpen ? 'var(--bg-soft)' : 'var(--bg-card)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-medium leading-snug text-[var(--text)]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.28, ease }}
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-280 ${isOpen ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-card)] text-[var(--muted)] border border-[var(--border)]'}`}
                  >
                    <Plus size={16} strokeWidth={2} />
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
                      <div className="mx-5 mb-4 h-px bg-[var(--border)]" />
                      <p className="px-5 pb-5 text-[14.5px] leading-[1.65] text-[var(--text-secondary)]">
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
