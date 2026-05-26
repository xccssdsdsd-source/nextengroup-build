'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type MouseEvent } from 'react'
import BackgroundPathsServices from './BackgroundPathsServices'

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const services = [
  {
    title: 'Strony WWW',
    desc: 'Nowoczesne strony, które budują wiarygodność firmy i aktywnie kierują klientów do kontaktu. Każdy element dopasowany do Twoich celów biznesowych.',
  },
  {
    title: 'Automatyzacje AI',
    desc: 'Automatyzujemy procesy biznesowe przy użyciu AI i zaawansowanych systemów. Mniej błędów, mniej ręcznej pracy, większa efektywność.',
  },
  {
    title: 'Agenci AI',
    desc: 'Zaawansowani agenci AI pracujący za Ciebie całą dobę bez przestojów. Obsługują zapytania, porządkują dane i wspierają decyzje.',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="uslugi" ref={ref} className="section-shell relative bg-white">
      <BackgroundPathsServices />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 60%)' }}
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
            Oferujemy kompleksowe rozwiązania IT dopasowane dokładnie do Twojego biznesu i branży. Tworzymy nowoczesne strony internetowe, które generują zapytania od potencjalnych klientów i budują wiarygodność marki. Wdrażamy zaawansowane automatyzacje oparte na sztucznej inteligencji, które oszczędzają czas zespołu i obniżają koszty operacyjne. Budujemy też inteligentnych agentów AI dopasowanych do konkretnych procesów biznesowych.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {services.map((service, idx) => (
            <motion.article
              key={idx}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
              className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-7 transition-all duration-300"
              style={{
                boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.06), 0 12px 24px rgba(37,99,235,0.12)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#2563EB'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'
              }}
            >
              <h3 className="text-[1.1rem] font-bold tracking-[-0.03em] text-[#0A0A0F] leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {service.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#6b7280]">
                {service.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <a
            href="#kontakt"
            onClick={handleContactClick}
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 active:translate-y-0"
          >
            Umów spotkanie
          </a>
        </motion.div>
      </div>
    </section>
  )
}
