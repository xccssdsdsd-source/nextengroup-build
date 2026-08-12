'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { PiCalendarBold, PiCheckBold, PiEnvelopeSimpleBold } from 'react-icons/pi'
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
  'Odpowiadamy w ciągu 24 godzin — mailem albo telefonem, jak wolisz.',
  'Piętnaście minut rozmowy o tym, jak pracujesz i czego potrzebujesz.',
  'W ciągu 24 godzin od zebrania materiałów widzisz pierwszą wizualizację.',
  'Decydujesz. Dopiero Twoje „tak" uruchamia płatność.',
]

type Role = 'agent' | 'biuro'

export default function Kontakt() {
  const [role, setRole] = useState<Role>('agent')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [link, setLink] = useState('')
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'done' | 'error'>('idle')
  const handoff = useRef(0)

  useEffect(() => () => clearTimeout(handoff.current), [])

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (state === 'sending' || state === 'sent') return
    setState('sending')

    const message = [
      `Imię: ${name || '—'}`,
      `Typ: ${role === 'agent' ? 'Agent indywidualny' : 'Biuro nieruchomości'}`,
      `Link do profilu/oferty: ${link || '—'}`,
    ].join('\n')

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
                <fieldset className="contact__roles">
                  <legend className="field-label">Kim jesteś?</legend>
                  <div className="contact__role-row">
                    {(['agent', 'biuro'] as Role[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        className={`role-btn${role === r ? ' is-on' : ''}`}
                        aria-pressed={role === r}
                        onClick={() => setRole(r)}
                      >
                        {r === 'agent' ? 'Agent indywidualny' : 'Biuro nieruchomości'}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="contact__row">
                  <div>
                    <label className="field-label" htmlFor="k-name">Imię</label>
                    <input id="k-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" placeholder="Anna" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="k-phone">Telefon <span className="field-opt">opcjonalnie</span></label>
                    <input id="k-phone" type="tel" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+48 600 000 000" />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="k-email">Email</label>
                  <input id="k-email" type="email" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="anna@biuro.pl" />
                  <span className="field-hint">Tu wyślemy link do wizualizacji.</span>
                </div>

                <div>
                  <label className="field-label" htmlFor="k-link">Link do Twojego profilu lub obecnej strony <span className="field-opt">opcjonalnie</span></label>
                  <input id="k-link" className="field" value={link} onChange={(e) => setLink(e.target.value)} placeholder="otodom.pl/… albo twojastrona.pl" />
                  <span className="field-hint">Im więcej zobaczymy, tym trafniejsza będzie pierwsza wersja.</span>
                </div>

                <label className="contact__consent">
                  <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span>
                    Zgadzam się na przetwarzanie danych w celu odpowiedzi na zapytanie.{' '}
                    <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
                  </span>
                </label>

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
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-on-navy btn-sheen contact__alt-btn" data-magnetic>
                <PiCalendarBold size={17} aria-hidden="true" />
                Wybierz termin rozmowy
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact__mail">
                <PiEnvelopeSimpleBold size={16} aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="contact__social">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={label}>
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
