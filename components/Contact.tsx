'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import BackgroundPathsContact from './BackgroundPathsContact'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'getbuild.pl@gmail.com'

interface CalendlyScriptWindow extends Window {
  Calendly?: {
    initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
  }
}

const socials = [
  {
    label: 'Instagram',
    fullName: 'Instagram',
    href: 'https://www.instagram.com/getbuild.pl/',
    icon: (
      <svg width="56" height="56" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <radialGradient id="ig-c" cx="30%" cy="107%" r="130%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#ig-c)" />
        <rect x="13" y="13" width="22" height="22" rx="6" fill="none" stroke="white" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="6" fill="none" stroke="white" strokeWidth="2.5" />
        <circle cx="31.5" cy="16.5" r="1.5" fill="white" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    fullName: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61588720012257',
    icon: (
      <svg width="56" height="56" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#1877F2" />
        <path fill="white" d="M32 24h-5v-3c0-1.4.3-2 2.2-2H32v-5h-4c-5 0-7 3-7 7v3h-4v5h4v14h5V29h4.5l.5-5z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const calendlyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showCalendly || !calendlyRef.current) return

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => {
      const w = window as CalendlyScriptWindow
      if (w.Calendly) {
        w.Calendly.initInlineWidget({
          url: 'https://calendly.com/getbuild-pl/30min',
          parentElement: calendlyRef.current!,
        })
      }
    }
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [showCalendly])

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="kontakt" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
      <BackgroundPathsContact />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, ease }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-10 lg:p-14"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(37,99,235,0.10)' }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.015) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-3xl bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" />

        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col">
            <div>
              <span className="section-kicker">Kontakt</span>
              <h2 className="mt-2 text-[28px] sm:text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>
                Umów bezpłatną konsultację
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-[#6b7280]">
                Nie musisz podejmować decyzji od razu. Umów się na bezpłatną 15-minutową rozmowę i sprawdź, jak rozwiązania IT oraz AI mogą rzeczywiście wspomóc Twój biznes.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280] mb-3">Email</p>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.15, ease }}
                  className="flex gap-2"
                >
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex-1 px-4 py-3 rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#2563EB] hover:bg-[#eff6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-all flex items-center justify-between"
                  >
                    <span className="text-[13px] font-semibold text-[#0A0A0F] break-all">{contactEmail}</span>
                  </a>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-3 rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#2563EB] hover:bg-[#eff6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-all flex items-center justify-center flex-shrink-0"
                    title={copied ? 'Skopiowane!' : 'Skopiuj email'}
                  >
                    {copied ? (
                      <span className="text-[12px] font-semibold text-[#2563EB]">Skopiowane!</span>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A0A0F]">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                    )}
                  </button>
                </motion.div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280] mb-3">Media społecznościowe</p>
                <div className="flex gap-3">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center rounded-xl hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-all"
                      title={s.fullName}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
                <div className="flex gap-3 mt-3 text-[11px] text-[#6b7280]">
                  {socials.map(s => (
                    <span key={s.label}>{s.fullName}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 min-w-0 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowCalendly(true)}
              className="btn btn-primary py-4 px-8 text-lg"
            >
              Umów spotkanie
            </button>
            {showCalendly && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden">
                  <button
                    onClick={() => setShowCalendly(false)}
                    className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                    aria-label="Zamknij"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <div ref={calendlyRef} className="calendly-widget" style={{ minHeight: '700px' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
