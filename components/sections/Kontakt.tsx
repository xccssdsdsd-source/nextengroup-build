'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { PiCalendarBold, PiCheckBold, PiCopyBold, PiEnvelopeSimpleBold } from 'react-icons/pi'
import StatefulButton from '@/components/ui/StatefulButton'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaRedditAlien, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const CALENDLY_URL = 'https://calendly.com/getbuild-pl/30min'
const CONTACT_EMAIL = 'getbuild.pl@gmail.com'

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/getbuild.pl/', Icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588720012257', Icon: FaFacebook },
  { label: 'X', href: 'https://x.com/getbuildpl', Icon: FaXTwitter },
  { label: 'TikTok', href: 'https://www.tiktok.com/@getbuild.pl', Icon: FaTiktok },
  { label: 'Reddit', href: 'https://www.reddit.com/user/getbuildpl/', Icon: FaRedditAlien },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/getbuild', Icon: FaLinkedinIn },
]

const next = [
  'Odzywamy się w ciągu 24 godzin.',
  'Krótka rozmowa — piętnaście minut, bez prezentacji sprzedażowej.',
  'Widzisz wizualizację. Dopiero Twoje „tak" uruchamia płatność.',
]

export default function Kontakt() {
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'done' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')
  const [consentError, setConsentError] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const handoff = useRef(0)

  useEffect(() => () => {
    clearTimeout(handoff.current)
    clearTimeout(copyTimer.current)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

  function checkEmail() {
    if (!email.trim()) setEmailError('Podaj adres email — tu wyślemy wizualizację.')
    else if (!emailValid(email)) setEmailError('Ten adres wygląda na niepełny. Sprawdź literówkę.')
    else setEmailError('')
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (state === 'sending' || state === 'sent') return

    const badEmail = !emailValid(email)
    if (badEmail) {
      setEmailError(email.trim() ? 'Ten adres wygląda na niepełny. Sprawdź literówkę.' : 'Podaj adres email — tu wyślemy wizualizację.')
      emailRef.current?.focus()
    }
    if (!consent) setConsentError(true)
    if (badEmail || !consent) return

    setState('sending')

    const message = `Imię: ${name || '—'}`

    // A request that returns in 80ms would flash the spinner and read as a
    // glitch, so the loading state is held long enough to be legible before the
    // tick is drawn, and the tick is left on screen before the panel takes over.
    const floor = new Promise((r) => setTimeout(r, 620))

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, subject: 'Wizualizacja — nieruchomości', message }),
      })
      await floor
      if (!res.ok) {
        setState('error')
        return
      }
      setState('sent')
      handoff.current = window.setTimeout(() => setState('done'), 1050)
    } catch {
      await floor
      setState('error')
    }
  }

  return (
    <section id="kontakt" className="section-shell section-shell--navy">
      <span className="section-mesh section-mesh--navy" data-parallax-slow aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Ostatni krok</span>
          <h2 className="section-title">
            Zobacz swoją stronę, zanim <span className="serif-accent">wydasz złotówkę</span>
          </h2>
          <p className="section-copy">
            Zostaw kontakt, a przygotujemy wizualizację strony dla Ciebie. Bez zaliczki,
            bez umowy na tym etapie i bez zobowiązania, że cokolwiek zamówisz.
          </p>
        </div>

        <div className="contact" data-stagger-group data-reveal-pattern="split">
          <div className="contact__form-wrap">
            {state === 'done' ? (
              <div className="contact__done" role="status">
                <span className="contact__done-icon"><PiCheckBold size={22} aria-hidden="true" /></span>
                <h3 className="t-h3">Mamy Twoje zgłoszenie</h3>
                <p className="t-body">
                  Odzywamy się w ciągu 24 godzin na <strong>{email}</strong>. Jeśli chcesz
                  przyspieszyć, wybierz termin rozmowy w kalendarzu obok.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={submit} noValidate>
                {/* Two questions, stacked, one per row. Every field the sales
                    brief used to ask for — rynek, link do profilu, opis biura —
                    is something we can just as easily ask on the call, and each
                    one of them was a reason to close the tab instead. */}
                <label className="ifield ifield--lg">
                  <span className="ifield__label">Imię</span>
                  <input id="k-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
                </label>

                <div>
                  <label className="ifield ifield--lg" data-invalid={emailError ? 'true' : undefined}>
                    <span className="ifield__label">Email</span>
                    <input
                      id="k-email"
                      ref={emailRef}
                      type="email"
                      required
                      inputMode="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError && emailValid(e.target.value)) setEmailError('')
                      }}
                      onBlur={checkEmail}
                      aria-invalid={emailError ? 'true' : undefined}
                      aria-describedby={emailError ? 'k-email-error' : 'k-email-hint'}
                      autoComplete="email"
                    />
                  </label>
                  {emailError ? (
                    <span id="k-email-error" className="field-error" role="alert">{emailError}</span>
                  ) : (
                    <span id="k-email-hint" className="field-hint">Tu wyślemy link do wizualizacji.</span>
                  )}
                </div>

                <label className="ifield ifield--lg">
                  <span className="ifield__label">Telefon <i>opcjonalnie</i></span>
                  <input id="k-phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                </label>

                <div>
                  <label className={`contact__consent${consentError ? ' is-invalid' : ''}`}>
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      aria-invalid={consentError ? 'true' : undefined}
                      onChange={(e) => {
                        setConsent(e.target.checked)
                        if (e.target.checked) setConsentError(false)
                      }}
                    />
                    <span>
                      Zgadzam się na przetwarzanie danych w celu odpowiedzi na zapytanie.{' '}
                      <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
                    </span>
                  </label>
                  {consentError ? (
                    <span className="field-error" role="alert">Zaznacz zgodę, żebyśmy mogli odpisać.</span>
                  ) : null}
                </div>

                {state === 'error' ? (
                  <p className="field-error" role="alert">
                    Nie udało się wysłać. Napisz bezpośrednio na {CONTACT_EMAIL} — odpowiemy tak samo szybko.
                  </p>
                ) : null}

                <StatefulButton
                  className="contact__submit"
                  data-magnetic
                  status={state === 'sending' ? 'loading' : state === 'sent' ? 'success' : 'idle'}
                  loadingLabel="Wysyłam…"
                  successLabel="Wysłane"
                >
                  Chcę zobaczyć wizualizację
                </StatefulButton>
                <p className="contact__micro">Bez zaliczki · Odpowiadamy w 24h · Nie wysyłamy newslettera</p>
              </form>
            )}
          </div>

          <aside className="contact__side">
            <h3 className="contact__side-title">Co się stanie po wysłaniu</h3>
            <ol className="contact__next">
              {next.map((n, i) => (
                <li key={n}><span className="contact__next-n tnum">{i + 1}</span>{n}</li>
              ))}
            </ol>

            <div className="contact__alt">
              <div className="contact__alt-head">
                <b>Wolisz najpierw porozmawiać?</b>
                <span>Umów krótką rozmowę telefoniczną albo spotkanie online. Piętnaście minut, bez prezentacji sprzedażowej.</span>
              </div>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-on-navy btn-sheen contact__alt-btn" data-magnetic>
                <PiCalendarBold size={18} aria-hidden="true" />
                Wybierz termin rozmowy
              </a>

              <div className="contact__mail-row">
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact__mail">
                  <PiEnvelopeSimpleBold size={17} aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
                <button
                  type="button"
                  className="contact__mail-copy"
                  onClick={copyEmail}
                  aria-label={copied ? 'Adres skopiowany' : 'Skopiuj adres email'}
                >
                  {copied ? <PiCheckBold size={15} aria-hidden="true" /> : <PiCopyBold size={15} aria-hidden="true" />}
                  <span>{copied ? 'Skopiowano' : 'Kopiuj'}</span>
                </button>
              </div>
            </div>

            <div className="contact__social">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={label}>
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
