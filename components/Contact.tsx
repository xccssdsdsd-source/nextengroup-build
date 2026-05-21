'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'getbuild.pl@gmail.com'

const socials = [
  {
    label: 'Gmail',
    href: `mailto:${contactEmail}`,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
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
    href: 'https://www.instagram.com/getbuild.pl/',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
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
    href: 'https://www.facebook.com/profile.php?id=61588720012257',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#1877F2" />
        <path fill="white" d="M32 24h-5v-3c0-1.4.3-2 2.2-2H32v-5h-4c-5 0-7 3-7 7v3h-4v5h4v14h5V29h4.5l.5-5z" />
      </svg>
    ),
  },
]

function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url="https://calendly.com/getbuild-pl/30min"
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
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
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200/60 bg-white p-8 sm:p-12 lg:p-16"
        style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.03), 0 24px 64px rgba(0,85,255,0.06)' }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#0055FF]/20 to-transparent" />

        <div className="relative">
          <div className="text-center mb-10">
            <span className="section-kicker text-blue-400">Kontakt</span>
            <h2 className="section-title text-gray-900">Porozmawiajmy o Twojej firmie</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#6B7280]">
              Napisz, zadzwoń lub znajdź mnie w social media. Odpowiem tego samego dnia.
            </p>

            <div className="mt-8 flex items-center justify-center gap-8">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease }}
                  whileHover={{ y: -5, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2"
                >
                  {s.icon}
                  <span className="text-[12px] font-medium text-[#9CA3AF]">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <p className="text-center text-[13px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-4">
              Zarezerwuj termin spotkania
            </p>
            <CalendlyWidget />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
