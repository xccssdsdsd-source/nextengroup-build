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

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1] as [number,number,number,number], delay: i * 0.08 },
  }),
}

const badgeVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] as [number,number,number,number], delay: 0.5 + i * 0.1 },
  }),
}

const badges = [
  { label: 'Bez umów długoterminowych', mobile: true },
  { label: 'Projekt gratis przed startem', mobile: true },
  { label: 'Wsparcie 24/7', mobile: false },
]

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <defs>
      <linearGradient id="chk-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#4F46E5" />
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
      suppressHydrationWarning
      data-no-reveal
      className="relative overflow-hidden pt-40 sm:pt-56 md:pt-64"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #FAFBFF 60%, #EEF2FF 100%)' }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div data-parallax-blob style={{ position: 'absolute', top: '8%', left: '12%', width: 480, height: 320, background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)', filter: 'blur(40px)', borderRadius: '50%' }} />
        <div data-parallax-blob style={{ position: 'absolute', top: '30%', right: '8%', width: 360, height: 280, background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)', filter: 'blur(50px)', borderRadius: '50%' }} />
        <div data-parallax-blob style={{ position: 'absolute', bottom: '10%', left: '38%', width: 300, height: 220, background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(45px)', borderRadius: '50%' }} />
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
                color: '#111827',
              }}
            >
              <span className="block text-balance" style={{ display: 'block', marginBottom: '0.08em' }}>
                {isMounted
                  ? line1.map((word, i) => (
                      <m.span key={i} custom={i} variants={wordVariants} initial="hidden" animate="show" style={{ display: 'inline-block', marginRight: '0.22em' }}>
                        {word}
                      </m.span>
                    ))
                  : line1.join(' ')}
              </span>
              <span
                className="block text-balance"
                style={{ background: 'linear-gradient(135deg, #111827 30%, #2563EB 65%, #4F46E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {isMounted
                  ? line2.map((word, i) => (
                      <m.span key={i} custom={line1.length + i} variants={wordVariants} initial="hidden" animate="show" style={{ display: 'inline-block', marginRight: '0.22em', WebkitTextFillColor: 'transparent' }}>
                        {word}
                      </m.span>
                    ))
                  : line2.join(' ')}
              </span>
            </h1>
          </div>

          <div className="hero-from-right" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', animationDelay: '90ms' }}>
            <p className="text-sm sm:text-base leading-relaxed text-[#555555]">
              Budujemy Twój biznes przez{' '}
              {!isMounted ? (
                <span style={{ color: '#0D0D0D', fontWeight: 600 }}>{carouselWords[0]}</span>
              ) : (
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <AnimatePresence mode="wait">
                    <m.span key={titleNumber} style={{ color: '#0D0D0D', fontWeight: 600, display: 'inline-block' }} initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-70%' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                      {carouselWords[titleNumber]}
                    </m.span>
                  </AnimatePresence>
                </span>
              )}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#888]">
            {badges.map((b, i) => (
              <m.span
                key={b.label}
                custom={i}
                variants={badgeVariants}
                initial={isMounted ? 'hidden' : false}
                animate={isMounted ? 'show' : false}
                className={`flex items-center gap-1.5${!b.mobile ? ' hidden sm:flex' : ''}`}
              >
                <CheckIcon />
                {b.label}
              </m.span>
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
          <div className="hero-device-tilt w-full">
            <div style={{ borderRadius: '24px', backgroundColor: '#FFFFFF', maxWidth: '1100px', maxHeight: 'clamp(180px, 40vw, 400px)', margin: '0 auto', boxShadow: '0 0 0 1px rgba(0,0,0,0.02), 0 16px 48px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.04)', overflow: 'hidden', willChange: 'transform', position: 'relative' }}>
              {isMounted && <DeviceMockups />}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, transparent, #FFFFFF)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
