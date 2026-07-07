'use client'

import { m, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaInstagram, FaRedditAlien, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { Check, ChevronDown } from 'lucide-react'

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
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [gdprAccepted, setGdprAccepted] = useState(false)
  const [activeTab, setActiveTab] = useState<'calendly' | 'form'>('form')
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!dropdownOpen) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

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

  const subjects = ['Strona internetowa', 'SEO', 'Agenci AI', 'Automatyzacje AI', 'Inne']

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
      <m.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        data-fade-in
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_8px_40px_rgba(0,0,0,0.5),_0_40px_100px_-40px_rgba(34,211,238,0.08)] p-6 sm:p-10 lg:p-14"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 30%), #11161F' }}
      >

          <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-12">
            <div className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0 flex flex-col">
              <div>
                <span className="section-kicker" suppressHydrationWarning>Kontakt</span>
                <h2 className="mt-2 text-[26px] sm:text-[30px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Umów bezpłatną konsultację
                </h2>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#A6B2C4]">
                  Nie musisz podejmować decyzji od razu. Umów się na bezpłatną rozmowę i sprawdź, jaka ścieżka będzie dla Ciebie najlepsza.
                </p>
                <button
                  onClick={() => setActiveTab('calendly')}
                  className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22D3EE] text-[#06141A] text-[13px] font-bold hover:bg-[#34E6FF] active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 w-fit"
                >
                  Umów spotkanie
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C879B] mb-2">Email</p>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#22D3EE] hover:bg-[rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-[border-color,background-color] duration-200 ease-out flex items-center"
                    >
                      <span className="text-[12px] font-semibold text-[#EAF0F7] break-all">{contactEmail}</span>
                    </a>
                    <button
                      onClick={copyEmail}
                      className="px-2.5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#22D3EE] hover:bg-[rgba(34,211,238,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 transition-[border-color,background-color] duration-200 ease-out flex items-center justify-center flex-shrink-0"
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
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C879B] mb-3">Nasze konta</p>
                  <div className="flex flex-col gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.label !== 'Email' ? '_blank' : undefined}
                        rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-[border-color,background-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 ${
                          s.label === 'Email' ? 'border-[rgba(234,113,42,0.2)] bg-[rgba(234,113,42,0.06)] hover:bg-[rgba(234,113,42,0.14)] hover:border-[rgba(234,113,42,0.5)]'
                          : s.label === 'Instagram' ? 'border-[rgba(225,48,108,0.2)] bg-[rgba(225,48,108,0.06)] hover:bg-[rgba(225,48,108,0.14)] hover:border-[rgba(225,48,108,0.5)]'
                          : s.label === 'Facebook' ? 'border-[rgba(24,119,242,0.2)] bg-[rgba(24,119,242,0.06)] hover:bg-[rgba(24,119,242,0.14)] hover:border-[rgba(24,119,242,0.5)]'
                          : s.label === 'X' ? 'border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)]'
                          : s.label === 'Reddit' ? 'border-[rgba(255,69,0,0.2)] bg-[rgba(255,69,0,0.06)] hover:bg-[rgba(255,69,0,0.14)] hover:border-[rgba(255,69,0,0.5)]'
                          : 'border-[rgba(105,201,208,0.2)] bg-[rgba(105,201,208,0.06)] hover:bg-[rgba(105,201,208,0.14)] hover:border-[rgba(105,201,208,0.5)]'
                        }`}
                      >
                        <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg ${
                          s.label === 'Email' ? 'text-[#EA712A]'
                          : s.label === 'Instagram' ? 'text-[#E1306C]'
                          : s.label === 'Facebook' ? 'text-[#1877F2]'
                          : s.label === 'X' ? 'text-[#EAF0F7]'
                          : s.label === 'Reddit' ? 'text-[#FF4500]'
                          : 'text-[#69C9D0]'
                        }`}>
                          {s.label === 'Email' && <MdEmail size={16} />}
                          {s.label === 'Instagram' && <FaInstagram size={14} />}
                          {s.label === 'Facebook' && <FaFacebook size={14} />}
                          {s.label === 'X' && <FaXTwitter size={14} />}
                          {s.label === 'Reddit' && <FaRedditAlien size={14} />}
                          {s.label === 'TikTok' && <FaTiktok size={14} />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-[#EAF0F7] leading-tight">{s.label}</p>
                          <p className="text-[11px] text-[#7C879B] truncate">{s.fullName}</p>
                        </div>
                        <svg className="ml-auto flex-shrink-0 text-[#7C879B] group-hover:text-[#A6B2C4] transition-colors" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-[color,background-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                    activeTab === 'calendly'
                      ? 'bg-[#22D3EE] text-[#06141A] shadow-[0_2px_8px_rgba(34,211,238,0.3)]'
                      : 'text-[#A6B2C4] hover:text-[#EAF0F7]'
                  }`}
                >
                  Umów spotkanie
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-[color,background-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                    activeTab === 'form'
                      ? 'bg-[#22D3EE] text-[#06141A] shadow-[0_2px_8px_rgba(34,211,238,0.3)]'
                      : 'text-[#A6B2C4] hover:text-[#EAF0F7]'
                  }`}
                >
                  Wyślij zapytanie
                </button>
              </div>

              <div ref={calendlyRef} className="calendly-widget w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]" style={{ minHeight: '750px', height: '750px', display: activeTab === 'calendly' ? 'block' : 'none' }} />
              <div style={{ display: activeTab === 'form' ? 'block' : 'none' }} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(34,211,238,0.12)]">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jan@firma.pl" className="form-input" />
                  </div>
                  <div ref={dropdownRef} className="relative">
                    <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">
                      Czego dotyczy wiadomość?
                    </label>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(o => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      className="form-input w-full flex items-center justify-between gap-3 text-left"
                      style={{
                        borderColor: dropdownOpen ? 'rgba(34,211,238,0.6)' : undefined,
                        boxShadow: dropdownOpen ? '0 0 0 3px rgba(34,211,238,0.12)' : undefined,
                      }}
                    >
                      <span className={formData.subject ? 'text-[#EAF0F7]' : 'text-[#4A5568]'}>
                        {formData.subject || 'Wybierz temat…'}
                      </span>
                      <ChevronDown
                        size={16}
                        className="flex-shrink-0 text-[#7C879B] transition-transform duration-200"
                        style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <m.ul
                          role="listbox"
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[rgba(34,211,238,0.18)] bg-[#161C28] shadow-[0_8px_32px_rgba(0,0,0,0.55),_0_2px_8px_rgba(0,0,0,0.4)] list-none p-1.5 m-0"
                        >
                          {subjects.map((s) => {
                            const selected = formData.subject === s
                            return (
                              <li
                                key={s}
                                role="option"
                                aria-selected={selected}
                                onClick={() => {
                                  setFormData({ ...formData, subject: s })
                                  setDropdownOpen(false)
                                }}
                                className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg cursor-pointer text-[13px] font-medium transition-[background-color,color] duration-100 select-none"
                                style={{
                                  background: selected ? 'rgba(34,211,238,0.12)' : undefined,
                                  color: selected ? '#22D3EE' : '#A6B2C4',
                                }}
                                onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                                onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = '' }}
                              >
                                {s}
                                {selected && <Check size={14} strokeWidth={2.5} className="flex-shrink-0" />}
                              </li>
                            )
                          })}
                        </m.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Wiadomość *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Opisz swój projekt lub pytanie w kilku zdaniach — im więcej szczegółów, tym lepiej dopasujemy rozwiązanie." rows={5} className="form-input resize-none" />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="gdpr" checked={gdprAccepted} onChange={(e) => setGdprAccepted(e.target.checked)} required className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border border-[rgba(255,255,255,0.2)] bg-[#161C28] accent-[#22D3EE]" />
                    <label
                      htmlFor="gdpr"
                      aria-label="Wyrażam zgodę na przetwarzanie moich danych osobowych przez Getbuild w celu odpowiedzi na zapytanie, zgodnie z Polityką prywatności. Pole wymagane."
                      className="text-[12px] leading-[1.6] text-[#7C879B] cursor-pointer"
                    >
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
            </div>
          </div>
      </m.div>
    </section>
  )
}

