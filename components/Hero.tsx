'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const carouselWords = ['strony internetowe', 'automatyzację AI', 'agentów AI']
const ctaMobileWords = ['Umów bezpłatną wizytę', 'Zapytaj o wycenę', 'Porozmawiajmy']

const line1 = ['Strony,', 'które', 'pozyskują', 'klientów.']
const line2 = ['Automatyzacje,', 'które', 'obsługują', 'ich', 'za', 'Ciebie.']

const wordDelay = (i: number) => `${0.12 + i * 0.065}s`

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
      className="relative overflow-hidden pt-40 sm:pt-56 md:pt-64"
      style={{ background: 'radial-gradient(ellipse 90% 70% at 50% -5%, #11203A 0%, #0A0E14 55%, #06090F 100%)' }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div data-parallax-blob style={{ position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)', width: 760, height: 460, background: 'radial-gradient(ellipse, rgba(34,211,238,0.16) 0%, transparent 70%)', filter: 'blur(60px)', borderRadius: '50%' }} />
        <div data-parallax-blob style={{ position: 'absolute', top: '8%', left: '10%', width: 480, height: 320, background: 'radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)', filter: 'blur(50px)', borderRadius: '50%' }} />
        <div data-parallax-blob style={{ position: 'absolute', top: '32%', right: '6%', width: 380, height: 300, background: 'radial-gradient(ellipse, rgba(245,181,71,0.08) 0%, transparent 70%)', filter: 'blur(55px)', borderRadius: '50%' }} />
      </div>

      <BackgroundPaths />

      <div className="relative z-10 px-5 sm:px-6 md:px-12 mx-auto max-w-7xl">
        <div className="w-full text-center">

          <div className="mx-auto mb-6 sm:mb-8" data-parallax-headline>
            <h1
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(25px, 5.5vw, 54px)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                overflowWrap: 'break-word',
                color: '#EAF0F7',
              }}
            >
              <span className="block text-balance" style={{ display: 'block', marginBottom: '0.08em' }}>
                {line1.map((word, i) => (
                  <span key={i} className="hero-word-mask" style={{ marginRight: '0.22em' }}>
                    <span className="hero-word" style={{ animationDelay: wordDelay(i) }}>{word}</span>
                  </span>
                ))}
              </span>
              <span className="block text-balance">
                {line2.map((word, i) => (
                  <span key={i} className="hero-word-mask" style={{ marginRight: '0.22em' }}>
                    <span className="hero-word" style={{ animationDelay: wordDelay(line1.length + i), background: 'linear-gradient(135deg, #7DF0FF 0%, #5EEAFF 50%, #22D3EE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{word}</span>
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div className="hero-from-right" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', animationDelay: '90ms' }}>
            <p className="text-sm sm:text-base leading-relaxed text-[#A6B2C4]">
              Budujemy Twój biznes przez{' '}
              {!isMounted ? (
                <span style={{ color: '#5EEAFF', fontWeight: 600 }}>{carouselWords[0]}</span>
              ) : (
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <AnimatePresence mode="wait">
                    <m.span key={titleNumber} style={{ color: '#5EEAFF', fontWeight: 600, display: 'inline-block' }} initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-70%' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                      {carouselWords[titleNumber]}
                    </m.span>
                  </AnimatePresence>
                </span>
              )}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#A6B2C4]">
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

          <div className="hero-from-left mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-4 sm:px-0" style={{ animationDelay: '200ms' }}>
            <a href="#kontakt" onClick={(e) => handleAnchorClick(e, '#kontakt')} className="btn btn-primary inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold overflow-hidden">
              <span style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom' }}>
                {!isMounted ? (
                  ctaMobileWords[0]
                ) : (
                  <AnimatePresence mode="wait">
                    <m.span key={titleNumber} style={{ display: 'inline-block' }} initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-70%' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                      {ctaMobileWords[titleNumber % ctaMobileWords.length]}
                    </m.span>
                  </AnimatePresence>
                )}
              </span>
            </a>
            <a href="#portfolio" onClick={(e) => handleAnchorClick(e, '#portfolio')} className="btn btn-ghost inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold">
              Realizacje
            </a>
          </div>
        </div>

        <div className="hero-mockup mt-12 sm:mt-14 flex justify-center pb-0 animate-float" style={{ perspective: '1400px', animationDelay: '1s' }}>
          <div className="hero-device-tilt w-full flex justify-center">
            <DeviceMockups />
          </div>
        </div>
      </div>
    </section>
  )
}
