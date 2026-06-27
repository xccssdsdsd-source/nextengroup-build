'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const carouselWords = ['strony internetowe', 'automatyzacje AI', 'agentów AI']

const trustOwners = [
  { src: '/owner-pm-apartments.png', alt: 'Klient PM Apartments' },
  { src: '/owner-dorimari.png', alt: 'Klient Dorimari' },
  { src: '/owner-msdesignstudio.png', alt: 'Klient MS Design Studio' },
]


const badges = [
  { label: 'Nielimitowana liczba poprawek', mobile: true },
  { label: 'Bezpłatna wizualizacja', mobile: true },
  { label: 'Pełne wsparcie', mobile: false },
]

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <defs>
      <linearGradient id="chk-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5EEAFF" />
        <stop offset="100%" stopColor="#22D3EE" />
      </linearGradient>
    </defs>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="url(#chk-g)" />
    <polyline points="22 4 12 14.01 9 11.01" stroke="url(#chk-g)" />
  </svg>
)

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true">
    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.785 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.211l8.2-1.193z" />
  </svg>
)

const TrustBadge = () => (
  <div className="hero-from-left mb-5" style={{ animationDelay: '40ms' }}>
    <div className="flex w-fit flex-col items-start gap-2">
      <div className="flex items-center gap-0.5" aria-label="Ocena 5 na 5 gwiazdek">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2.5">
          {trustOwners.map((o) => (
            <span
              key={o.src}
              className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#0B0F16]"
            >
              <Image src={o.src} alt={o.alt} fill sizes="36px" className="object-cover" />
            </span>
          ))}
        </div>
        <span className="whitespace-nowrap text-[13px] font-semibold tracking-wide text-[#C8D8E8]">
          Zaufali nam
        </span>
      </div>
    </div>
  </div>
)

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => { setIsMounted(true) }, [])

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
              <span className="block" style={{ color: '#EAF0F7', marginBottom: '0.04em' }}>
                Strony, które{' '}
                <span style={{ background: 'linear-gradient(95deg, #5EEAFF 0%, #22D3EE 55%, #0E7490 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>pozyskują</span>{' '}klientów.
              </span>
              <span className="block" style={{ color: '#C8D8E8' }}>
                Automatyzacje, które{' '}
                <span style={{ background: 'linear-gradient(95deg, #5EEAFF 0%, #22D3EE 55%, #0E7490 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>obsługują</span>{' '}ich za Ciebie.
              </span>
            </h1>

            <div className="hero-from-right mt-5 flex justify-start" style={{ animationDelay: '90ms' }}>
              <p className="text-sm sm:text-base leading-relaxed text-[#A6B2C4]">
                Budujemy Twój biznes przez{' '}
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <span key={isMounted ? titleNumber : 'ssr'} className={isMounted ? 'hero-rotate-word' : undefined} style={{ color: '#5EEAFF', fontWeight: 600, display: 'inline-block' }}>
                    {carouselWords[isMounted ? titleNumber : 0]}
                  </span>
                </span>
              </p>
            </div>

            <div className="mt-3 flex items-center justify-start gap-5 text-xs text-[#A6B2C4]">
              {badges.map((b, i) => (
                <span
                  key={b.label}
                  className={`hero-badge flex items-center gap-1.5${!b.mobile ? ' hidden sm:flex' : ''}`}
                  style={{ animationDelay: `${0.55 + i * 0.1}s` }}
                >
                  <CheckIcon />
                  {b.label}
                </span>
              ))}
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

