'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
const contactEmail = 'getbuild.pl@gmail.com'

const socials = [
  {
    label: 'Gmail',
    sub: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#EA4335" />
        <path fill="white" d="M10 14h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2z" />
        <path fill="#EA4335" d="M8 16l16 12 16-12" stroke="#EA4335" strokeWidth="0" />
        <polyline points="8,16 24,28 40,16" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
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

const calendlyUrl = 'https://calendly.com/getbuild-pl/30min?locale=pl'

function CalendlyWidget({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    const init = () => {
      ;(window as any).Calendly?.initInlineWidget({
        url,
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
  }, [url])

  return <div ref={containerRef} className="w-full" style={{ height: 'clamp(560px, 70vh, 700px)' }} />
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
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-8 sm:p-10 lg:p-14"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(37,99,235,0.10)' }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent" />

        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-12 lg:items-stretch">
          <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="section-kicker">Kontakt</span>
                <h2 className="mt-2 text-[28px] sm:text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>
                  Porozmawiajmy o&nbsp;Twojej firmie
                </h2>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#6b7280]">
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
                  className="flex flex-1 items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-0 hover:border-[#2563EB] hover:bg-[#eff6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                  style={{ transition: 'background 0.2s, border-color 0.2s, transform 0.2s', minHeight: '72px' }}
                >
                  <span className="flex-shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#0A0A0F]">{s.label}</p>
                    <p className="text-[11px] text-[#6b7280] truncate">{s.sub}</p>
                  </div>
                  <svg className="ml-auto flex-shrink-0 text-[#d1d5db]" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.a>
              ))}

            </div>
          </div>

          <div id="calendly-widget" className="w-full flex-1 min-w-0 flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280] mb-3">Zarezerwuj termin spotkania</p>
            <div className="rounded-2xl overflow-hidden border border-[#e5e7eb] flex-1" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.06)' }}>
              <CalendlyWidget url={calendlyUrl} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
