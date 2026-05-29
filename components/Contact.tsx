'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import BackgroundPathsContact from './BackgroundPathsContact'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'getbuild.pl@gmail.com'
const calendlyUrl = 'https://calendly.com/getbuild'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/getbuild.pl/',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <radialGradient id="ig-c2" cx="30%" cy="107%" r="130%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#ig-c2)" />
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
      <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="10" fill="#1877F2" />
        <path fill="white" d="M32 24h-5v-3c0-1.4.3-2 2.2-2H32v-5h-4c-5 0-7 3-7 7v3h-4v5h4v14h5V29h4.5l.5-5z" />
      </svg>
    ),
  },
]

const contactTopics = [
  { value: 'strony-www', label: 'Strony WWW', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )},
  { value: 'automatyzacje-ai', label: 'Automatyzacje AI', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )},
  { value: 'agenci-ai', label: 'Agenci AI', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  )},
  { value: 'inne', label: 'Inne', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )},
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)
  const [topic, setTopic] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl })
    } else {
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const topicLabel = contactTopics.find(t => t.value === topic)?.label ?? topic
    const subject = encodeURIComponent(`Zapytanie: ${topicLabel}`)
    const body = encodeURIComponent(`Imię: ${name}\nTemat: ${topicLabel}\n\nWiadomość:\n${message}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
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

        <div className="relative">
          {/* Header */}
          <div className="mb-10">
            <span className="section-kicker">Kontakt</span>
            <h2 className="mt-2 text-[28px] sm:text-[34px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>
              Zacznijmy rozmawiać
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-[#6b7280] max-w-xl">
              Umów bezpłatną rozmowę lub napisz wiadomość – odpowiemy w ciągu 24 godzin.
            </p>
          </div>

          {/* Two cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Card 1: Calendly booking */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="relative flex flex-col rounded-2xl border border-[#e5e7eb] overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e40af 100%)' }}
            >
              {/* Decorative dots */}
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
              {/* Glow */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.18) 0%, transparent 70%)' }} />

              <div className="relative flex flex-col flex-1 p-7 sm:p-9">
                {/* Calendar icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>

                <h3 className="text-[22px] font-bold text-white leading-tight mb-3" style={{ fontFamily: 'var(--font-syne)' }}>
                  Zarezerwuj rozmowę
                </h3>
                <p className="text-[14px] text-blue-200 leading-[1.75] mb-8 flex-1">
                  Bezpłatna 15-minutowa konsultacja. Sprawdź, jak rozwiązania IT i AI mogą wspomóc Twój biznes. Zero zobowiązań.
                </p>

                {/* Mini time slots visual */}
                <div className="flex gap-2 flex-wrap mb-8">
                  {['Pon–Pt', '9:00–17:00', '15 min'].map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-full text-[12px] font-medium text-blue-100" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  onClick={openCalendly}
                  className="group flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl font-bold text-[15px] text-[#0f172a] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)', boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Zarezerwuj rozmowę
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Card 2: Contact form → Gmail */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="flex flex-col rounded-2xl border border-[#e5e7eb] bg-white"
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(37,99,235,0.06)' }}
            >
              <div className="flex flex-col flex-1 p-7 sm:p-9">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#eff6ff] border border-[#bfdbfe]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>

                <h3 className="text-[22px] font-bold text-[#0A0A0F] leading-tight mb-3" style={{ fontFamily: 'var(--font-syne)' }}>
                  Napisz do nas
                </h3>
                <p className="text-[14px] text-[#6b7280] leading-[1.7] mb-6">
                  Wypełnij formularz, a my odpowiemy na Twoje pytania.
                </p>

                <form onSubmit={handleContactSubmit} className="flex flex-col flex-1 gap-5">
                  {/* Topic chips */}
                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-widest text-[#6b7280] mb-3">
                      Temat
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {contactTopics.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setTopic(t.value)}
                          className={`flex items-center gap-2 px-3.5 py-3 rounded-xl border text-[13px] font-semibold transition-all duration-150 text-left ${
                            topic === t.value
                              ? 'border-[#2563EB] bg-[#eff6ff] text-[#2563EB]'
                              : 'border-[#e5e7eb] bg-white text-[#374151] hover:border-[#93c5fd] hover:bg-[#f8faff]'
                          }`}
                        >
                          <span className={topic === t.value ? 'text-[#2563EB]' : 'text-[#9ca3af]'}>
                            {t.icon}
                          </span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-[12px] font-semibold uppercase tracking-widest text-[#6b7280] mb-2">
                      Imię i nazwisko
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jan Kowalski"
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[14px] text-[#0A0A0F] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex-1">
                    <label htmlFor="contact-msg" className="block text-[12px] font-semibold uppercase tracking-widest text-[#6b7280] mb-2">
                      Wiadomość
                    </label>
                    <textarea
                      id="contact-msg"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      placeholder="Opowiedz nam o swoim projekcie..."
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[14px] text-[#0A0A0F] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2.5 w-full btn btn-primary py-3.5 text-[15px] font-bold"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Wyślij wiadomość
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                  <p className="text-center text-[12px] text-[#9ca3af]">
                    Otworzy Gmail z wypełnioną wiadomością
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Bottom: email + socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease }}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280]">Email bezpośredni</p>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[14px] font-semibold text-[#0A0A0F] hover:text-[#2563EB] transition-colors"
                >
                  {contactEmail}
                </a>
                <button
                  onClick={copyEmail}
                  className="px-2.5 py-1.5 rounded-lg border border-[#e5e7eb] bg-white hover:border-[#2563EB] hover:bg-[#eff6ff] transition-all text-[12px] font-semibold text-[#6b7280] hover:text-[#2563EB]"
                  title="Skopiuj email"
                >
                  {copied ? 'Skopiowane!' : 'Kopiuj'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b7280]">Media społecznościowe</p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
