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
    <section id="uslugi" ref={ref} className="section-shell">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.1),transparent_28%),radial-gradient(ellipse_at_80%_100%,rgba(26,111,255,0.07),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
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

        <div className="mt-14 grid gap-6 lg:grid-cols-3" style={{ perspective: '1200px' }}>
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 44, rotateX: 8, filter: 'blur(4px)' }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.82, delay: index * 0.12, ease }}
              whileHover={{ y: -7, transition: { duration: 0.28, ease } }}
              className="group glass relative overflow-hidden rounded-[28px] p-7 transition-[border-color,box-shadow] duration-300 hover:border-[#00d4ff]/28 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_0_40px_rgba(0,160,255,0.08),0_48px_96px_rgba(0,0,0,0.42),0_12px_32px_rgba(0,0,0,0.26),0_0_60px_rgba(0,180,255,0.07)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,212,255,0.85),transparent)]" />
              <div className="absolute inset-x-[30%] top-0 h-px blur-sm bg-[rgba(0,212,255,0.5)]" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00d4ff]/22 bg-[linear-gradient(135deg,rgba(0,212,255,0.16),rgba(0,100,220,0.08))] text-[#89efff] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_16px_rgba(0,180,255,0.14)] transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_24px_rgba(0,212,255,0.3)]">
                <service.icon size={20} strokeWidth={1.7} className="transition-transform duration-300 group-hover:rotate-6" />
              </div>

              <h3 className="mt-6 text-[1.35rem] font-bold tracking-[-0.04em] text-white leading-snug">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#92acce] sm:text-[15px]">
                {service.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.points.map(point => (
                  <span
                    key={point}
                    className="rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#cfe6ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
