'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
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
          <p className="mt-4 max-w-2xl text-lg text-gray-600">Rozwiązania dopasowane do Twoich potrzeb i realnych wyzwań biznesowych.</p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                href: `mailto:${contactEmail}`,
                icon: (
                  <svg width="26" height="20" viewBox="0 0 52 40" aria-hidden="true">
                    <path fill="#4285F4" d="M2 0h48l-24 22L2 0z" />
                    <path fill="#EA4335" d="M0 2v36l14-18L0 2z" />
                    <path fill="#34A853" d="M52 2v36L38 20 52 2z" />
                    <path fill="#FBBC05" d="M2 38h48L38 20 26 31 14 20 2 38z" />
                    <path fill="#EA4335" d="M2 0L26 22 50 0H2z" />
                  </svg>
                ),
                label: 'E-mail',
                value: contactEmail,
                cta: 'Napisz do nas',
                iconBg: 'bg-white',
                delay: 0.5,
              },
              {
                href: 'https://www.instagram.com/getbuild.pl/',
                target: '_blank',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
                    <defs>
                      <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect width="48" height="48" rx="12" fill="url(#ig-grad)" />
                    <rect x="13" y="13" width="22" height="22" rx="6" fill="none" stroke="white" strokeWidth="2.5" />
                    <circle cx="24" cy="24" r="6" fill="none" stroke="white" strokeWidth="2.5" />
                    <circle cx="31.5" cy="16.5" r="1.5" fill="white" />
                  </svg>
                ),
                label: 'Instagram',
                value: '@getbuild.pl',
                cta: 'Przejdź do profilu',
                iconBg: 'bg-white',
                delay: 0.64,
              },
              {
                href: 'https://www.facebook.com/profile.php?id=61588720012257',
                target: '_blank',
                icon: (
                  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
                    <rect width="48" height="48" rx="10" fill="#1877F2" />
                    <path fill="white" d="M32 24h-5v-3c0-1.4.3-2 2.2-2H32v-5h-4c-5 0-7 3-7 7v3h-4v5h4v14h5V29h4.5l.5-5z" />
                  </svg>
                ),
                label: 'Facebook',
                value: 'GetBuild',
                cta: 'Przejdź do profilu',
                iconBg: 'bg-white',
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
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${(card as any).iconBg ?? 'bg-blue-100'} transition-transform duration-300 group-hover:scale-110`}>
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
