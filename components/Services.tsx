'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import BackgroundPathsServices from './BackgroundPathsServices'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const offers = [
  {
    title: 'Strony Internetowe',
    desc: 'Nowoczesne, responsywne strony, które budują wiarygodność marki i aktywnie kierują klientów do kontaktu. Projektujemy pod SEO, wdrażamy szybko i wspieramy po starcie.',
    points: [
      ['Responsywne na każdym urządzeniu', 'Czytelne i dopracowane na komputerze, tablecie i smartfonie.'],
      ['Szybkie i zoptymalizowane pod SEO', 'Ładują się błyskawicznie i dobrze rankują w wynikach Google.'],
      ['Dopasowane do Twojej marki', 'Układ, treści i call-to-action skrojone pod Twoje cele sprzedażowe.'],
      ['Pierwsza wizualizacja w 24h', 'Pracujemy iteracyjnie — poprawiamy aż do zgodności z kierunkiem.'],
    ],
  },
  {
    title: 'Automatyzacje i Agenci wspierani przez AI',
    desc: 'Automatyzujemy procesy i wdrażamy inteligentnych agentów AI pracujących 24/7. Mniej błędów, mniej ręcznej pracy, niższe koszty operacyjne i więcej czasu dla zespołu.',
    points: [
      ['Obsługa zapytań i komunikacji', 'Emaile, wiadomości i zgłoszenia automatycznie sortowane i odpowiadane.'],
      ['Przetwarzanie danych i raporty', 'Zbieranie danych z wielu źródeł, czyszczenie i generowanie raportów.'],
      ['Integracje między systemami', 'CRM, faktury, HR — synchronizowane bez ręcznego wprowadzania danych.'],
      ['Inteligentni agenci AI 24/7', 'Obsługa klienta, analiza danych i wsparcie decyzji bez przestojów.'],
    ],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="uslugi" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
      <BackgroundPathsServices />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Oferta</span>
          <h2 className="section-title">Rozwiązania IT dla Twojego biznesu</h2>
          <p className="section-copy">
            Oferujemy kompleksowe rozwiązania IT dopasowane dokładnie do Twojej branży. Tworzymy nowoczesne strony, które generują zapytania od klientów, oraz wdrażamy automatyzacje i agentów AI, którzy oszczędzają czas zespołu i obniżają koszty operacyjne.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {offers.map((offer, idx) => <OfferCard key={idx} offer={offer} />)}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <a href="#kontakt" className="btn btn-primary">Umów spotkanie</a>
        </motion.div>
      </div>
    </section>
  )
}

function OfferCard({ offer }: { offer: (typeof offers)[number] }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-8 transition-[border-color,box-shadow] duration-200 ${
        isHovered ? 'border-[#2563EB] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_12px_24px_rgba(37,99,235,0.12)]' : 'border-[#e5e7eb] shadow-[0_1px_2px_rgba(0,0,0,0.06),_0_2px_8px_rgba(0,0,0,0.04)]'
      }`}
      style={{ background: 'var(--bg-card)' }}
    >
      <h3 className="text-[1.3rem] font-bold tracking-[-0.03em] text-[var(--text)] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
        {offer.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
        {offer.desc}
      </p>

      <ul className="mt-6 space-y-4">
        {offer.points.map(([head, body], i) => (
          <li key={i} className="flex gap-3.5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-[13px] font-bold text-white">✓</span>
            <span>
              <span className="block text-[15px] font-semibold text-[var(--text)]">{head}</span>
              <span className="mt-0.5 block text-[14px] leading-[1.6] text-[var(--text-secondary)]">{body}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}
