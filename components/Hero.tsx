'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const carouselWords = ['strony internetowe', 'automatyzacje AI', 'agentów AI']

const MOBILE_TITLE =
  'Tworzymy strony, które pozyskują klientów, i automatyzujemy żmudne i czasochłonne procesy biznesowe.'

const gradientAccent = {
  background: 'linear-gradient(95deg, #5EEAFF 0%, #22D3EE 55%, #0E7490 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

const TrustBadge = () => (
  <div className="hero-from-left mb-5" style={{ animationDelay: '40ms' }}>
    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
        style={{ ...gradientAccent, WebkitTextFillColor: '#04141B', color: '#04141B', background: 'linear-gradient(135deg, #5EEAFF 0%, #22D3EE 55%, #0E7490 100%)' }}
      >
        3
      </span>
      <span className="whitespace-nowrap text-[13px] font-semibold tracking-wide text-[#C8D8E8]">
        zrealizowane projekty <span className="text-[#4E5D71]">·</span> Zaufali nam
      </span>
    </div>
  </div>
)

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [titleNumber, setTitleNumber] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileTyped, setMobileTyped] = useState('')
  const [mobileTypingDone, setMobileTypingDone] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  // Wykryj mobile + preferencję ograniczonego ruchu (typing animation tylko na mobile)
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 639px)').matches
    setIsMobile(mobile)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (mobile && reduceMotion) {
      setMobileTyped(MOBILE_TITLE)
      setMobileTypingDone(true)
    }
  }, [])

  // Typing animation tytułu na mobile: wpisuje znak po znaku wg realnego upływu czasu
  // (nie licznika kroków), więc chwilowy lag main threada nie spowalnia animacji trwale
  useEffect(() => {
    if (!isMounted || !isMobile || mobileTypingDone) return
    const CHAR_MS = 42
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const chars = Math.min(MOBILE_TITLE.length, Math.floor((now - start) / CHAR_MS))
      setMobileTyped(MOBILE_TITLE.slice(0, chars))
      if (chars >= MOBILE_TITLE.length) {
        setMobileTypingDone(true)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isMounted, isMobile, mobileTypingDone])

  useEffect(() => {
    if (!isMounted) return
    const timer = setInterval(() => {
      setTitleNumber(prev => (prev + 1) % carouselWords.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [isMounted])

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToSection(href.slice(1))
  }

  return (
    <section
      id="hero"
      suppressHydrationWarning
      data-no-reveal
      data-no-entrance
      className="relative"
      style={{
        minHeight: '100dvh',
        background:
          'radial-gradient(640px 420px at 74% 46%, rgba(34, 211, 238, 0.10), transparent 68%), linear-gradient(180deg, rgba(5, 8, 13, 0.08) 0%, rgba(5, 8, 13, 0.0) 62%, rgba(5, 8, 13, 0.30) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10"
        style={{ paddingTop: 'var(--nav-h)', paddingBottom: '1.5rem' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '2rem',
        }}
          className="hero-grid"
        >

          {/* ── TEXT COLUMN ── */}
          <div className="text-left" data-parallax-headline>
            <TrustBadge />
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(30px, 3.6vw, 58px)',
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
              }}
            >
              {/* Desktop / tablet — oryginalny dwuwierszowy tytuł */}
              <span className="hidden sm:block">
                <span
                  className="block"
                  style={{
                    color: '#EAF0F7',
                    fontWeight: 800,
                    fontSize: 'clamp(32px, 3.9vw, 62px)',
                    lineHeight: '1.02',
                    letterSpacing: '-0.038em',
                    marginBottom: '0.16em',
                  }}
                >
                  Strony, które{' '}
                  <span className="serif-accent" style={gradientAccent}>pozyskują</span>{' '}klientów.
                </span>
                <span
                  className="block"
                  style={{
                    color: '#8DA0B8',
                    fontWeight: 500,
                    fontSize: 'clamp(18px, 1.85vw, 29px)',
                    lineHeight: '1.3',
                    letterSpacing: '-0.015em',
                  }}
                >
                  Automatyzacje, które{' '}
                  <span className="serif-accent" style={gradientAccent}>obsługują</span>{' '}ich za Ciebie.
                </span>
              </span>
              {/* Mobile — typing animation nowego tytułu, kursor znika po wpisaniu */}
              <span className="block sm:hidden" style={{ color: '#EAF0F7' }} aria-label={MOBILE_TITLE}>
                <span aria-hidden="true">{mobileTyped}</span>
                {!mobileTypingDone && <span className="typing-cursor" />}
              </span>
            </h1>

            <div className="hero-from-right mt-7 flex justify-start" style={{ animationDelay: '90ms' }}>
              <p className="text-sm sm:text-base leading-relaxed text-[#A6B2C4]">
                Budujemy Twój biznes przez{' '}
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <span key={isMounted ? titleNumber : 'ssr'} className={isMounted ? 'hero-rotate-word' : undefined} style={{ color: '#5EEAFF', fontWeight: 600, display: 'inline-block' }}>
                    {carouselWords[isMounted ? titleNumber : 0]}
                  </span>
                </span>
              </p>
            </div>

            <div className="hero-from-left mt-6 flex flex-col gap-3 sm:flex-row justify-start sm:gap-4" style={{ animationDelay: '200ms' }}>
              <a href="#kontakt" onClick={(e) => handleAnchorClick(e, '#kontakt')} className="btn btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto font-semibold">
                Bezpłatna konsultacja
              </a>
              <a href="#portfolio" onClick={(e) => handleAnchorClick(e, '#portfolio')} className="btn btn-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto font-semibold">
                Realizacje
              </a>
            </div>

          </div>

          {/* ── MOCKUP ROW ── */}
          <div className="flex justify-center">
            <DeviceMockups />
          </div>
        </div>
      </div>
    </section>
  )
}

