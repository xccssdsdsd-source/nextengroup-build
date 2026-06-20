'use client'

import { m, useInView } from 'framer-motion'
import { useRef, useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaInstagram, FaRedditAlien, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
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
  {
    label: 'X',
    fullName: '@getbuildpl',
    href: 'https://x.com/getbuildpl',
  },
  {
    label: 'Reddit',
    fullName: 'u/getbuildpl',
    href: 'https://www.reddit.com/user/getbuildpl/',
  },
  {
    label: 'TikTok',
    fullName: '@getbuild.pl',
    href: 'https://www.tiktok.com/@getbuild.pl',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [copied, setCopied] = useState(false)
  const calendlyRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [gdprAccepted, setGdprAccepted] = useState(false)
  const [activeTab, setActiveTab] = useState<'calendly' | 'form'>('form')
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (activeTab !== 'calendly' || calendlyLoaded) return
    const existing = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')
    const initWidget = () => {
      const w = window as CalendlyScriptWindow
      if (w.Calendly && calendlyRef.current) {
        w.Calendly.initInlineWidget({
          url: 'https://calendly.com/getbuild-pl/30min',
          parentElement: calendlyRef.current,
        })
        setCalendlyLoaded(true)
      }
    }
    if (existing) {
      initWidget()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = initWidget
    document.body.appendChild(script)
  }, [activeTab, calendlyLoaded])

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
            <div className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0 flex flex-col">
              <div>
                <span className="section-kicker" suppressHydrationWarning>Kontakt</span>
                <h2 className="mt-2 text-[26px] sm:text-[30px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-syne)' }}>
                  Umów bezpłatną konsultację
                </h2>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#A6B2C4]">
                  Nie musisz podejmować decyzji od razu. Umów się na bezpłatną rozmowę i sprawdź, jaka ścieżka będzie dla Ciebie najlepsza.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C879B] mb-2">Email</p>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#22D3EE] hover:bg-[rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-all flex items-center"
                    >
                      <span className="text-[12px] font-semibold text-[#EAF0F7] break-all">{contactEmail}</span>
                    </a>
                    <button
                      onClick={copyEmail}
                      className="px-2.5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#22D3EE] hover:bg-[rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-all flex items-center justify-center flex-shrink-0"
                      aria-label={copied ? 'Skopiowane!' : 'Skopiuj adres email'}
                      title={copied ? 'Skopiowane!' : 'Skopiuj email'}
                    >
                      {copied ? (
                        <span className="text-[11px] font-semibold text-[#22D3EE]">OK</span>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#EAF0F7]">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C879B] mb-2">Nasze konta</p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.label !== 'Email' ? '_blank' : undefined}
                        rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        title={s.fullName}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(34,211,238,0.12)] hover:border-[rgba(34,211,238,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-all duration-200"
                      >
                        {s.label === 'Email' && <MdEmail size={15} className="text-[#A6B2C4]" />}
                        {s.label === 'Instagram' && <FaInstagram size={15} className="text-[#A6B2C4]" />}
                        {s.label === 'Facebook' && <FaFacebook size={15} className="text-[#A6B2C4]" />}
                        {s.label === 'X' && <FaXTwitter size={15} className="text-[#A6B2C4]" />}
                        {s.label === 'Reddit' && <FaRedditAlien size={15} className="text-[#A6B2C4]" />}
                        {s.label === 'TikTok' && <FaTiktok size={15} className="text-[#A6B2C4]" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex-1 min-w-0 flex flex-col">
              <div className="flex gap-1 p-1 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] mb-6 w-fit">
                <button
                  onClick={() => setActiveTab('calendly')}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                    activeTab === 'calendly'
                      ? 'bg-[#22D3EE] text-[#06141A] shadow-[0_2px_8px_rgba(34,211,238,0.3)]'
                      : 'text-[#A6B2C4] hover:text-[#EAF0F7]'
                  }`}
                >
                  Umów spotkanie
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                    activeTab === 'form'
                      ? 'bg-[#22D3EE] text-[#06141A] shadow-[0_2px_8px_rgba(34,211,238,0.3)]'
                      : 'text-[#A6B2C4] hover:text-[#EAF0F7]'
                  }`}
                >
                  Wyślij zapytanie
                </button>
              </div>

              {activeTab === 'calendly' ? (
                <div ref={calendlyRef} className="calendly-widget w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]" style={{ minHeight: '750px', height: '750px' }} />
              ) : (
                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(34,211,238,0.12)]">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Imię i nazwisko *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Jan Kowalski" className="form-input" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jan@firma.pl" className="form-input" />
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
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Opisz swój projekt lub pytanie w kilku zdaniach — im więcej szczegółów, tym lepiej dopasujemy rozwiązanie." rows={5} className="form-input resize-none" />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="gdpr" checked={gdprAccepted} onChange={(e) => setGdprAccepted(e.target.checked)} required className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border border-[rgba(255,255,255,0.2)] bg-[#161C28] accent-[#22D3EE]" />
                      <label htmlFor="gdpr" className="text-[12px] leading-[1.6] text-[#7C879B] cursor-pointer">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych przez Getbuild w celu odpowiedzi na zapytanie, zgodnie z{' '}
                        <a href="/polityka-prywatnosci" className="text-[#22D3EE] hover:text-[#5EEAFF] underline underline-offset-2 transition-colors">Polityką prywatności</a>. *
                      </label>
                    </div>
                    {error && <p className="text-[13px] text-red-400" role="alert">Coś poszło nie tak. Spróbuj ponownie lub napisz na getbuild.pl@gmail.com.</p>}
                    <button type="submit" disabled={sending || !gdprAccepted} className="w-full btn btn-primary py-3.5 font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
                      {sending ? 'Wysyłanie…' : 'Wyślij zapytanie'}
                    </button>
                    <p className="text-center text-[11px] text-[#7C879B]">Bez spamu. Bez zobowiązań. Odpowiadamy w&nbsp;ciągu 24&nbsp;h.</p>
                  </form>
                </div>
              )}
            </div>
          </div>
      </m.div>
    </section>
  )
}
