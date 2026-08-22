'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'
import Stars from '@/components/ui/Stars'

type Review = {
  // One entry per paragraph, printed in full. A testimonial that has been
  // trimmed to fit a card is no longer the sentence the client signed.
  quote: string[]
  name: string
  role: string
  case: string
  photo?: string
  // Used only where the client has not sent a photograph. A monogram is
  // honest about that; a stock headshot standing in for a real person is not.
  initials?: string
}

const reviews: Review[] = [
  {
    quote: [
      'Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.',
    ],
    name: 'Patryk Zacharek',
    role: 'Właściciel, PM Apartments',
    photo: '/owner-pm-apartments.webp',
    case: 'Wdrożone w 72h',
  },
  {
    quote: [
      'Z pełnym przekonaniem polecam współpracę z Getbuild.pl. Firma stworzyła dla mnie stronę internetową MS Design Studio. Cały proces przebiegał sprawnie, komunikacja była na bardzo wysokim poziomie, a wszelkie uwagi były szybko wdrażane. Efekt końcowy spełnił moje oczekiwania zarówno pod względem estetyki, jak i funkcjonalności.',
    ],
    name: 'Magdalena Sioła',
    role: 'MS Design Studio',
    photo: '/owner-msdesignstudio.webp',
    case: 'Wdrożone w 24h',
  },
  {
    quote: [
      'Z pełnym przekonaniem polecam współpracę z twórcą mojej strony internetowej. Cały proces przebiegł naprawdę sprawnie, szybko i bez żadnych problemów. Od samego początku bardzo dobry kontakt, konkretne podejście do klienta i przede wszystkim pełne zaangażowanie w realizację projektu.',
      'Strona została wykonana rzetelnie, fachowo i zgodnie z wcześniejszymi ustaleniami. Wszystkie moje uwagi i sugestie były na bieżąco uwzględniane, a w razie potrzeby mogłem liczyć na fachową poradę i pomoc. Widać duże doświadczenie, znajomość tematu i dbałość o każdy szczegół.',
      'Bardzo doceniam również uczciwość i terminowość. Wszystko zostało wykonane tak, jak się umawialiśmy, bez niepotrzebnych komplikacji i przeciągania terminów. Współpraca była naprawdę przyjemna i profesjonalna, co nie zawsze jest oczywiste przy tego typu projektach.',
      'Jestem bardzo zadowolony z efektu końcowego i z czystym sumieniem mogę polecić tę osobę każdemu, kto szuka kogoś rzetelnego, uczciwego, fachowego i zaangażowanego w swoją pracę. Jeśli będę w przyszłości potrzebował kolejnych zmian lub nowych rozwiązań, na pewno ponownie skorzystam z tej współpracy. Polecam z pełnym przekonaniem!',
    ],
    name: 'Robert',
    role: 'Właściciel, Chodkiewicza 2',
    initials: 'R',
    case: 'Wdrożone w tydzień',
  },
]

// A four-paragraph review needs longer on screen than a three-sentence one, so
// the dwell is read off the text rather than fixed. Nobody should have the
// longest testimonial pulled away from them mid-paragraph.
const dwellFor = (r: Review) => Math.min(16000, 5200 + r.quote.join(' ').length * 22)

export default function Opinie() {
  const [index, setIndex] = useState(0)
  const [height, setHeight] = useState<number | null>(null)
  const slides = useRef<Array<HTMLElement | null>>([])
  const viewport = useRef<HTMLDivElement>(null)
  const held = useRef(false)
  const onScreen = useRef(true)

  const go = useCallback((next: number) => {
    setIndex((next + reviews.length) % reviews.length)
  }, [])

  // The viewport is sized to the slide on show, so the longest review is shown
  // whole rather than cropped to the height of the shortest. Before this runs
  // the first slide is the only one in flow and the box is already its height,
  // so taking the measurement never moves the page.
  useLayoutEffect(() => {
    const measure = () => {
      const el = slides.current[index]
      if (el) setHeight(el.getBoundingClientRect().height)
    }
    measure()
    const ro = new ResizeObserver(measure)
    slides.current.forEach((el) => el && ro.observe(el))
    return () => ro.disconnect()
  }, [index])

  // Autoplay holds while the reader has a pointer or a keyboard inside the
  // section, and while the section is off screen entirely.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => {
      if (held.current || !onScreen.current) go(index)
      else go(index + 1)
    }, dwellFor(reviews[index]))
    return () => window.clearTimeout(t)
  }, [index, go])

  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { onScreen.current = e.isIntersecting }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const startX = useRef(0)
  const swiping = useRef(false)

  return (
    <section id="opinie" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Podpisane imieniem, nazwiskiem i <span className="serif-accent">firmą</span></h2>
          <p className="section-copy">
            Trzy opinie od klientów, których strony można otworzyć w tej samej zakładce — każda w całości, tak jak została wystawiona po wdrożeniu.
          </p>
        </div>

        <div
          className="reviews"
          data-fade-in
          aria-roledescription="karuzela"
          aria-label="Opinie klientów"
          onMouseEnter={() => { held.current = true }}
          onMouseLeave={() => { held.current = false }}
          onFocusCapture={() => { held.current = true }}
          onBlurCapture={() => { held.current = false }}
        >
          <div
            ref={viewport}
            className="reviews__viewport"
            style={height ? { height: `${Math.round(height)}px` } : undefined}
            onTouchStart={(e) => { startX.current = e.touches[0].clientX; swiping.current = false }}
            onTouchMove={(e) => { if (Math.abs(e.touches[0].clientX - startX.current) > 10) swiping.current = true }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - startX.current
              if (swiping.current && Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1))
            }}
          >
            <div className="reviews__track" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
              {reviews.map((r, i) => (
                <figure
                  key={r.name}
                  ref={(el) => { slides.current[i] = el }}
                  className="card testimonial-card review reviews__slide"
                  style={{ left: `${i * 100}%` }}
                  aria-hidden={i === index ? undefined : true}
                  inert={i === index ? undefined : true}
                >
                  <figcaption className="review__by">
                    <span className="review__id">
                      {r.photo ? (
                        <Image src={r.photo} alt="" width={44} height={44} className="review__avatar" />
                      ) : (
                        <span className="review__avatar review__avatar--mono" aria-hidden="true">{r.initials}</span>
                      )}
                      <span className="review__name">
                        <strong>{r.name}</strong>
                        <span>{r.role}</span>
                      </span>
                    </span>
                    <Stars className="review__stars" label="Ocena 5 na 5" />
                    <a href="#portfolio" className="review__case">{r.case}</a>
                  </figcaption>

                  <blockquote className="review__quote">
                    <span className="serif-accent review__mark" aria-hidden="true">„</span>
                    {r.quote.map((para) => (
                      <p key={para} className="review__para">{para}</p>
                    ))}
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>

          <div className="reviews__nav">
            <button type="button" className="reviews__arrow" onClick={() => go(index - 1)} aria-label="Poprzednia opinia">
              <PiCaretLeftBold size={18} aria-hidden="true" />
            </button>
            <span className="reviews__dots">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  className="reviews__dot"
                  data-on={i === index ? 'true' : undefined}
                  onClick={() => go(i)}
                  aria-label={`Opinia ${i + 1} z ${reviews.length}: ${r.name}`}
                  aria-current={i === index || undefined}
                />
              ))}
            </span>
            <button type="button" className="reviews__arrow" onClick={() => go(index + 1)} aria-label="Następna opinia">
              <PiCaretRightBold size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
