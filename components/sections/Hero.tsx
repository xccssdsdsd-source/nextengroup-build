'use client'

import { Fragment, useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import Image from 'next/image'
import FlipWords from '@/components/ui/FlipWords'
import Stars from '@/components/ui/Stars'
import RealEstateMockup from '@/components/ui/RealEstateMockup'
import { scrollToSection } from '@/lib/scrollToSection'
// Side-effect import: the file is all `:global()` rules. It lives beside the
// component rather than in globals.css so the scene's own styling travels with
// the scene — and so a stylesheet three other sections share is not edited to
// tune one hero.
import './Hero.scene.module.css'

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
  const colRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const markRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    const stage = stageRef.current
    const sticky = stickyRef.current
    const copy = copyRef.current
    const device = deviceRef.current
    const col = colRef.current
    const frame = frameRef.current
    if (!stage || !sticky || !copy || !device || !col || !frame) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const track = stage.querySelector<HTMLElement>('[data-scrub-track]')
    if (!track) return

    // Everything the scene needs to know about the page is measured once per
    // layout and read from these — a getBoundingClientRect per property inside
    // the frame loop is what turns a scrub into a stutter.
    let span = 1
    let cardH = 0
    let travel = 0
    let wide = true
    // How far below its resting place the machine waits before the reader has
    // scrolled at all, in pixels. It is measured, not guessed: the top edge of
    // the lid has to land a set distance under the last line of copy on every
    // viewport there is, and a fraction of the card height only ever gets that
    // right on the one window it was tuned in.
    let restPx = 300

    const exits = Array.from(copy.querySelectorAll<HTMLElement>('[data-hero-exit]'))
    const cue = copy.querySelector<HTMLElement>('.hero-cue')

    const measure = () => {
      wide = window.innerWidth >= 1024
      span = Math.max(stage.offsetHeight - window.innerHeight, 1)

      device.style.transform = ''
      const colRect = col.getBoundingClientRect()
      const stickyRect = sticky.getBoundingClientRect()
      cardH = colRect.height

      // The two marks live on the sticky, so they are given the device's own
      // edges to hang from.
      sticky.style.setProperty('--card-l', `${(colRect.left - stickyRect.left).toFixed(1)}px`)
      sticky.style.setProperty('--card-b', `${(colRect.bottom - stickyRect.top).toFixed(1)}px`)

      // Where the copy actually ends. A hidden cue reports a zero rect, so the
      // note underneath it is the floor and `Math.max` picks whichever of the
      // two is really on screen.
      const anchors = [cue, copy.querySelector<HTMLElement>('.hero-note')]
      const copyBottom = anchors.reduce((low, el) => {
        if (!el) return low
        const r = el.getBoundingClientRect()
        return r.height > 0 ? Math.max(low, r.bottom - stickyRect.top) : low
      }, stickyRect.height * 0.66)

      // The lid's own top edge, once the resting scale has been applied about
      // an origin that sits below the element (50% 120%), is 0.216 of the card
      // further down than the layout box says. Without that term the peek is
      // a hundred-odd pixels lower than asked for on a laptop screen.
      const top = colRect.top - stickyRect.top + 0.216 * cardH
      const gap = wide ? 46 : 34
      restPx = Math.max(
        Math.max(
          copyBottom + gap - top,
          // Never so high that the machine crowds the headline, and never so
          // low that all the reader gets is a grey sliver of bezel.
          stickyRect.height * 0.7 - top,
        )
          // The settle beat's own offset is still at full value while the page
          // is at rest, so it is part of the drop and has to come out of it —
          // left in, it put the whole machine a card-height below the fold.
          - 0.4 * cardH,
        0,
      )

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

    const render = (p: number) => {
      sticky.style.setProperty('--p', p.toFixed(4))

      // The machine waits a beat before it moves. It stands close enough to
      // the copy at rest that starting both on the same frame had the lid's
      // top edge slicing through the last line of type while that line was
      // still solid — the copy has to be leaving before the object arrives.
      const enter = easeOutExpoish(range(p, 0.015, 0.15))
      const settle = easeOutExpoish(range(p, 0.15, 0.31))
      // The exit accelerates instead of decelerating. An ease-out here empties
      // the screen a third of a viewport early and the reader scrolls through
      // nothing; this way the machine is alive until the section actually ends.
      const out = Math.pow(range(p, 0.9, 1), 2.6)

      // The copy leaves under a mask travelling up rather than by fading: a
      // fade reads as the page giving up, a wipe reads as a cut. Bottom line
      // first, so the last thing standing is the promise and nothing is ever
      // left sitting on top of the frame.
      exits.forEach((el, i) => {
        const k = exits.length - 1 - i
        const from = 0.05 + k * 0.018
        const e = easeOutExpoish(range(p, from, from + 0.12))
        el.style.clipPath = e > 0.001 ? `inset(0 0 ${(e * 100).toFixed(2)}% 0)` : ''
        el.style.transform = `translate3d(0, ${(-48 * e).toFixed(2)}px, 0)`
      })
      // The copy climbs while the product rises, so the two share the screen
      // for the hand-over instead of stacking on the same centre line, and it
      // is already thinning by the time the mask starts eating the lines.
      copy.style.transform = `translate3d(0, ${(-90 * enter).toFixed(1)}px, 0)`
      copy.style.opacity = (1 - 0.7 * easeOutExpoish(range(p, 0.04, 0.22))).toFixed(3)
      copy.style.visibility = p > 0.33 ? 'hidden' : ''
      if (cue) {
        // The entrance keyframe holds opacity forwards, so only an important
        // declaration can take the cue back off the screen.
        const c = 1 - range(p, 0.012, 0.075)
        cue.style.setProperty('opacity', c.toFixed(3), 'important')
        cue.style.visibility = c < 0.01 ? 'hidden' : ''
      }

      const rot = wide ? 8 - 5 * enter - 3 * settle : 0
      // The scene ends where the object ends: the laptop arrives, settles at
      // its own size and stays there. Nothing after this beat makes it bigger,
      // so the reader keeps a page around it the whole way through.
      const scale = (0.82 + 0.11 * enter + 0.07 * settle) * (1 - 0.05 * out)
      // Three offsets, not two. The first frame is no longer half an empty
      // page: the machine already stands just under the fold, out of focus and
      // half-lit, so the composition the reader lands on has a foreground and
      // a background instead of a headline floating over white. The entry
      // beat then lifts it out of that defocus, the settle beat walks it the
      // last stretch up to centre, and the last term takes it away again — a
      // machine cannot be wiped off in slices the way a flat card could, so it
      // recedes and lifts instead of being cut.
      const ty = restPx * (1 - enter) + 0.4 * cardH * (1 - settle) - 70 * out
      const blur = (wide ? 8 : 5) * (1 - enter)
      const shown = (0.72 + 0.28 * enter) * (1 - out)

      device.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotateX(${rot.toFixed(2)}deg)`
      device.style.opacity = shown.toFixed(3)
      device.style.filter = blur > 0.08 ? `blur(${blur.toFixed(2)}px)` : ''

      // Two clocks for two jobs. The floor shadow belongs to the object and
      // arrives with it; the mark and the rail are chrome that names a panel,
      // and a label printed across a screen the machine has not finished
      // walking up to reads as a bug. They wait for the frame to be still.
      sticky.style.setProperty('--progress-in', (enter * (1 - out)).toFixed(3))
      sticky.style.setProperty('--chrome-in', (settle * (1 - out)).toFixed(3))
      // The specular on the glass answers the tilt, so it is written to two
      // decimals and stops changing the moment the lid is flat: the long scrub
      // through the panels then leaves a full-frame blended layer alone
      // instead of repainting it sixty times a second for no visible reason.
      sticky.style.setProperty('--gloss', settle.toFixed(2))

      // The photograph inside the screen wipes down while the machine rises,
      // so the object arrives already carrying an image — the reader never
      // sees a blank white rectangle claiming to be the work. It starts open
      // as far as the peek under the fold reaches, so the slice standing above
      // the fold at rest is photograph and never an empty screen.
      sticky.style.setProperty('--rev-shot', (0.52 + 0.48 * enter).toFixed(3))
      // The client site's own type sets itself once the machine is sharp and
      // still. Two beats, never one: the frame lands, then the page loads in
      // it — stacking both on the entry made the whole thing a blur of motion.
      // It does not start from zero, though: the slice of screen standing above
      // the fold at rest is the top of the client's page, and a photograph with
      // no navigation on it is not a page. The bar is a third lit before the
      // reader touches the wheel; everything under it starts closed.
      sticky.style.setProperty('--rev-copy', (0.3 + 0.7 * easeOutExpoish(range(p, 0.15, 0.34))).toFixed(3))

      // The device stops moving at 0.3, so the scrub inside the screen takes
      // every turn of the wheel from there on — the scene's whole second half
      // is the product being used, not the frame being animated.
      const u = range(p, 0.3, 0.82)
      const t = scrubAt(u)
      track.style.transform = `translate3d(0, ${(-t * travel).toFixed(2)}px, 0)`
      // One rate for the whole frame, multiplied per layer by `--pz` in the
      // stylesheet: the facade behind the client's headline travels furthest,
      // the index photographs a little, the contact sheet of thumbnails almost
      // not at all. The whole point is that you cannot name it — you only
      // notice the frame has depth.
      frame.style.setProperty('--mock-par', `${(20 - 40 * t).toFixed(2)}px`)
      sticky.style.setProperty('--progress', t.toFixed(4))
      // Each panel's photography wipes in while the panel is still travelling
      // and is complete before it comes to rest, so the reader always meets a
      // finished page — the reveal happens in the movement, never in the dwell.
      sticky.style.setProperty('--rev-2', easeOutExpoish(range(t, 0.12, 0.44)).toFixed(3))
      sticky.style.setProperty('--rev-3', easeOutExpoish(range(t, 0.62, 0.94)).toFixed(3))

      const mark = Math.min(marks.length - 1, Math.round(t * (marks.length - 1)))
      if (mark !== lastMark) {
        lastMark = mark
        markRefs.current.forEach((el, i) => {
          if (el) el.dataset.on = i === mark ? 'true' : 'false'
        })
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
            {/* The first thing above the headline is other people. It arrives
                last of everything in the block — the promise still leads the
                reading order — and it is a link, because the only useful thing
                a reader can do with a rating is go and read the sentences it
                came from. The third face is a monogram, not a photograph: that
                client has not sent one, and a stock headshot standing in for a
                real person is the one thing a proof strip cannot afford. */}
            <div className="hero-proof-row hero-from-left" data-hero-exit style={{ animationDelay: '380ms' }}>
              <a href="#opinie" onClick={(e) => go(e, 'opinie')} className="hero-proof">
                <span className="hero-proof__faces" aria-hidden="true">
                  <Image src="/owner-pm-apartments.webp" alt="" width={28} height={28} className="hero-proof__face" />
                  <Image src="/owner-msdesignstudio.webp" alt="" width={28} height={28} className="hero-proof__face" />
                  <span className="hero-proof__face hero-proof__face--mono">C2</span>
                </span>
                <Stars className="hero-proof__stars" label="Ocena 5 na 5" size={13} />
                <span className="hero-proof__text">
                  <strong>5,0</strong> z 3 opinii klientów
                </span>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="hero-proof__go">
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

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
              Strona i panel ofert, które klient znajdzie w Google i w ChatGPT.
              Gotowe do obejrzenia w 24 godziny — płacisz po Twoim „tak”.
            </p>

            <div className="hero-actions hero-from-left" data-hero-exit style={{ animationDelay: '240ms' }}>
              <a
                href="#kontakt"
                onClick={(e) => go(e, 'kontakt')}
                className="btn btn-primary hero-btn"
              >
                Zobacz wizualizację w 24h
                {/* The arrow is the one thing that moves on hover, and it
                    moves along the axis the button actually sends you. */}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#proces" onClick={(e) => go(e, 'proces')} className="btn btn-ghost hero-btn">
                Jak to działa
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <p className="hero-note hero-from-left" data-hero-exit style={{ animationDelay: '300ms' }}>
              Bez zaliczki · Poprawki bez limitu · Odpowiadamy w 24h
            </p>

            <span className="hero-cue" aria-hidden="true">
              <span className="hero-cue__rail"><span className="hero-cue__dot" /></span>
              Przewiń, żeby zobaczyć
            </span>
          </div>

          <div ref={colRef} className="hero-device-col">
            <div ref={deviceRef} className="hero-device">
              <div className="laptop">
                <div className="laptop-lid">
                  <span className="laptop-cam" aria-hidden="true" />
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
                <span className="laptop-base" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Outside the device column on purpose: the column carries the scene's
            perspective and therefore its own stacking context, and these two
            have to blend against the laptop itself. */}
        <span className="hero-mark" aria-hidden="true">
          {marks.map((m, i) => (
            <span
              key={m}
              ref={(el) => { markRefs.current[i] = el }}
              data-on={i === 0 ? 'true' : 'false'}
            >
              {/* The numeral is the only thing that tells the reader the
                  sequence has a length — without it the label just changes
                  and there is no way to know how much scene is left. */}
              <i>{String(i + 1).padStart(2, '0')}</i>
              {m}
            </span>
          ))}
        </span>

        <span className="hero-rail" aria-hidden="true"><i /></span>
      </div>
    </section>
  )
}
