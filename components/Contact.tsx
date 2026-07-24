'use client'

import { m, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaInstagram, FaRedditAlien, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { Check, ChevronDown } from 'lucide-react'
import SectionGlow from './ui/SectionGlow'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'getbuild.pl@gmail.com'

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
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [gdprAccepted, setGdprAccepted] = useState(false)
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

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const subjects = ['Strona internetowa', 'Chatbot AI', 'Automatyzacja procesu', 'Inne']

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
      <SectionGlow variant="contact" />
      <m.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        data-fade-in
        className="contact-panel relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_8px_40px_rgba(0,0,0,0.5),_0_40px_100px_-40px_rgba(58,175,232,0.08)] p-6 sm:p-10 lg:p-14 xl:p-16"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 30%), #11161F' }}
      >

          <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16">
            <div className="w-full lg:w-[290px] xl:w-[320px] flex-shrink-0 flex flex-col">
              <div>
                <span className="section-kicker" suppressHydrationWarning>Kontakt</span>
                <h2 data-motion-title className="mt-3 text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold leading-[1.07] tracking-[-0.04em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Umów bezpłatną konsultację
                </h2>
                <p data-motion-copy className="mt-5 text-[15px] leading-[1.75] text-[#A6B2C4]">
                  Nie musisz podejmować decyzji od razu. Umów się na bezpłatną rozmowę i sprawdź, jaka ścieżka będzie dla Ciebie najlepsza.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#7C879B] mb-2">Email</p>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#3AAFE8] hover:bg-[rgba(58,175,232,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3AAFE8] focus-visible:ring-offset-2 transition-[border-color,background-color] duration-200 ease-out flex items-center"
                    >
                      <span className="text-[12px] font-semibold text-[#EAF0F7] break-all">{contactEmail}</span>
                    </a>
                    <button
                      onClick={copyEmail}
                      className="px-2.5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#161C28] hover:border-[#3AAFE8] hover:bg-[rgba(58,175,232,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3AAFE8] focus-visible:ring-offset-2 transition-[border-color,background-color] duration-200 ease-out flex items-center justify-center flex-shrink-0"
                      aria-label={copied ? 'Skopiowane!' : 'Skopiuj adres email'}
                      title={copied ? 'Skopiowane!' : 'Skopiuj email'}
                    >
                      {copied ? (
                        <span className="text-[11px] font-semibold text-[#3AAFE8]">OK</span>
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
                        className={`contact-social group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-[border-color,background-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3AAFE8] focus-visible:ring-offset-2 ${
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

            <div className="w-full flex-1 min-w-0 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] items-start">
              <div className="min-w-0">
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3AAFE8] mb-2">Umów spotkanie</p>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Wybierz termin rozmowy
                  </h3>
                </div>
                <div className="calendly-widget w-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)]" style={{ minHeight: '680px', height: '680px' }}>
                  <iframe
                    title="Umów spotkanie z Getbuild"
                    src="https://calendly.com/getbuild-pl/30min?embed_type=Inline"
                    loading="lazy"
                    className="h-full w-full border-0"
                    allow="camera; microphone; fullscreen"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3AAFE8] mb-2">Napisz do nas</p>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Wyślij krótkie zapytanie
                  </h3>
                </div>
                <div className="contact-form-card rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(58,175,232,0.12)]">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  {...{
                    toolname: 'send_business_inquiry',
                    tooldescription: 'Sends a business inquiry to Getbuild about a website, AI chatbot, or process automation.',
                  }}
                >
                  <div>
                    <label htmlFor="email" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jan@firma.pl" className="form-input" autoComplete="email" {...{ toolparamdescription: 'Email address where Getbuild should send the reply.' }} />
                  </div>
                  <div ref={dropdownRef} className="relative">
                    <label id="inquiry-subject-label" className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A6B2C4] mb-2">
                      Czego dotyczy wiadomość?
                    </label>
                    <input
                      type="hidden"
                      name="subject"
                      value={formData.subject}
                      {...{ toolparamdescription: 'Inquiry topic: website, AI chatbot, process automation, or another subject.' }}
                    />
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(o => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      aria-labelledby="inquiry-subject-label inquiry-subject-value"
                      className="form-input w-full flex items-center justify-between gap-3 text-left"
                      style={{
                        borderColor: dropdownOpen ? 'rgba(58,175,232,0.6)' : undefined,
                        boxShadow: dropdownOpen ? '0 0 0 3px rgba(58,175,232,0.12)' : undefined,
                      }}
                    >
                      <span
                        id="inquiry-subject-value"
                        className={formData.subject ? 'text-[#EAF0F7]' : 'text-[#7C879B]'}
                      >
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
                          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[rgba(58,175,232,0.18)] bg-[#161C28] shadow-[0_8px_32px_rgba(0,0,0,0.55),_0_2px_8px_rgba(0,0,0,0.4)] list-none p-1.5 m-0"
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
                                  background: selected ? 'rgba(58,175,232,0.12)' : undefined,
                                  color: selected ? '#3AAFE8' : '#A6B2C4',
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
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Napisz krótko, czym zajmuje się firma i czego potrzebujesz. Wystarczą 2-3 zdania." rows={5} className="form-input resize-none" {...{ toolparamdescription: 'Short description of the company, project, and help needed.' }} />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="gdpr" name="privacy_consent" checked={gdprAccepted} onChange={(e) => setGdprAccepted(e.target.checked)} required className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border border-[rgba(255,255,255,0.2)] bg-[#161C28] accent-[#3AAFE8]" {...{ toolparamdescription: 'Confirms consent to process personal data in order to answer the inquiry.' }} />
                    <label htmlFor="gdpr" className="text-[12px] leading-[1.6] text-[#7C879B] cursor-pointer">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych przez Getbuild w celu odpowiedzi na zapytanie, zgodnie z{' '}
                      <a href="/polityka-prywatnosci" className="text-[#3AAFE8] hover:text-[#8CD8FF] underline underline-offset-2 transition-colors">Polityką prywatności</a>. *
                    </label>
                  </div>
                  {error && <p className="text-[13px] text-red-400" role="alert">Coś poszło nie tak. Spróbuj ponownie lub napisz na getbuild.pl@gmail.com.</p>}
                  <button type="submit" disabled={sending || !gdprAccepted} className="w-full btn btn-primary py-3.5 font-semibold disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                    {sending && <span className="h-4 w-4 rounded-full border-2 border-[#06141A]/30 border-t-[#06141A] animate-spin" aria-hidden="true" />}
                    {sending ? 'Wysyłanie…' : 'Wyślij zapytanie'}
                  </button>
                  <p className="text-center text-[11px] text-[#7C879B]">Bez spamu. Bez zobowiązań. Odpowiadamy w&nbsp;ciągu 24&nbsp;h.</p>
                </form>
                </div>
              </div>
            </div>
          </div>
      </m.div>
    </section>
  )
}

