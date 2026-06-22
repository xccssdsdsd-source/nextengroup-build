'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const carouselWords = ['strony internetowe', 'automatyzacje AI', 'agentów AI']


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
        background: '#000000',
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
            <h1
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(22px, 3.2vw, 48px)',
                lineHeight: '1.09',
                letterSpacing: '-0.025em',
                color: '#EAF0F7',
              }}
            >
              <span className="block text-balance" style={{ marginBottom: '0.06em' }}>Strony, które pozyskują klientów.</span>
              <span className="block text-balance">Automatyzacje, które obsługują ich za Ciebie.</span>
            </h1>

            <div className="hero-from-right mt-4 flex justify-start" style={{ animationDelay: '90ms' }}>
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
