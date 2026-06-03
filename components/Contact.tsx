'use client'

import { m, useInView } from 'framer-motion'
import { useRef, useEffect, useState, type FormEvent } from 'react'
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
  const calendlyRef = useRef<HTMLDivElement>(null)
  const [showCalendly, setShowCalendly] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!showCalendly) return

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => {
      const w = window as CalendlyScriptWindow
      if (w.Calendly && calendlyRef.current) {
        w.Calendly.initInlineWidget({
          url: 'https://calendly.com/getbuild-pl/30min',
          parentElement: calendlyRef.current,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          if (data.redirectUrl) {
            window.open(data.redirectUrl, '_blank')
          }
          setSubmitted(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Form submission failed:', error)
    }
  }

  return (
    <section id="kontakt" ref={ref} className="section-shell relative" style={{ background: 'var(--bg)' }}>
      <BackgroundPathsContact />
      <m.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, ease }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-10 lg:p-14"
        style={{ boxShadow: '0 1px 3px rgba(13,22,41,0.06), 0 6px 24px rgba(13,22,41,0.06), 0 16px 64px rgba(37,99,235,0.07), inset 0 1px 0 rgba(255,255,255,0.9)' }}
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
                Nie musisz podejmować decyzji od razu. Umów się na bezpłatną rozmowę i sprawdź jaka ścieżka będzie dla Ciebie najlepsza.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280] mb-3">Email</p>
                <m.div
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
                </m.div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280] mb-3">Media społecznościowe</p>
                <div className="flex gap-3">
                  {socials.map((s, i) => (
                    <m.a
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
                    </m.a>
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

          <div className="w-full flex-1 min-w-0 flex flex-col">
            <div className="text-center mb-8">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0A0A0F] mb-3">Umów spotkanie lub wyślij zapytanie</h3>
              <p className="text-[14px] text-[#6b7280]">Wybierz termin w kalendarzu lub skontaktuj się z nami bezpośrednio</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex justify-center">
                {!showCalendly ? (
                  <m.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.2, ease }}
                    onClick={() => setShowCalendly(true)}
                    className="px-8 py-4 rounded-2xl bg-[#2563EB] text-white font-semibold text-[15px] hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-all"
                  >
                    Umów spotkanie w dogodnym dla Ciebie czasie
                  </m.button>
                ) : (
                  <div ref={calendlyRef} className="calendly-widget w-full rounded-2xl overflow-hidden border border-[#e5e7eb]" style={{ minHeight: '500px' }} />
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-full max-w-xl">
                  <div className="text-center mb-6">
                    <h4 className="text-[16px] font-bold text-[#0A0A0F] mb-2">Lub wyślij nam zapytanie</h4>
                    <p className="text-[13px] text-[#6b7280]">Masz pytanie? Chętnie je czytamy. Odpowiemy tak szybko jak się da.</p>
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] bg-white p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="mb-4 text-4xl">✓</div>
                        <h3 className="text-lg font-bold text-[#0A0A0F] mb-2">Dziękujemy!</h3>
                        <p className="text-[14px] text-[#6b7280]">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] mb-2">Imię i nazwisko *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Jan Kowalski"
                            className="form-input"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] mb-2">Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="jan@example.com"
                            className="form-input"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--muted)] mb-2">Wiadomość *</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Twoja wiadomość..."
                            rows={4}
                            className="form-input resize-none"
                          />
                        </div>

                        <button type="submit" className="w-full btn btn-primary py-3">Wyślij wiadomość</button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </section>
  )
}
