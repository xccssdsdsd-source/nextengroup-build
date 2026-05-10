'use client'

import { motion, useInView } from 'framer-motion'
import { Globe, MessagesSquare, Zap } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const services = [
  {
    icon: Globe,
    title: 'Strony, które prowadzą do kontaktu',
    desc: 'Projekt i wdrożenie strony, która porządkuje ofertę, buduje zaufanie i kieruje użytkownika prosto do działania.',
    points: ['Design premium', 'Copy sprzedażowe', 'Pełna responsywność'],
  },
  {
    icon: Zap,
    title: 'Automatyzacje AI dla leadów',
    desc: 'Zbieramy zapytania, porządkujemy kontakty i przyspieszamy odpowiedź bez dodatkowej pracy z Twojej strony.',
    points: ['Formularze i integracje', 'Scoring zapytań', 'Logika obsługi leadów'],
  },
  {
    icon: MessagesSquare,
    title: 'Lepsza ścieżka klienta',
    desc: 'Dbamy o to, żeby klient szybko rozumiał ofertę i miał jasną ścieżkę do kontaktu.',
    points: ['Mocniejsze sekcje CTA', 'Lepsza hierarchia treści', 'Większa czytelność'],
  },
] as const

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <motion.section id="uslugi" ref={ref} className="section-shell bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.78, ease }}
        >
          <span className="section-kicker">Oferta</span>
          <h2 className="section-title">Rozwiązanie dopasowane do Ciebie</h2>
          <p className="section-copy">
            Zaczynamy od tego, czego potrzebujesz teraz. Prosty landing, który
            zaczyna generować zapytania. Pełna strona z automatyzacjami, które
            zbierają kontakty i porządkują zapytania bez Twojego udziału. Procesy,
            które działają same, kiedy Ty zajmujesz się robotą. A jeśli chcesz
            więcej, wdrażamy agentów AI, którzy rozmawiają z klientami i kwalifikują
            zapytania w czasie rzeczywistym. Twoja firma działa nawet kiedy śpisz.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#0EA5E9] transition-transform duration-300 group-hover:scale-110">
                <service.icon size={20} strokeWidth={1.7} />
              </div>

              <h3 className="mt-6 text-[1.35rem] font-bold tracking-[-0.04em] text-[#0A0A0A] leading-snug">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#6B7280] sm:text-[15px]">
                {service.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.points.map(point => (
                  <span
                    key={point}
                    className="rounded-full bg-neutral-100 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-neutral-700"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
