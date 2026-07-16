'use client'

import { m, useInView } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import SectionGlow from './ui/SectionGlow'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const premiumSpring = { type: 'spring' as const, stiffness: 120, damping: 24 }

const faqs = [
  {
    q: 'W czym dokładnie możecie nam pomóc?',
    a: 'Tworzymy nowoczesne strony WWW dla firm, wdrażamy automatyzacje oparte na AI oraz budujemy agentów AI. Jedno źródło dla strony, która generuje zapytania, i dla rozwiązań, które odciążają zespół z powtarzalnej pracy.',
  },
  {
    q: 'Ile kosztuje strona internetowa lub wdrożenie AI?',
    a: 'Cena zależy od zakresu — prosta, profesjonalna strona-wizytówka zaczyna się od 1997 zł, a rozbudowane wdrożenia z automatyzacjami i agentem AI wyceniamy indywidualnie po analizie procesu. Zawsze podajemy konkretną, stałą kwotę przed startem — bez ukrytych kosztów i niespodzianek. Umów bezpłatną konsultację, a po krótkiej rozmowie dostaniesz wycenę dopasowaną do Twoich potrzeb.',
  },
  {
    q: 'Co jeśli projekt mi się nie spodoba? Czy coś ryzykuję?',
    a: 'Nie ryzykujesz nic. Najpierw przygotowujemy bezpłatną wizualizację strony — widzisz efekt, zanim cokolwiek zapłacisz. W trakcie prac masz nielimitowaną liczbę poprawek, więc dopracowujemy projekt aż będziesz w pełni zadowolony. Płacisz dopiero za rezultat, który akceptujesz.',
  },
  {
    q: 'Jak zacząć współpracę?',
    a: 'Wystarczy jeden krok — umów bezpłatną konsultację lub wyślij zapytanie przez formularz. Odpowiadamy w ciągu 24 godzin. Na rozmowie poznajemy Twoje cele, doradzamy najlepszą ścieżkę i przygotowujemy wstępną wizualizację oraz wycenę. Bez zobowiązań i bez presji — decyzję podejmujesz dopiero, gdy zobaczysz, co możemy dla Ciebie zrobić.',
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
    a: 'Najczęściej automatyzujemy obsługę zapytań, segregowanie i kierowanie leadów, generowanie raportów oraz integrację systemów (e-mail, arkusze, fakturowanie). Efekt to mniej ręcznej pracy, mniej błędów i więcej czasu dla zespołu na to, co naprawdę ważne.',
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
    q: 'Jak backlinki wpływają na pozycję mojej strony w Google?',
    a: 'Backlinki to linki z innych stron prowadzące do Twojej witryny. Google traktuje je jak "głosy zaufania" — im więcej wartościowych domen linkuje do Twojej strony, tym wyżej jesteś w wynikach. Budujemy profil linków z wiarygodnych, branżowych źródeł. Bez sztucznych katalogów i link farm. Każdy backlink powinien generować ruch i wzmacniać autorytet domeny (DR).',
  },
  {
    q: 'Ile czasu zajmuje osiągnięcie pierwszych efektów SEO?',
    a: 'Pierwsze ruchy w pozycjach widoczne są zwykle po 4–8 tygodniach. Trwałe, stabilne pozycje na trudniejsze frazy buduje się przez 6–12 miesięcy systematycznych działań. GEO (widoczność w ChatGPT i Gemini) może dawać efekty szybciej — modele AI aktualizują swoje bazy częściej niż Google indeksuje nowe strony.',
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
        <m.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>FAQ</span>
          <h2 className="section-title max-w-[11ch]" suppressHydrationWarning>Wszystko co musisz wiedzieć przed startem.</h2>
          <p className="section-copy">
            To pytania, które najczęściej słyszymy przed rozpoczęciem współpracy.
          </p>
        </m.div>

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

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p className="px-5 py-5 text-[14px] leading-[1.72] text-[#A6B2C4]" style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'none' : 'translateY(-4px)', transition: 'opacity 260ms ease 60ms, transform 300ms cubic-bezier(0.22,1,0.36,1)' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
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

