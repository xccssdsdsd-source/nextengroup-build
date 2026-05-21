'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'getbuild.pl@gmail.com'

const socials = [
  {
    label: 'Gmail',
    sub: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#4285F4" d="M4 8h40l-20 18L4 8z" />
        <path fill="#EA4335" d="M2 10v28l12-14L2 10z" />
        <path fill="#34A853" d="M46 10v28L34 24l12-14z" />
        <path fill="#FBBC05" d="M4 38h40L34 24 24 33 14 24 4 38z" />
        <path fill="#EA4335" d="M4 8l20 18L44 8H4z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    sub: '@getbuild.pl',
    href: 'https://www.instagram.com/getbuild.pl/',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
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
    sub: 'Getbuild.pl',
    href: 'https://www.facebook.com/profile.php?id=61588720012257',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#1877F2" />
        <path fill="white" d="M32 24h-5v-3c0-1.4.3-2 2.2-2H32v-5h-4c-5 0-7 3-7 7v3h-4v5h4v14h5V29h4.5l.5-5z" />
      </svg>
    ),
  },
]

function CalendlyWidget() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const init = () => {
      ;(window as any).Calendly?.initInlineWidget({
        url: 'https://calendly.com/getbuild-pl/30min?locale=pl',
        parentElement: el,
        prefill: {},
        utm: {},
      })
    }

    if ((window as any).Calendly) { init(); return }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = init
    document.head.appendChild(script)
  }, [])

  return <div ref={containerRef} style={{ minWidth: '320px', height: '700px' }} />
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="kontakt" ref={ref} className="section-shell relative bg-white">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200/60 bg-white p-8 sm:p-10 lg:p-14"
        style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 24px 64px rgba(0,85,255,0.06)' }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#0055FF]/20 to-transparent" />

        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-12 lg:items-stretch">
          <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="section-kicker text-blue-400">Kontakt</span>
                <h2 className="mt-2 text-[28px] sm:text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-gray-900">
                  Porozmawiajmy o&nbsp;Twojej firmie
                </h2>
                <p className="mt-3 text-[14px] leading-[1.75] text-[#6B7280]">
                  Odpowiem tego samego dnia. Wybierz wygodny sposób kontaktu lub zarezerwuj spotkanie.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 flex-1">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-0 hover:border-[#0055FF]/20 hover:bg-[#0055FF]/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2"
                  style={{ transition: 'background 0.2s, border-color 0.2s, transform 0.2s', minHeight: '72px' }}
                >
                  <span className="flex-shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-gray-900">{s.label}</p>
                    <p className="text-[11px] text-[#9CA3AF] truncate">{s.sub}</p>
                  </div>
                  <svg className="ml-auto flex-shrink-0 text-[#D1D5DB]" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.a>
              ))}

              <motion.a
                href="#calendly-widget"
                onClick={e => { e.preventDefault(); document.getElementById('calendly-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.5, ease }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0055FF] px-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2"
                style={{ minHeight: '72px', boxShadow: '0 4px 20px rgba(0,85,255,0.28)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="3" stroke="white" strokeWidth="1.8"/><path d="M3 9h18M8 2v4M16 2v4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <span className="text-[14px] font-semibold">Umów spotkanie</span>
              </motion.a>
            </div>
          </div>

          <div id="calendly-widget" className="w-full flex-1 min-w-0 flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">Zarezerwuj termin spotkania</p>
            <div className="rounded-2xl overflow-hidden border border-gray-100 flex-1" style={{ boxShadow: '0 2px 24px rgba(0,85,255,0.06)' }}>
              <CalendlyWidget />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
