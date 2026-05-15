'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'getbuild.pl@gmail.com'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="kontakt" ref={ref} className="section-shell scroll-mt-32 relative bg-white">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-200/30 bg-white p-8 sm:p-12 lg:p-14"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-3xl bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="relative">
          <span className="section-kicker text-blue-400">Kontakt</span>
          <h2 className="section-title text-gray-900">Porozmawiajmy o Twojej firmie</h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">Rozwiązania dopasowane do Ciebie i Twoich problemów</p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                href: `mailto:${contactEmail}`,
                icon: <Mail size={22} />,
                label: 'E-mail',
                value: contactEmail,
                cta: 'Otwórz mail',
                delay: 0.5,
              },
              {
                href: 'https://www.instagram.com/getbuild.pl/',
                target: '_blank',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                  </svg>
                ),
                label: 'Instagram',
                value: '@getbuild.pl',
                cta: 'Przejdź do profilu',
                delay: 0.64,
              },
              {
                href: 'https://www.facebook.com/profile.php?id=61588720012257',
                target: '_blank',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M13.5 20V12.8H16L16.4 10H13.5V8.2C13.5 7.4 13.8 6.8 15 6.8H16.5V4.3C16.2 4.2 15.3 4 14.2 4C11.8 4 10.2 5.4 10.2 8V10H8V12.8H10.2V20H13.5Z" fill="currentColor" />
                  </svg>
                ),
                label: 'Facebook',
                value: 'GetBuild',
                cta: 'Przejdź do profilu',
                delay: 0.78,
              },
            ].map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={(card as any).target}
                rel={(card as any).target ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.62, delay: card.delay, ease }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-200"
                style={{
                  minHeight: '180px',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.03)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.02)' }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                  {card.icon}
                </div>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{card.label}</div>
                  <div className="mt-1.5 text-[15px] font-semibold text-gray-900 break-all leading-snug">{card.value}</div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4 text-[13px] font-medium text-blue-600">
                  <span>{card.cta}</span>
                  <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
