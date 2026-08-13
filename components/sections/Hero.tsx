'use client'

import { Fragment, useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import FlipWords from '@/components/ui/FlipWords'
import RealEstateMockup from '@/components/ui/RealEstateMockup'
import { requestScrollFlush } from '@/lib/scrollTicker'
import { scrollToSection } from '@/lib/scrollToSection'

type Word = { text: string; accent?: boolean }

const line1: Word[] = [{ text: 'Twoje' }, { text: 'oferty' }, { text: 'zasługują' }, { text: 'na' }]
const line2: Word[] = [{ text: 'lepsze' }, { text: 'miejsce' }, { text: 'niż' }]

// Every one of these is an objection an agent actually has, so the rotation
// widens the argument instead of just moving. Lengths are held within one
// character: the slot reserves the longest phrase, and on a 390px screen the
// headline is narrow enough that a three-character spread visibly pulls the
// last line off centre.
const rivals = ['portal ogłoszeniowy.', 'profil obok innych.', 'szablon z kreatora.', 'wizytówka bez zdjęć.']

// One line of monospace inside the frame, changing only on the rest points.
// Naming the panel is the whole job — anything longer competes with the
// product it is supposed to be labelling.
const marks = ['Strona agenta', 'Panel ofert', 'Karta oferty i lead']

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// The phase easing is the CSS curve written out: every beat boundary lands on
// the same deceleration, so consecutive beats read as one camera move.
const easeOutExpoish = (t: number) => 1 - Math.pow(1 - t, 3.2)
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const HeadlineLine = ({ words, start, tail }: { words: Word[]; start: number; tail?: ReactNode }) => (
  <span className="hero-heading-line" data-hero-exit>
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
    {tail ? <> {tail}</> : null}
  </span>
)

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const colRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const markRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const stage = stageRef.current
    const sticky = stickyRef.current
    const copy = copyRef.current
    const device = deviceRef.current
    const card = cardRef.current
    const col = colRef.current
    const frame = frameRef.current
    if (!stage || !sticky || !copy || !device || !card || !col || !frame) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const track = stage.querySelector<HTMLElement>('[data-scrub-track]')
    if (!track) return

    // Everything the scene needs to know about the page is measured once per
    // layout and read from these — a getBoundingClientRect per property inside
    // the frame loop is what turns a scrub into a stutter.
    let span = 1
    let cardH = 0
    let cardW = 0
    let colLeft = 0
    let cardBottom = 0
    let boxW = 0
    let boxH = 0
    let navH = 84
    let centerDelta = 0
    let scaleTarget = 1
    let travel = 0
    let wide = true

    const exits = Array.from(copy.querySelectorAll<HTMLElement>('[data-hero-exit]'))
    const cue = copy.querySelector<HTMLElement>('.hero-cue')

    const measure = () => {
      wide = window.innerWidth >= 1024
      span = Math.max(stage.offsetHeight - window.innerHeight, 1)

      device.style.transform = ''
      const colRect = col.getBoundingClientRect()
      const stickyRect = sticky.getBoundingClientRect()
      cardH = colRect.height
      cardW = colRect.width
      boxW = stickyRect.width
      boxH = stickyRect.height
      colLeft = colRect.left - stickyRect.left
      cardBottom = colRect.bottom - stickyRect.top
      // Sticky is exactly one viewport tall, so its own box is the frame the
      // showcase phase has to centre into — no scroll position enters here.
      navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 84

      // The frame grows into the room under the nav and stops there — it does
      // not bleed off the edges. Cropping the product against the viewport is
      // what made this beat read as oversized: the browser card stopped being
      // an object being shown and became a second page laid over the first,
      // with its own furniture sliced by the screen. A margin all the way
      // round keeps it a thing on a page, which is what every agency site
      // worth copying does with its own screenshot.
      const margin = Math.min(Math.max(window.innerWidth * 0.05, 26), 80)
      const roomW = boxW - margin * 2
      const roomH = boxH - navH - margin * 1.7
      scaleTarget = cardW > 0 && cardH > 0
        ? Math.max(Math.min(roomW / cardW, roomH / cardH), 1)
        : 1
      // Centred in the band under the nav, now that the card has edges on all
      // four sides and no header of its own to keep clear of the pills.
      centerDelta = navH + (boxH - navH) / 2 - (colRect.top - stickyRect.top + cardH / 2)

      // The two marks live on the sticky, so they are given the card's own
      // edges to hang from.
      sticky.style.setProperty('--card-l', `${colLeft.toFixed(1)}px`)
      sticky.style.setProperty('--card-b', `${cardBottom.toFixed(1)}px`)

      const viewport = track.parentElement
      travel = Math.max(track.scrollHeight - (viewport ? viewport.clientHeight : 0), 0)
    }

    // Three rest points with real dwell on each: the frame is genuinely still
    // while the reader reads it, and every move between them is eased on both
    // ends so nothing ever starts or stops at speed.
    const scrubAt = (u: number) => {
      const stops = wide ? 3 : 2
      const dwell = 0.13
      const move = (1 - stops * dwell) / (stops - 1)
      let t = 0
      for (let i = 0; i < stops; i += 1) {
        const holdStart = i * (dwell + move)
        if (u < holdStart + dwell) {
          t = i / (stops - 1)
          break
        }
        if (u < holdStart + dwell + move) {
          t = (i + easeInOutCubic((u - holdStart - dwell) / move)) / (stops - 1)
          break
        }
        t = (i + 1) / (stops - 1)
      }
      return t
    }

    let target = 0
    let value = 0
    let painted = -1
    let raf = 0
    let live = false
    let lastMark = -1
    let immersive = false

    const render = (p: number) => {
      sticky.style.setProperty('--p', p.toFixed(4))

      const enter = easeOutExpoish(range(p, 0, 0.14))
      const settle = easeOutExpoish(range(p, 0.14, 0.3))
      const full = wide ? easeOutExpoish(range(p, 0.3, 0.42)) : 0
      // The curtain accelerates instead of decelerating. An ease-out here empties
      // the screen a third of a viewport early and the reader scrolls through
      // nothing; this way the frame is alive until the section actually ends.
      const out = Math.pow(range(p, 0.84, 1), 2.6)

      // The copy leaves under a mask travelling up rather than by fading: a
      // fade reads as the page giving up, a wipe reads as a cut. Bottom line
      // first, so the last thing standing is the promise and nothing is ever
      // left sitting on top of the frame.
      exits.forEach((el, i) => {
        const k = exits.length - 1 - i
        const from = 0.1 + k * 0.018
        const e = easeOutExpoish(range(p, from, from + 0.12))
        el.style.clipPath = e > 0.001 ? `inset(0 0 ${(e * 100).toFixed(2)}% 0)` : ''
        el.style.transform = `translate3d(0, ${(-48 * e).toFixed(2)}px, 0)`
      })
      // The copy climbs while the product rises, so the two share the screen
      // for the hand-over instead of stacking on the same centre line, and it
      // is already thinning by the time the mask starts eating the lines.
      copy.style.transform = `translate3d(0, ${(-90 * enter).toFixed(1)}px, 0)`
      copy.style.opacity = (1 - 0.55 * easeOutExpoish(range(p, 0.08, 0.26))).toFixed(3)
      copy.style.visibility = p > 0.33 ? 'hidden' : ''
      if (cue) {
        // The entrance keyframe holds opacity forwards, so only an important
        // declaration can take the cue back off the screen.
        const c = 1 - range(p, 0.03, 0.13)
        cue.style.setProperty('opacity', c.toFixed(3), 'important')
        cue.style.visibility = c < 0.01 ? 'hidden' : ''
      }

      const rot = wide ? 8 - 5 * enter - 3 * settle : 0
      const base = 0.82 + 0.11 * enter + 0.07 * settle
      const scale = base * lerp(1, scaleTarget, full)
      // Two offsets, not one: the entry brings the card on screen, the settle
      // beat walks it the last stretch up to centre — which is what keeps the
      // headline clear of the frame while both are still on screen. The third
      // term pays back the drift that transform-origin (below the card, so the
      // tilt pivots off the floor) introduces once the card scales up.
      const ty = 0.16 * cardH * (1 - enter) + 0.4 * cardH * (1 - settle)
        + full * (centerDelta + 0.7 * cardH * (scale - 1))
      const blur = wide ? 14 * (1 - enter) : 0

      device.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotateX(${rot.toFixed(2)}deg)`
      device.style.opacity = enter.toFixed(3)
      device.style.filter = blur > 0.08 ? `blur(${blur.toFixed(2)}px)` : ''
      device.style.clipPath = out > 0.001 ? `inset(0 0 ${(out * 100).toFixed(2)}% 0)` : ''
      card.style.transform = out > 0.001
        ? `translate3d(0, ${(-10 * out).toFixed(2)}%, 0) scale(${(1 + 0.03 * out).toFixed(4)})`
        : ''

      col.style.setProperty('--full', full.toFixed(3))
      // The corner opens up rather than squaring off. A radius that runs to
      // zero is the tell of a frame that has become the window; this one stays
      // a card the whole way through, so it keeps its edge.
      col.style.setProperty('--radius', `${(15 + 5 * full).toFixed(2)}px`)
      // Both marks are pinned to the card's own bottom-left and bottom-right
      // corners, so they travel exactly as far as the corner does — measured
      // from the live scale rather than from a full-bleed assumption.
      const gx = (boxW - cardW * scale) / 2 - colLeft
      const gy = navH + (boxH - navH) / 2 + (cardH * scale) / 2 - cardBottom
      sticky.style.setProperty('--hud-mx', `${(-gx * full).toFixed(1)}px`)
      sticky.style.setProperty('--hud-my', `${(gy * full).toFixed(1)}px`)
      sticky.style.setProperty('--hud-rx', `${(-gx * full).toFixed(1)}px`)
      sticky.style.setProperty('--hud-ry', `${(gy * full).toFixed(1)}px`)
      sticky.style.setProperty('--progress-in', (enter * (1 - out)).toFixed(3))
      sticky.style.setProperty('--full', full.toFixed(3))

      // Without a full-bleed phase there is no reason to hold the scrub back:
      // on a phone the scrub is the scene, so it takes the room the transition
      // would otherwise have used.
      const u = wide ? range(p, 0.42, 0.84) : range(p, 0.3, 0.9)
      const t = scrubAt(u)
      // The two interface panels ride 30px higher once the frame is full-bleed,
      // which lifts their last row of small type off the line the in-frame mark
      // sits on. The photograph panel keeps its own framing.
      const offset = t * travel + 30 * full * clamp(t * 2)
      track.style.transform = `translate3d(0, ${(-offset).toFixed(2)}px, 0)`
      // The photography rides at 0.92 of the content's rate. The whole point is
      // that you cannot name it — you only notice the frame has depth.
      frame.style.setProperty('--mock-par', `${(18 - 36 * t).toFixed(2)}px`)
      sticky.style.setProperty('--progress', t.toFixed(4))

      const mark = Math.min(marks.length - 1, Math.round(t * (marks.length - 1)))
      if (mark !== lastMark) {
        lastMark = mark
        markRefs.current.forEach((el, i) => {
          if (el) el.dataset.on = i === mark ? 'true' : 'false'
        })
      }

      const wantImmersive = wide && p > 0.38 && p < 0.92
      if (wantImmersive !== immersive) {
        immersive = wantImmersive
        document.body.classList.toggle('hero-immersive', wantImmersive)
        // The persistent CTA reads this class off a scroll tick, and the phase
        // can flip on a frame where no scroll event fires — without the nudge
        // the button is missing for exactly the stretch that needs it.
        requestScrollFlush()
      }

      document.documentElement.style.setProperty('--hero-out', easeOutExpoish(range(p, 0.88, 1)).toFixed(3))
    }

    // One loop, one smoothed value. Reading the rect here rather than in a
    // scroll handler is what keeps the scene at the compositor's clock instead
    // of the input device's.
    const frameLoop = () => {
      raf = 0
      target = clamp(-stage.getBoundingClientRect().top / span)
      value = lerp(value, target, 0.085)
      if (Math.abs(target - value) < 0.0002) value = target
      // A pinned scene spends a lot of its life standing still. Once the
      // smoothed value has caught up, the loop keeps ticking but writes
      // nothing — no styles, no blend groups, no compositing work.
      if (Math.abs(value - painted) > 0.00015) {
        painted = value
        render(value)
      }
      if (live) raf = window.requestAnimationFrame(frameLoop)
    }

    const start = () => {
      if (live) return
      live = true
      sticky.dataset.live = 'true'
      raf = window.requestAnimationFrame(frameLoop)
    }

    const stop = () => {
      if (!live) return
      live = false
      if (raf) window.cancelAnimationFrame(raf)
      raf = 0
      delete sticky.dataset.live
    }

    measure()
    target = clamp(-stage.getBoundingClientRect().top / span)
    value = target
    render(value)

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '20% 0px' }
    )
    io.observe(stage)

    const onResize = () => {
      measure()
      render(value)
    }
    window.addEventListener('resize', onResize)

    return () => {
      io.disconnect()
      stop()
      window.removeEventListener('resize', onResize)
      document.body.classList.remove('hero-immersive')
      document.documentElement.style.removeProperty('--hero-out')
    }
  }, [])

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <section id="hero" ref={stageRef} className="pin-stage hero-stage" data-no-reveal>
      <div ref={stickyRef} className="pin-sticky">
        <span className="hero-mesh" aria-hidden="true" />
        <div className="container hero-stack">
          <div ref={copyRef} className="hero-copy">
            <h1 className="hero-h1">
              <HeadlineLine words={line1} start={60} />
              <HeadlineLine
                words={line2}
                start={60 + line1.length * 45}
                tail={
                  <FlipWords
                    words={rivals}
                    className="serif-accent"
                    style={{ animationDelay: `${60 + (line1.length + line2.length) * 45}ms` }}
                  />
                }
              />
            </h1>

            <p className="hero-sub hero-from-right" data-hero-exit style={{ animationDelay: '160ms' }}>
              Strony i panele ofert dla agentów nieruchomości — widzisz efekt, zanim zapłacisz.
            </p>

            <div className="hero-actions hero-from-left" data-hero-exit style={{ animationDelay: '240ms' }}>
              <a
                href="#kontakt"
                onClick={(e) => go(e, 'kontakt')}
                className="btn btn-primary btn-sheen"
                data-magnetic
              >
                Zobacz wizualizację w 24h
              </a>
              <a href="#proces" onClick={(e) => go(e, 'proces')} className="btn btn-ghost" data-magnetic>
                Jak to działa
              </a>
            </div>

            <p className="hero-note hero-from-left" data-hero-exit style={{ animationDelay: '300ms' }}>
              Bez zaliczki · Poprawki bez limitu do akceptacji · Odpowiadamy w 24h
            </p>

            <span className="hero-cue" aria-hidden="true">
              <span className="hero-cue__rail"><span className="hero-cue__dot" /></span>
              Przewiń, żeby zobaczyć
            </span>
          </div>

          <div ref={colRef} className="hero-device-col">
            <div ref={deviceRef} className="hero-device">
              <div ref={cardRef} className="device-card">
                <div ref={frameRef} className="scrub-frame">
                  <RealEstateMockup
                    photos={{
                      hero: '/mockup/listing-hero.jpg',
                      side1: '/mockup/listing-side1.jpg',
                      side2: '/mockup/listing-side2.jpg',
                      'Sopot, Dolny Sopot': '/mockup/listing-sopot.jpg',
                      'Gdynia, Orłowo': '/mockup/listing-thumb-1.jpg',
                      'Gdańsk, Oliwa': '/mockup/listing-thumb-2.jpg',
                      detail: '/mockup/listing-detail.jpg',
                      t1: '/mockup/listing-side1.jpg',
                      t2: '/mockup/listing-thumb-2.jpg',
                      t3: '/mockup/listing-thumb-3.jpg',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outside the device column on purpose: the column carries the scene's
            perspective and therefore its own stacking context, and these two
            have to blend against the card itself. */}
        <span className="hero-mark" aria-hidden="true">
          {marks.map((m, i) => (
            <span
              key={m}
              ref={(el) => { markRefs.current[i] = el }}
              data-on={i === 0 ? 'true' : 'false'}
            >
              {m}
            </span>
          ))}
        </span>

        <span className="hero-rail" aria-hidden="true"><i /></span>
      </div>
    </section>
  )
}
