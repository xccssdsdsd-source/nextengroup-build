'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaInstagram, FaRedditAlien, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { PiCheckBold, PiCaretDownBold, PiCopyBold } from 'react-icons/pi'
import StatefulButton from '@/components/ui/StatefulButton'

const contactEmail = 'getbuild.pl@gmail.com'

const socials = [
  { label: 'Email', fullName: 'getbuild.pl@gmail.com', href: `mailto:${contactEmail}` },
  { label: 'Instagram', fullName: '@getbuild.pl', href: 'https://www.instagram.com/getbuild.pl/' },
  { label: 'Facebook', fullName: 'getbuild', href: 'https://www.facebook.com/profile.php?id=61588720012257' },
  { label: 'X', fullName: '@getbuildpl', href: 'https://x.com/getbuildpl' },
  { label: 'Reddit', fullName: 'u/getbuildpl', href: 'https://www.reddit.com/user/getbuildpl/' },
  { label: 'TikTok', fullName: '@getbuild.pl', href: 'https://www.tiktok.com/@getbuild.pl' },
]

const socialTint: Record<string, { color: string; chip: string }> = {
  Email: { color: '#d9560b', chip: 'rgba(234, 113, 42, 0.1)' },
  Instagram: { color: '#c2185b', chip: 'rgba(225, 48, 108, 0.08)' },
  Facebook: { color: '#1877f2', chip: 'rgba(24, 119, 242, 0.08)' },
  X: { color: '#071023', chip: 'rgba(7, 16, 35, 0.06)' },
  Reddit: { color: '#e03d00', chip: 'rgba(255, 69, 0, 0.08)' },
  TikTok: { color: '#0e8a92', chip: 'rgba(105, 201, 208, 0.14)' },
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ email: '', phone: '', subject: '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [gdprAccepted, setGdprAccepted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [messageError, setMessageError] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const copyTimer = useRef(0)
  const router = useRouter()

  const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  useEffect(() => {
    if (!dropdownOpen) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [dropdownOpen])

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail)
    setCopied(true)
    clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const subjects = ['Strona internetowa', 'Chatbot AI', 'Inne']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'email' && emailError && emailValid(value)) setEmailError('')
    if (name === 'message' && messageError && value.trim()) setMessageError(false)
  }

  const checkEmail = () => {
    if (!formData.email.trim()) setEmailError('Podaj adres email — tam wyślemy odpowiedź.')
    else if (!emailValid(formData.email)) setEmailError('Ten adres wygląda na niepełny. Sprawdź literówkę.')
    else setEmailError('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'sending' || state === 'sent') return

    const badEmail = !emailValid(formData.email)
    const badMessage = !formData.message.trim()
    if (badEmail) setEmailError(formData.email.trim() ? 'Ten adres wygląda na niepełny. Sprawdź literówkę.' : 'Podaj adres email — tam wyślemy odpowiedź.')
    if (badMessage) setMessageError(true)
    if (!gdprAccepted) setConsentError(true)
    if (badEmail) emailRef.current?.focus()
    else if (badMessage) messageRef.current?.focus()
    if (badEmail || badMessage || !gdprAccepted) return

    setState('sending')

    // A sub-100ms response would flash the spinner, so the loading state is
    // held long enough to be legible and the tick is shown before navigating.
    const floor = new Promise((r) => setTimeout(r, 620))
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      await floor
      if (!res.ok) throw new Error('failed')
      setState('sent')
      window.setTimeout(() => router.push('/dziekujemy'), 900)
    } catch {
      await floor
      setState('error')
    }
  }

  return (
    <section id="kontakt" className="section-shell relative">
      <div
        className="contact-panel relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-10 lg:p-14 xl:p-16"
        style={{ boxShadow: 'var(--shadow-xl)' }}
        data-fade-in
      >
        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16">
          <div className="w-full lg:w-[290px] xl:w-[320px] flex-shrink-0 flex flex-col">
            <div>
              <span className="section-kicker">Kontakt</span>
              <h2 className="mt-3 text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold leading-[1.07] tracking-[-0.04em] text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>
                Umów bezpłatną konsultację
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-[var(--ink-2)]">
                Nie musisz podejmować decyzji od razu. Umów się na bezpłatną rozmowę i sprawdź, jaka ścieżka będzie dla Ciebie najlepsza.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--ink-3)] mb-2">Email</p>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-[var(--line-strong)] bg-white hover:border-[var(--brand)] hover:bg-[var(--brand-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 transition-[border-color,background-color] duration-200 ease-out flex items-center"
                  >
                    <span className="text-[12px] font-semibold text-[var(--ink)] break-all">{contactEmail}</span>
                  </a>
                  <button
                    onClick={copyEmail}
                    className="px-2.5 py-2.5 rounded-xl border border-[var(--line-strong)] bg-white hover:border-[var(--brand)] hover:bg-[var(--brand-50)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 transition-[border-color,background-color,transform] duration-200 ease-out flex items-center justify-center flex-shrink-0"
                    aria-label={copied ? 'Skopiowane!' : 'Skopiuj adres email'}
                    title={copied ? 'Skopiowane!' : 'Skopiuj email'}
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {copied ? (
                        <m.span
                          key="ok"
                          initial={{ opacity: 0, scale: 0.86 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.86 }}
                          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
                          className="text-[var(--brand)]"
                        >
                          <PiCheckBold size={15} />
                        </m.span>
                      ) : (
                        <m.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.86 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.86 }}
                          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
                          className="text-[var(--ink-2)]"
                        >
                          <PiCopyBold size={15} />
                        </m.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--ink-3)] mb-3">Nasze konta</p>
                <div className="flex flex-col gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.label !== 'Email' ? '_blank' : undefined}
                      rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="contact-social group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[var(--line)] bg-white hover:border-[var(--line-strong)] hover:bg-[var(--bg-card-hi)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 transition-[border-color,background-color] duration-200 ease-out"
                    >
                      <span
                        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg"
                        style={{ color: socialTint[s.label].color, background: socialTint[s.label].chip }}
                      >
                        {s.label === 'Email' && <MdEmail size={16} />}
                        {s.label === 'Instagram' && <FaInstagram size={14} />}
                        {s.label === 'Facebook' && <FaFacebook size={14} />}
                        {s.label === 'X' && <FaXTwitter size={14} />}
                        {s.label === 'Reddit' && <FaRedditAlien size={14} />}
                        {s.label === 'TikTok' && <FaTiktok size={14} />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-[var(--ink)] leading-tight">{s.label}</p>
                        <p className="text-[11px] text-[var(--ink-3)] truncate">{s.fullName}</p>
                      </div>
                      <svg className="ml-auto flex-shrink-0 text-[var(--ink-3)] group-hover:text-[var(--ink-2)] transition-colors" width="12" height="12" viewBox="0 0 12 12" fill="none">
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
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand)] mb-2">Umów spotkanie</p>
                <h3 className="text-[20px] sm:text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Wybierz termin rozmowy
                </h3>
              </div>
              <div className="calendly-widget w-full overflow-hidden rounded-2xl border border-[var(--line)]" style={{ minHeight: '680px', height: '680px' }}>
                <iframe
                  title="Umów spotkanie z Getbuild"
                  src="https://calendly.com/getbuild-pl/30min?embed_type=Inline&background_color=ffffff&text_color=071023&primary_color=0b4fd1&hide_gdpr_banner=1"
                  loading="lazy"
                  className="h-full w-full border-0"
                  allow="camera; microphone; fullscreen"
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand)] mb-2">Napisz do nas</p>
                <h3 className="text-[20px] sm:text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Wyślij krótkie zapytanie
                </h3>
              </div>
              <div className="contact-form-card rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                  {...{
                    toolname: 'send_business_inquiry',
                    tooldescription: 'Sends a business inquiry to Getbuild about a website or AI chatbot.',
                  }}
                >
                  <div>
                    <label htmlFor="email" className="field-label">Email</label>
                    <input type="email" id="email" name="email" ref={emailRef} value={formData.email} onChange={handleChange} onBlur={checkEmail} required aria-invalid={emailError ? 'true' : undefined} aria-describedby={emailError ? 'contact-email-error' : undefined} placeholder="jan@firma.pl" className="field" autoComplete="email" {...{ toolparamdescription: 'Email address where Getbuild should send the reply.' }} />
                    {emailError && <span id="contact-email-error" className="field-error" role="alert">{emailError}</span>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="field-label">Telefon <span className="field-opt">opcjonalnie</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+48 600 000 000" className="field" autoComplete="tel" {...{ toolparamdescription: 'Optional phone number where Getbuild may call the inquirer back.' }} />
                  </div>
                  <div ref={dropdownRef} className="relative">
                    <label id="inquiry-subject-label" className="field-label">Czego dotyczy wiadomość?</label>
                    <input
                      type="hidden"
                      name="subject"
                      value={formData.subject}
                      {...{ toolparamdescription: 'Inquiry topic: website, AI chatbot, or another subject.' }}
                    />
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(o => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      aria-labelledby="inquiry-subject-label inquiry-subject-value"
                      className="field w-full flex items-center justify-between gap-3 text-left cursor-pointer"
                      style={{
                        borderColor: dropdownOpen ? 'var(--brand)' : undefined,
                        boxShadow: dropdownOpen ? '0 0 0 3px rgba(11, 79, 209, 0.14)' : undefined,
                      }}
                    >
                      <span
                        id="inquiry-subject-value"
                        className={formData.subject ? 'text-[var(--ink)]' : 'text-[var(--ink-3)]'}
                      >
                        {formData.subject || 'Wybierz temat…'}
                      </span>
                      <PiCaretDownBold
                        size={16}
                        className="flex-shrink-0 text-[var(--ink-3)] transition-transform duration-200"
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
                          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                          style={{ transformOrigin: 'top center' }}
                          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[var(--line)] bg-white shadow-[0_3px_6px_rgba(6,17,41,0.11),_0_22px_44px_-14px_rgba(6,17,41,0.2)] list-none p-1.5 m-0"
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
                                  background: selected ? 'var(--brand-50)' : undefined,
                                  color: selected ? 'var(--brand)' : 'var(--ink-2)',
                                }}
                                onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hi)' }}
                                onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = '' }}
                              >
                                {s}
                                {selected && <PiCheckBold size={14} className="flex-shrink-0" />}
                              </li>
                            )
                          })}
                        </m.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label htmlFor="message" className="field-label">Wiadomość</label>
                    <textarea id="message" name="message" ref={messageRef} value={formData.message} onChange={handleChange} required aria-invalid={messageError ? 'true' : undefined} aria-describedby={messageError ? 'contact-message-error' : undefined} placeholder="Napisz krótko, czym zajmuje się firma i czego potrzebujesz. Wystarczą 2-3 zdania." rows={5} className="field resize-none" {...{ toolparamdescription: 'Short description of the company, project, and help needed.' }} />
                    {messageError && <span id="contact-message-error" className="field-error" role="alert">Napisz krótko, czego potrzebujesz — wystarczą dwa zdania.</span>}
                  </div>
                  <div>
                    <label className={`contact__consent${consentError ? ' is-invalid' : ''}`}>
                      <input
                        type="checkbox"
                        name="privacy_consent"
                        checked={gdprAccepted}
                        required
                        aria-invalid={consentError ? 'true' : undefined}
                        onChange={(e) => {
                          setGdprAccepted(e.target.checked)
                          if (e.target.checked) setConsentError(false)
                        }}
                        {...{ toolparamdescription: 'Confirms consent to process personal data in order to answer the inquiry.' }}
                      />
                      <span>
                        Zgadzam się na przetwarzanie moich danych, w tym kontakt mailowy i telefoniczny, w celu odpowiedzi na zapytanie.{' '}
                        <a href="/polityka-prywatnosci">Polityka prywatności</a>
                      </span>
                    </label>
                    {consentError && <span className="field-error" role="alert">Zaznacz zgodę, żebyśmy mogli odpisać.</span>}
                  </div>
                  {state === 'error' && (
                    <p className="field-error" role="alert">
                      Nie udało się wysłać. Spróbuj ponownie lub napisz na {contactEmail} — odpowiemy tak samo szybko.
                    </p>
                  )}
                  <StatefulButton
                    className="w-full min-h-[52px]"
                    status={state === 'sending' ? 'loading' : state === 'sent' ? 'success' : 'idle'}
                    loadingLabel="Wysyłam…"
                    successLabel="Wysłane"
                  >
                    Wyślij zapytanie
                  </StatefulButton>
                  <p className="text-center text-[11px] text-[var(--ink-3)]">Bez spamu. Bez zobowiązań. Odpowiadamy w&nbsp;ciągu 24&nbsp;h.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
