'use client'

import { AnimatePresence, m } from 'framer-motion'
import { type FormEvent, useEffect, useRef, useState } from 'react'

interface CalendlyWindow extends Window {
  Calendly?: {
    initInlineWidget: (opts: { url: string; parentElement: HTMLElement; prefill?: { name?: string; email?: string } }) => void
  }
}

type Step = 'form' | 'calendar' | 'success'

interface Props {
  isOpen: boolean
  onClose: () => void
  packageName: string
}

export default function BookingModal({ isOpen, onClose, packageName }: Props) {
  const [step, setStep] = useState<Step>('form')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const calendlyRef = useRef<HTMLDivElement>(null)
  const [calendlyReady, setCalendlyReady] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep('form')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setErrors({})
        setCalendlyReady(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    if (step !== 'calendar' || calendlyReady) return
    const existing = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')
    if (existing) {
      initCalendly()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = initCalendly
    document.body.appendChild(script)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, calendlyReady])

  function initCalendly() {
    const w = window as CalendlyWindow
    if (w.Calendly && calendlyRef.current) {
      w.Calendly.initInlineWidget({
        url: 'https://calendly.com/getbuild-pl/30min',
        parentElement: calendlyRef.current,
        prefill: { name: formData.name, email: formData.email },
      })
      setCalendlyReady(true)
    }
  }

  useEffect(() => {
    if (step !== 'calendar') return
    const handleMsg = (e: MessageEvent) => {
      if (e.data?.event === 'calendly.event_scheduled') {
        setStep('success')
        fetch('/api/appointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, package: packageName }),
        }).catch(() => null)
      }
    }
    window.addEventListener('message', handleMsg)
    return () => window.removeEventListener('message', handleMsg)
  }, [step, formData, packageName])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function validate() {
    const e: { name?: string; email?: string } = {}
    if (!formData.name.trim()) e.name = 'Imię jest wymagane'
    if (!formData.email.trim()) e.email = 'Email jest wymagany'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Podaj prawidłowy adres email'
    return e
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setIsSubmitting(true)
    setErrors({})
    setStep('calendar')
    setIsSubmitting(false)
  }

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease }}
            className={`relative z-10 w-full overflow-y-auto rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[#11161F] shadow-[0_24px_80px_rgba(0,0,0,0.8)] ${
              step === 'calendar' ? 'max-w-2xl max-h-[95vh] p-5 sm:p-7' : 'max-w-lg max-h-[90vh] p-6 sm:p-8'
            }`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.12)] transition-colors"
              aria-label="Zamknij"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="11" y2="11" stroke="#EAF0F7" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="11" y1="1" x2="1" y2="11" stroke="#EAF0F7" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {step !== 'success' && (
              <div className="flex items-center gap-3 mb-6 pr-10">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-colors ${
                  step === 'calendar' ? 'bg-[#22D3EE] text-[#06141A]' : 'bg-[#22D3EE] text-[#06141A]'
                }`}>
                  {step === 'calendar' ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="1.5 6 4.5 9 10.5 3" stroke="#06141A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : '1'}
                </div>
                <div className={`flex-1 h-px transition-colors ${step === 'calendar' ? 'bg-[#22D3EE]' : 'bg-[rgba(255,255,255,0.12)]'}`} />
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-colors ${
                  step === 'calendar' ? 'bg-[#22D3EE] text-[#06141A]' : 'bg-[rgba(255,255,255,0.1)] text-[#7C879B]'
                }`}>
                  2
                </div>
                <span className={`text-[11px] font-semibold uppercase tracking-widest flex-shrink-0 transition-colors ${
                  step === 'calendar' ? 'text-[#22D3EE]' : 'text-[#7C879B]'
                }`}>
                  {step === 'form' ? 'Dane' : 'Kalendarz'}
                </span>
              </div>
            )}

            {step === 'form' && (
              <m.div
                key="form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease }}
              >
                <div className="mb-6">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#06141A] bg-[#22D3EE] rounded-full mb-3">
                    {packageName}
                  </span>
                  <h3
                    id="booking-modal-title"
                    className="text-[20px] sm:text-[22px] font-bold text-[#EAF0F7] leading-tight"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    Umów bezpłatną konsultację
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-[#A6B2C4]">
                    Wypełnij formularz — w następnym kroku wybierzesz termin w kalendarzu. Spotkanie trwa 30 minut i jest bezpłatne.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="bm-name" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A6B2C4] mb-1.5">
                      Imię i nazwisko <span className="text-[#22D3EE]">*</span>
                    </label>
                    <input
                      id="bm-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jan Kowalski"
                      className={`form-input ${errors.name ? 'border-red-500/60 focus:border-red-500' : ''}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'bm-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="bm-name-error" className="mt-1 text-[11px] text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bm-email" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A6B2C4] mb-1.5">
                      Email <span className="text-[#22D3EE]">*</span>
                    </label>
                    <input
                      id="bm-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jan@example.com"
                      className={`form-input ${errors.email ? 'border-red-500/60 focus:border-red-500' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'bm-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="bm-email-error" className="mt-1 text-[11px] text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bm-phone" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A6B2C4] mb-1.5">
                      Telefon <span className="text-[#7C879B] normal-case font-normal text-[11px]">(opcjonalnie)</span>
                    </label>
                    <input
                      id="bm-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+48 123 456 789"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="bm-message" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A6B2C4] mb-1.5">
                      O co chodzi? <span className="text-[#7C879B] normal-case font-normal text-[11px]">(opcjonalnie)</span>
                    </label>
                    <textarea
                      id="bm-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Krótko opisz swój projekt lub to, czego szukasz…"
                      rows={3}
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary py-3.5 font-semibold text-[15px] mt-2 flex items-center justify-center gap-2"
                  >
                    Przejdź do kalendarza
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <p className="text-center text-[11px] text-[#7C879B]">
                    Twoje dane są bezpieczne i nie trafiają do żadnych zewnętrznych systemów marketingowych.
                  </p>
                </form>
              </m.div>
            )}

            {step === 'calendar' && (
              <m.div
                key="calendar"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, ease }}
              >
                <div className="mb-4 pr-10">
                  <h3
                    id="booking-modal-title"
                    className="text-[17px] sm:text-[19px] font-bold text-[#EAF0F7]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    Wybierz termin spotkania
                  </h3>
                  <p className="mt-1 text-[13px] text-[#A6B2C4]">
                    Bezpłatna konsultacja · 30 minut · Online
                  </p>
                </div>
                <div
                  ref={calendlyRef}
                  className="w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)]"
                  style={{ minHeight: '580px' }}
                />
              </m.div>
            )}

            {step === 'success' && (
              <m.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-[rgba(34,211,238,0.12)] border border-[rgba(34,211,238,0.25)] flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  id="booking-modal-title"
                  className="text-[22px] font-bold text-[#EAF0F7] mb-3"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  Spotkanie zarezerwowane!
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#A6B2C4] mb-2">
                  Potwierdzenie zostało wysłane na{' '}
                  <span className="text-[#EAF0F7] font-semibold">{formData.email}</span>.
                </p>
                <p className="text-[13px] text-[#7C879B] mb-8">
                  Do zobaczenia! Jeśli przed spotkaniem przemyślisz co chcesz osiągnąć stroną — rozmowa będzie jeszcze owocniejsza.
                </p>
                <button onClick={onClose} className="btn btn-primary px-10 py-3 font-semibold">
                  Zamknij
                </button>
              </m.div>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
