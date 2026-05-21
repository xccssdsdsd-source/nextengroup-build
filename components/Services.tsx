'use client'

import { motion, useInView } from 'framer-motion'
import { Globe, MessagesSquare, Zap } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const services = [
  {
    icon: Globe,
    title: 'Strony WWW',
    desc: 'Tworzymy profesjonalne strony internetowe, które budują wiarygodność Twojej firmy, porządkują ofertę i kierują klientów do kontaktu. Każdy element dopasowujemy do Twoich celów biznesowych.',
    points: ['Responsywność', 'Szybkie ładowanie', 'Integracje z systemami'],
    color: 'from-blue-50 to-blue-50',
    iconColor: 'text-[#0055FF]',
    accent: '#0055FF',
  },
  {
    icon: Zap,
    title: 'Automatyzacje AI',
    desc: 'Automatyzujemy procesy biznesowe przy użyciu sztucznej inteligencji. Od obsługi zapytań po pracę na danych: mniej błędów, mniej ręcznej pracy i większa efektywność.',
    points: ['Automatyzacja procesów', 'Integracje z systemami', 'Monitoring i raportowanie'],
    color: 'from-blue-50 to-blue-50',
    iconColor: 'text-[#0055FF]',
    accent: '#0055FF',
  },
  {
    icon: MessagesSquare,
    title: 'Agenci AI',
    desc: 'Wdrażamy agentów AI, którzy pracują za Ciebie przez całą dobę. Obsługują zapytania, porządkują dane i wspierają decyzje biznesowe.',
    points: ['Agenci AI 24/7', 'Integracje z CRM', 'Monitoring i statystyki'],
    color: 'from-blue-50 to-blue-50',
    iconColor: 'text-[#0055FF]',
    accent: '#0055FF',
  },
] as const

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="uslugi" ref={ref} className="section-shell relative bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,85,255,0.06) 0%, transparent 60%)' }}
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
            Oferujemy kompleksowe rozwiązania dopasowane do Twojego biznesu. Tworzymy strony WWW, które generują zapytania i budują wiarygodność. Wdrażamy automatyzacje AI, które oszczędzają czas i obniżają koszty. Budujemy też agentów AI dopasowanych do konkretnych procesów.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white p-7 transition-all duration-300"
              style={{
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,85,255,0.1)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#CCDAFF'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB'
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${service.accent}, ${service.accent}99)` }}
              />

              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 ${service.iconColor} transition-transform duration-300 group-hover:scale-110`}>
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
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-gray-500"
                  >
                    {point}
                  </span>
                ))}
              </div>

            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
        >
          <a
            href="#kontakt"
            className="inline-flex items-center gap-3 rounded-full bg-[#0055FF] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#0044DD] hover:shadow-[0_8px_28px_rgba(0,85,255,0.38)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 active:translate-y-0"
          >
            Umów spotkanie
          </a>
        </motion.div>
      </div>
    </section>
  )
}
