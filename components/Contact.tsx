'use client'

import { m, useInView } from 'framer-motion'
import { useRef, useEffect, useState, type FormEvent } from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
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
    label: 'Email',
    fullName: 'getbuild.pl@gmail.com',
    href: `mailto:${contactEmail}`,
  },
  {
    label: 'Instagram',
    fullName: '@getbuild.pl',
    href: 'https://www.instagram.com/getbuild.pl/',
  },
  {
    label: 'Facebook',
    fullName: 'getbuild',
    href: 'https://www.facebook.com/profile.php?id=61588720012257',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
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
    <section id="kontakt" ref={ref} className="section-shell relative">
      <BackgroundPathsContact />
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.72, ease }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm p-6 sm:p-10 lg:p-14"
      >

        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col">
            <div>
              <span className="section-kicker">Kontakt</span>
              <h2 className="mt-2 text-[28px] sm:text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>
                Umów bezpłatną konsultację
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-[#6B7280]">
                Nie musisz podejmować decyzji od razu. Umów się na bezpłatną rozmowę i sprawdź, jaka ścieżka będzie dla Ciebie najlepsza.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7280] mb-3">Email</p>
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.15, ease }}
                  className="flex gap-2"
                >
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 bg-gray-100 hover:border-[#2563EB] hover:bg-[rgba(37,99,235,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-all flex items-center justify-between"
                  >
                    <span className="text-[13px] font-semibold text-[#111827] break-all">{contactEmail}</span>
                  </a>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-3 rounded-2xl border border-gray-300 bg-gray-100 hover:border-[#2563EB] hover:bg-[rgba(37,99,235,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-all flex items-center justify-center flex-shrink-0"
                    aria-label={copied ? 'Skopiowane!' : 'Skopiuj adres email'}
                    title={copied ? 'Skopiowane!' : 'Skopiuj email'}
                  >
                    {copied ? (
                      <span className="text-[12px] font-semibold text-[#2563EB]">Skopiowane!</span>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#111827]">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                    )}
                  </button>
                </m.div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7280] mb-3">Nasze konta</p>
                <div className="space-y-2">
                  {socials.map((s, i) => (
                    <m.a
                      key={s.label}
                      href={s.href}
                      target={s.label !== 'Email' ? '_blank' : undefined}
                      rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease }}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-[rgba(37,99,235,0.08)] hover:border-[rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer"
                      title={s.fullName}
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl ${
                          s.label === 'Email' ? 'bg-red-500' : s.label === 'Facebook' ? 'bg-[#1877f2]' : ''
                        }`}
                        style={
                          s.label === 'Instagram'
                            ? { background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)' }
                            : undefined
                        }
                      >
                        {s.label === 'Email' && <MdEmail size={22} className="text-white" />}
                        {s.label === 'Instagram' && <FaInstagram size={22} className="text-white" />}
                        {s.label === 'Facebook' && <FaFacebook size={22} className="text-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#111827] text-sm">{s.label}</p>
                        <p className="text-[#6B7280] text-xs mt-0.5 truncate">{s.fullName}</p>
                      </div>
                    </m.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 min-w-0 flex flex-col">
            <div className="text-center mb-8">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111827] mb-3">Umów spotkanie lub wyślij zapytanie</h3>
              <p className="text-[14px] text-[#6B7280]">Wybierz termin w kalendarzu lub skontaktuj się z nami bezpośrednio</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex justify-center">
                {!showCalendly ? (
                  <m.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.2, ease }}
                    onClick={() => setShowCalendly(true)}
                    className="btn btn-primary px-8 py-4 font-semibold"
                  >
                    Umów spotkanie w dogodnym dla Ciebie czasie
                  </m.button>
                ) : (
                  <div ref={calendlyRef} className="calendly-widget w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]" style={{ minHeight: '500px' }} />
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-full max-w-xl">
                  <div className="text-center mb-6">
                    <h4 className="text-[16px] font-bold text-[#111827] mb-2">Lub wyślij nam zapytanie</h4>
                    <p className="text-[13px] text-[#6B7280]">Masz pytanie? Chętnie je czytamy. Odpowiemy tak szybko jak się da.</p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(29,78,216,0.06)]">
                    {submitted ? (
                      <div className="text-center py-8" role="alert" aria-live="polite">
                        <div className="mb-4 text-4xl" aria-hidden="true">✓</div>
                        <h3 className="text-lg font-bold text-[#111827] mb-2">Dziękujemy!</h3>
                        <p className="text-[14px] text-[#6B7280]">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] mb-2">Imię i nazwisko *</label>
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
                          <label htmlFor="email" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] mb-2">Email *</label>
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
                          <label htmlFor="message" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7280] mb-2">Wiadomość *</label>
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

                        <button type="submit" className="w-full btn btn-primary py-3 font-semibold">Wyślij wiadomość</button>
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
