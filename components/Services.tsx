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
    color: 'from-[#0EA5E9]/10 to-[#6366F1]/10',
    iconColor: 'text-[#0EA5E9]',
    accent: '#0EA5E9',
  },
  {
    icon: Zap,
    title: 'Automatyzacje AI dla leadów',
    desc: 'Zbieramy zapytania, porządkujemy kontakty i przyspieszamy odpowiedź bez dodatkowej pracy z Twojej strony.',
    points: ['Formularze i integracje', 'Scoring zapytań', 'Logika obsługi leadów'],
    color: 'from-[#6366F1]/10 to-[#8B5CF6]/10',
    iconColor: 'text-[#6366F1]',
    accent: '#6366F1',
  },
  {
    icon: MessagesSquare,
    title: 'Lepsza ścieżka klienta',
    desc: 'Dbamy o to, żeby klient szybko rozumiał ofertę i miał jasną ścieżkę do kontaktu.',
    points: ['Mocniejsze sekcje CTA', 'Lepsza hierarchia treści', 'Większa czytelność'],
    color: 'from-[#0EA5E9]/10 to-[#06B6D4]/10',
    iconColor: 'text-[#0EA5E9]',
    accent: '#0EA5E9',
  },
] as const

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="uslugi" ref={ref} className="section-shell relative bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 60%)' }}
      />

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
          className="mt-16 grid gap-5 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-7"
              style={{
                boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.03)',
                transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.03)' }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${service.accent}, ${service.accent}99)` }}
              />

              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} ${service.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                <service.icon size={20} strokeWidth={1.7} />
              </div>

              <h3 className="mt-6 text-[1.25rem] font-bold tracking-[-0.035em] text-[#0A0A0A] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {service.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#6B7280]">
                {service.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.points.map(point => (
                  <span
                    key={point}
                    className="rounded-full bg-neutral-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#6B7280] ring-1 ring-inset ring-black/[0.06]"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
