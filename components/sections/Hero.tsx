'use client'

import { Fragment, useEffect, useRef, type MouseEvent } from 'react'
import { PiClockCountdownBold, PiGaugeBold } from 'react-icons/pi'
import RealEstateMockup from '@/components/ui/RealEstateMockup'
import { subscribeScroll } from '@/lib/scrollTicker'
import { scrollToSection } from '@/lib/scrollToSection'

type Word = { text: string; accent?: boolean }

const line1: Word[] = [{ text: 'Twoje' }, { text: 'oferty' }, { text: 'zasługują' }, { text: 'na' }]
const line2: Word[] = [{ text: 'lepsze' }, { text: 'miejsce' }, { text: 'niż' }, { text: 'portal', accent: true }, { text: 'ogłoszeniowy.', accent: true }]

// Each caption is pinned to the panel the mockup is scrubbing through, so the
// scroll reads as one argument being answered three times rather than a
// carousel running on its own clock.
const captions = [
  { t: 'Strona zbudowana wokół Ciebie', s: 'Nie profil w portalu obok trzydziestu innych agentów.' },
  { t: 'Panel ofert', s: 'Dodajesz nieruchomość sam, w kilka minut. Bez programisty.' },
  { t: 'Karta oferty', s: 'Twoje nazwisko, Twój telefon, Twoja prowizja.' },
]

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a))
const smooth = (t: number) => t * t * (3 - 2 * t)

const HeadlineLine = ({ words, start }: { words: Word[]; start: number }) => (
  <span className="hero-heading-line">
    {words.map((w, i) => (
      <Fragment key={w.text}>
        {i > 0 && ' '}
        <span className="hero-headline-token">
          <span className="hero-word-mask">
            <span className="hero-word" style={{ animationDelay: `${start + i * 45}ms` }}>
              {w.accent ? <span className="serif-accent">{w.text}</span> : w.text}
            </span>
          </span>
        </span>
      </Fragment>
    ))}
  </span>
)

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const colRef = useRef<HTMLDivElement>(null)
  const signalRef = useRef<HTMLSpanElement>(null)
  const captionRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const track = stage.querySelector<HTMLElement>('[data-scrub-track]')
    const copy = copyRef.current
    const device = deviceRef.current
    const col = colRef.current
    const signal = signalRef.current
    if (!track || !copy || !device || !col || !signal) return

    let travel = 0
    let panelH = 0
    let span = 0
    let last = -1
    let lastCaption = -1

    // Travel is read off the track itself instead of assuming "two frames".
    // The mockup is cropped differently per breakpoint, so a hard-coded
    // multiple scrolled past the end of the content on phones and left the
    // bottom of the screen blank.
    const measure = () => {
      const viewport = track.parentElement
      const frameH = viewport ? viewport.clientHeight : 0
      travel = Math.max(track.scrollHeight - frameH, 0)
      panelH = track.children.length ? track.scrollHeight / track.children.length : frameH
      span = Math.max(stage.offsetHeight - window.innerHeight, 1)
    }

    const update = () => {
      const p = clamp(-stage.getBoundingClientRect().top / span)
      if (Math.abs(p - last) < 0.0004) return
      last = p

      // The backdrop grid is the one thing in the scene allowed to answer the
      // scroll directly — a slow diagonal drift plus a faint zoom, so the
      // otherwise-static hero ground reads as alive under the pinned copy.
      stage.style.setProperty('--mesh-p', p.toFixed(4))
      const compact = window.innerWidth <= 768
      const signalX = (compact ? 72 : 180) - p * (compact ? 144 : 360)
      const signalY = (compact ? 42 : 92) - p * (compact ? 84 : 184)
      signal.style.transform = `translate3d(${signalX.toFixed(1)}px, ${signalY.toFixed(1)}px, 0) rotate(-18deg)`

      // Beat 1 → 2: the headline hands the stage over to the product. It has
      // to be fully gone well before the sticky block would carry it into the
      // nav — the old scene let it slide underneath the pills.
      const exit = smooth(range(p, 0.06, 0.3))
      copy.style.opacity = `${1 - exit}`
      copy.style.transform = `translate3d(0, ${(-58 * exit).toFixed(1)}px, 0) scale(${(1 - 0.03 * exit).toFixed(4)})`
      copy.style.filter = exit > 0.01 ? `blur(${(4 * exit).toFixed(2)}px)` : ''
      copy.style.visibility = exit > 0.985 ? 'hidden' : ''

      // The device rises from below the fold and settles into its resting
      // frame — the arrival is the motion, not a 5% scale nudge.
      const settle = smooth(range(p, 0, 0.34))
      const drift = smooth(range(p, 0.86, 1))
      col.style.transform = `translate3d(0, ${(76 - 76 * settle - 2.2 * drift).toFixed(2)}%, 0)`
      device.style.transform = `perspective(1500px) rotateX(${(9 - 4.6 * settle).toFixed(2)}deg) scale(${(1.045 - 0.045 * settle).toFixed(4)})`

      const reveal = smooth(range(p, 0.3, 0.42))
      col.style.setProperty('--badge-in', reveal.toFixed(3))

      // Mockup scrub starts only once the device has arrived, so the two
      // motions read as consecutive beats instead of competing for attention.
      const scrub = range(p, 0.32, 1)
      const offset = scrub * travel
      track.style.transform = `translate3d(0, ${(-offset).toFixed(2)}px, 0)`

      // The caption names whichever panel currently owns the frame, derived
      // from the real offset rather than from fixed scrub thresholds that only
      // happened to line up at one breakpoint.
      const index = panelH ? Math.min(2, Math.max(0, Math.round(offset / panelH))) : 0
      if (index !== lastCaption) {
        lastCaption = index
        captionRefs.current.forEach((el, i) => {
          if (el) el.dataset.on = i === index ? 'true' : 'false'
        })
      }
      col.style.setProperty('--caption-in', smooth(range(p, 0.34, 0.46)).toFixed(3))
    }

    measure()
    update()

    const unsubscribe = subscribeScroll(update)
    const onResize = () => {
      measure()
      last = -1
      update()
    }
    window.addEventListener('resize', onResize)
    return () => {
      unsubscribe()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <section id="hero" ref={stageRef} className="pin-stage hero-stage" data-no-reveal>
      <div className="pin-sticky">
        <span className="section-mesh hero-mesh" aria-hidden="true" />
        <span ref={signalRef} className="hero-scroll-signal" aria-hidden="true">
          <span className="hero-scroll-signal__node" />
        </span>
        <div className="container hero-stack">
          <div ref={copyRef} className="hero-copy">
            <h1 className="hero-h1">
              <HeadlineLine words={line1} start={60} />
              <HeadlineLine words={line2} start={60 + line1.length * 45} />
            </h1>

            <p className="hero-sub hero-from-right" style={{ animationDelay: '160ms' }}>
              Strony i panele ofert dla agentów nieruchomości — widzisz efekt, zanim zapłacisz.
            </p>

            <div className="hero-actions hero-from-left" style={{ animationDelay: '240ms' }}>
              <a href="#kontakt" onClick={(e) => go(e, 'kontakt')} className="btn btn-primary">
                Zobacz wizualizację w 24h
              </a>
              <a href="#proces" onClick={(e) => go(e, 'proces')} className="btn btn-ghost">
                Jak to działa
              </a>
            </div>

            <p className="hero-note hero-from-left" style={{ animationDelay: '300ms' }}>
              Bez zaliczki · Poprawki bez limitu do akceptacji · Odpowiadamy w 24h
            </p>

            <span className="hero-cue" aria-hidden="true">
              <span className="hero-cue__rail"><span className="hero-cue__dot" /></span>
              Przewiń, żeby zobaczyć
            </span>
          </div>

          <div ref={colRef} className="hero-device-col">
            <div className="hero-captions" aria-hidden="true">
              {captions.map((c, i) => (
                <div
                  key={c.t}
                  ref={(el) => { captionRefs.current[i] = el }}
                  className="hero-caption"
                  data-on={i === 0 ? 'true' : 'false'}
                >
                  <strong>{c.t}</strong>
                  <span>{c.s}</span>
                </div>
              ))}
            </div>

            <span className="hero-float-badge hero-float-badge--a" aria-hidden="true">
              <PiGaugeBold size={14} aria-hidden="true" /> Lighthouse <strong>96+</strong>
            </span>
            <span className="hero-float-badge hero-float-badge--b" aria-hidden="true">
              <PiClockCountdownBold size={14} aria-hidden="true" /> Wizualizacja w <strong>24h</strong>
            </span>

            <div ref={deviceRef} className="hero-device">
              <div className="device-imac">
                <div className="device-imac__screen">
                  <div className="scrub-frame">
                    <RealEstateMockup
                      photos={{
                        hero: '/mockup/listing-hero.jpg',
                        side1: '/mockup/listing-side1.jpg',
                        side2: '/mockup/listing-side2.jpg',
                        'Sopot, Dolny Sopot': '/mockup/listing-sopot.jpg',
                        'Gdynia, Orłowo': '/mockup/listing-orlowo.jpg',
                        'Gdańsk, Oliwa': '/mockup/listing-oliwa.jpg',
                        detail: '/mockup/listing-detail.jpg',
                        t1: '/mockup/listing-thumb-1.jpg',
                        t2: '/mockup/listing-thumb-2.jpg',
                        t3: '/mockup/listing-thumb-3.jpg',
                      }}
                    />
                  </div>
                  <span className="device-imac__logo" aria-hidden="true" />
                </div>
                <div className="device-imac__neck" />
                <div className="device-imac__foot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
