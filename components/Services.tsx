'use client'

import { motion, useInView } from 'framer-motion'
import { Globe, MessagesSquare, Zap } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const services = [
  {
    icon: Globe,
    title: 'Strony internetowe dla firm',
    desc: 'Tworzymy profesjonalne strony www dla firm B2B, które budują wiarygodność, porządkują ofertę i kierują klientów do bezpośredniego kontaktu. Dostosowujemy każdy element do Twojej branży.',
    points: ['Mobilne i responsywne', 'Szybkie ładowanie i SEO', 'Integracje z CRM i lead tracking'],
    color: 'from-blue-50 to-blue-50',
    iconColor: 'text-[#0055FF]',
    accent: '#0055FF',
  },
  {
    icon: Zap,
    title: 'SEO i pozycjonowanie',
    desc: 'Strategie SEO dla firm B2B, które przekładają się na wyższą widoczność w Google i więcej kwalifikowanych zapytań. Audyt SEO, optymalizacja on-page, link building i monitoring rankingów.',
    points: ['Audyt SEO', 'Optymalizacja techniczna', 'Link building dla firm'],
    color: 'from-blue-50 to-blue-50',
    iconColor: 'text-[#0055FF]',
    accent: '#0055FF',
  },
  {
    icon: MessagesSquare,
    title: 'Sklepy i platformy e-commerce',
    desc: 'Wdrażamy sklepy internetowe i platformy B2B, które obsługują zarówno klientów detalicznych, jak i biznesowych. Pełna integracja z systemami logistycznymi i rozliczeniowymi.',
    points: ['E-commerce B2B i B2C', 'Integracja płatności', 'Zarządzanie katalogiem i zamówieniami'],
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
          <h2 className="section-title">Usługi dla firm B2B w Polsce</h2>
          <p className="section-copy">
            Oferujemy kompleksowe rozwiązania web services dla przedsiębiorstw szukających profesjonalnej agencji. Tworzymy strony internetowe dla firm, które generują zapytania ofertowe. Wdrażamy strategie SEO dla firm B2B w Google. Budujemy platformy e-commerce i sklepy internetowe dla producentów i dostawców. Każde rozwiązanie jest dostosowane do potrzeb Twojej branży i Twoich celów biznesowych.
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
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white p-7 transition-all duration-300"
              style={{
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,85,255,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = '#CCDAFF';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB';
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
      </div>
    </section>
  )
}
