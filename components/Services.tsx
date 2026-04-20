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
    desc: 'Zbieramy zapytania, porządkujemy kontakty i przyspieszamy odpowiedź — bez dodatkowej pracy z Twojej strony.',
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Oferta</span>
          <h2 className="section-title">Skupiamy stronę na sprzedaży, nie na ozdobnikach.</h2>
          <p className="section-copy">
            Każdy element ma prowadzić użytkownika dalej: od pierwszego wrażenia,
            przez zaufanie, aż po jasne wezwanie do kontaktu.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 34 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: index * 0.1, ease }}
              className="glass relative overflow-hidden rounded-[28px] p-7"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,212,255,0.7),transparent)]" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00d4ff]/16 bg-[#00d4ff]/10 text-[#89efff]">
                <service.icon size={20} strokeWidth={1.7} />
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#92acce] sm:text-[15px]">
                {service.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.points.map(point => (
                  <span
                    key={point}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[#cfe6ff]"
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
