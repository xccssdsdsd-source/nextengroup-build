'use client'

import { m, useInView } from 'framer-motion'
import { useRef, useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import dynamic from 'next/dynamic'
const BackgroundPathsContact = dynamic(() => import('./BackgroundPathsContact'), { ssr: false })

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
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [gdprAccepted, setGdprAccepted] = useState(false)
  const router = useRouter()

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

  const subjects = ['Strona internetowa', 'Sklep online', 'SEO', 'Agenci AI', 'Automatyzacje AI', 'Inne']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('failed')
      router.push('/dziekujemy')
    } catch {
      setError(true)
      setSending(false)
    }
  }

  return (
    <section id="kontakt" ref={ref} className="section-shell relative" data-no-entrance suppressHydrationWarning>
      <BackgroundPathsContact />
      <m.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#11161F] shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-6 sm:p-10 lg:p-14"
      >

        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col">
            <div>
              <span className="section-kicker" suppressHydrationWarning>Kontakt</span>
              <h2 className="mt-2 text-[28px] sm:text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-syne)' }}>
                Umów bezpłatną konsultację
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-[#A6B2C4]">
                Nie musisz podejmować decyzji od razu. Umów się na bezpłatną rozmowę i sprawdź, jaka ścieżka będzie dla Ciebie najlepsza.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C879B] mb-3">Email</p>
                <m.div
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease }}
                  className="flex gap-2"
                >
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex-1 px-4 py-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#22D3EE] hover:bg-[rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-all flex items-center justify-between"
                  >
                    <span className="text-[13px] font-semibold text-[#EAF0F7] break-all">{contactEmail}</span>
                  </a>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#22D3EE] hover:bg-[rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-all flex items-center justify-center flex-shrink-0"
                    aria-label={copied ? 'Skopiowane!' : 'Skopiuj adres email'}
                    title={copied ? 'Skopiowane!' : 'Skopiuj email'}
                  >
                    {copied ? (
                      <span className="text-[12px] font-semibold text-[#22D3EE]">Skopiowane!</span>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#EAF0F7]">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                    )}
                  </button>
                </m.div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C879B] mb-3">Nasze konta</p>
                <div className="space-y-2">
                  {socials.map((s, i) => (
                    <m.a
                      key={s.label}
                      href={s.href}
                      target={s.label !== 'Email' ? '_blank' : undefined}
                      rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease }}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(34,211,238,0.08)] hover:border-[rgba(34,211,238,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer"
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
                        <p className="font-semibold text-[#EAF0F7] text-sm">{s.label}</p>
                        <p className="text-[#A6B2C4] text-xs mt-0.5 truncate">{s.fullName}</p>
                      </div>
                    </m.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 min-w-0 flex flex-col">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xl">
                <div className="mb-6">
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[#EAF0F7] mb-2">Wyślij zapytanie</h3>
                  <p className="text-[14px] text-[#A6B2C4]">Opisz swój projekt — odpiszemy w ciągu 24&nbsp;godzin.</p>
                </div>

                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(34,211,238,0.12)]">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Imię i nazwisko *</label>
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
                      <label htmlFor="email" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jan@firma.pl"
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Czego dotyczy wiadomość?</label>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormData({ ...formData, subject: formData.subject === s ? '' : s })}
                            className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                              formData.subject === s
                                ? 'border-[#22D3EE] bg-[rgba(34,211,238,0.15)] text-[#22D3EE]'
                                : 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[#A6B2C4] hover:border-[#22D3EE] hover:text-[#EAF0F7]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Wiadomość *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Opisz swój projekt lub pytanie w kilku zdaniach — im więcej szczegółów, tym lepiej dopasujemy rozwiązanie."
                        rows={4}
                        className="form-input resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="gdpr"
                        checked={gdprAccepted}
                        onChange={(e) => setGdprAccepted(e.target.checked)}
                        required
                        className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border border-[rgba(255,255,255,0.2)] bg-[#161C28] accent-[#22D3EE]"
                      />
                      <label htmlFor="gdpr" className="text-[12px] leading-[1.6] text-[#7C879B] cursor-pointer">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych przez Getbuild w celu odpowiedzi na zapytanie, zgodnie z{' '}
                        <a href="/polityka-prywatnosci" className="text-[#22D3EE] hover:text-[#5EEAFF] underline underline-offset-2 transition-colors">
                          Polityką prywatności
                        </a>
                        . *
                      </label>
                    </div>

                    {error && <p className="text-[13px] text-red-400" role="alert">Coś poszło nie tak. Spróbuj ponownie lub napisz na getbuild.pl@gmail.com.</p>}

                    <button
                      type="submit"
                      disabled={sending || !gdprAccepted}
                      className="w-full btn btn-primary py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Wysyłanie…' : 'Wyślij zapytanie'}
                    </button>

                    <p className="text-center text-[11px] text-[#7C879B]">
                      Bez spamu. Bez zobowiązań. Odpowiadamy w&nbsp;ciągu 24&nbsp;h.
                    </p>
                  </form>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-[13px] text-[#7C879B] mb-3">Wolisz wybrać termin rozmowy?</p>
                  {!showCalendly ? (
                    <m.button
                      initial={false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.2, ease }}
                      onClick={() => setShowCalendly(true)}
                      className="btn btn-ghost px-6 py-3 text-sm font-semibold"
                    >
                      Umów spotkanie w kalendarzu
                    </m.button>
                  ) : (
                    <div ref={calendlyRef} className="calendly-widget w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]" style={{ minHeight: '500px' }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </section>
  )
}
