'use client'

import Image from 'next/image'
import { useEffect, useState, type MouseEvent } from 'react'
import ChatWidget from './ChatWidget'
import SectionGlow from './ui/SectionGlow'
import { scrollToSection } from '@/lib/scrollToSection'

const carouselWords = ['strony internetowe', 'automatyzacje AI', 'agentów AI']

const trustOwners = [
  { src: '/owner-pm-apartments.webp', alt: 'Klient PM Apartments' },
  { src: '/owner-dorimari.webp', alt: 'Klient Dorimari' },
  { src: '/owner-msdesignstudio.webp', alt: 'Klient MS Design Studio' },
]

const gradientAccent = {
  background: 'linear-gradient(95deg, #5EEAFF 0%, #22D3EE 55%, #0E7490 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true">
    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.785 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.211l8.2-1.193z" />
  </svg>
)

const TrustProof = () => (
  <div className="hero-from-left mb-6" style={{ animationDelay: '40ms' }}>
    <div className="flex items-center gap-3.5">
      <div className="flex -space-x-2.5">
        {trustOwners.map((o) => (
          <span key={o.src} className="relative inline-block h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#0B0F16]">
            <Image src={o.src} alt={o.alt} fill sizes="40px" className="object-cover" />
          </span>
        ))}
      </div>
      <div className="flex items-center gap-0.5" role="img" aria-label="Ocena 5 na 5 gwiazdek">
        {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}
      </div>
    </div>
  </div>
)

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(-1)

  useEffect(() => { setIsMounted(true) }, [])

  // Rotujące słowo: każde wjeżdża od dołu i wypycha poprzednie do góry.
  useEffect(() => {
    if (!isMounted) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = setInterval(() => {
      setWordIndex((i) => {
        setPrevIndex(i)
        return (i + 1) % carouselWords.length
      })
    }, 2400)
    return () => clearInterval(interval)
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
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SectionGlow variant="hero" />
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
            <TrustProof />
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(30px, 3.6vw, 58px)',
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
              }}
            >
              <span
                className="block hero-heading-line"
                style={{
                  color: '#EAF0F7',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3.9vw, 62px)',
                  lineHeight: '1.02',
                  letterSpacing: '-0.038em',
                  marginBottom: '0.16em',
                }}
              >
                Strony, które{' '}
                <span className="serif-accent" style={gradientAccent}>pozyskują</span>{' '}klientów.
              </span>
              <span
                className="block hero-heading-line"
                style={{
                  color: '#EAF0F7',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3.9vw, 62px)',
                  lineHeight: '1.02',
                  letterSpacing: '-0.038em',
                  marginBottom: '0.16em',
                }}
              >
                Automatyzacje, które{' '}
                <span className="serif-accent" style={gradientAccent}>obsługują</span>{' '}ich za Ciebie.
              </span>
            </h1>

            <div className="hero-from-right mt-7 flex justify-start" style={{ animationDelay: '90ms' }}>
              <p className="text-sm sm:text-base leading-relaxed text-[#A6B2C4]" style={{ minHeight: '1.7em' }}>
                Budujemy Twój biznes przez{' '}
                <span
                  role="group"
                  aria-label={carouselWords[wordIndex]}
                  style={{ display: 'inline-block', position: 'relative', height: '1.6em', overflow: 'hidden', verticalAlign: 'bottom' }}
                >
                  <span aria-hidden="true" style={{ visibility: 'hidden', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    strony internetowe
                  </span>
                  {carouselWords.map((word, i) => {
                    const cls = i === wordIndex ? 'word-swap-in' : i === prevIndex ? 'word-swap-out' : 'word-swap-hidden'
                    return (
                      <span
                        key={word}
                        aria-hidden="true"
                        className={cls}
                        style={{ position: 'absolute', left: 0, top: 0, color: '#5EEAFF', fontWeight: 600, whiteSpace: 'nowrap' }}
                      >
                        {word}
                      </span>
                    )
                  })}
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

          {/* ── AI CHAT ── */}
          <div className="hero-from-right flex justify-center lg:justify-end mt-10 md:mt-0" style={{ animationDelay: '260ms' }}>
            <div className="w-full max-w-[500px]">
              <ChatWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
