'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const easeOut = 'easeOut'
const carouselWords = ['strony internetowe', 'automatyzację AI', 'agentów AI']
const ctaMobileWords = ['Umów bezpłatną wizytę', 'Zapytaj o wycenę', 'Porozmawiajmy']

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
      className="relative overflow-hidden pt-40 sm:pt-56 md:pt-64"
    >
      <BackgroundPaths />

      {/* Ambient gradient depth — establishes brand identity, zero JS */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '120%', height: '75%',
        background: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(59,130,246,0.10) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: '45%', height: '55%',
        background: 'radial-gradient(ellipse at 70% 70%, rgba(99,102,241,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '15%', left: '-5%',
        width: '35%', height: '50%',
        background: 'radial-gradient(ellipse at 30% 30%, rgba(37,99,235,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="relative z-10 px-5 sm:px-6 md:px-12 mx-auto max-w-7xl">

        <div className="w-full text-center">
          {/* Headline — animates in first */}
          <div
            className="hero-from-left mx-auto mb-6 sm:mb-8"
            style={{ animationDelay: '0ms' }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(25px, 5.5vw, 54px)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                overflowWrap: 'break-word',
                color: '#111827'
              }}
            >
              <span className="block text-balance">Strony, które pozyskują klientów.</span>
              <span className="block text-balance" style={{ background: 'linear-gradient(135deg, #111827 30%, #1D4ED8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Automatyzacje, które obsługują ich za Ciebie.</span>
            </h1>
          </div>

          {/* Carousel subline — animates in second */}
          <div
            className="hero-from-right"
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', animationDelay: '90ms' }}
          >
            <p className="text-sm sm:text-base leading-relaxed text-[#555555]">
              Budujemy Twój biznes przez{' '}
              {!isMounted ? (
                <span style={{ color: '#0D0D0D', fontWeight: 600 }}>
                  {carouselWords[0]}
                </span>
              ) : (
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <AnimatePresence mode="wait">
                    <m.span
                      key={titleNumber}
                      style={{ color: '#0D0D0D', fontWeight: 600, display: 'inline-block' }}
                      initial={{ opacity: 0, y: '110%' }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '-70%' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {carouselWords[titleNumber]}
                    </m.span>
                  </AnimatePresence>
                </span>
              )}
            </p>
          </div>

          {/* Trust indicators */}
          <div
            className="hero-from-left mt-4 flex items-center justify-center gap-6 text-xs text-[#888]"
            style={{ animationDelay: '140ms' }}
          >
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Bez umów długoterminowych
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Projekt gratis przed startem
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Wsparcie 24/7
            </span>
          </div>

          {/* CTA buttons — animates in third */}
          <div
            className="hero-from-left mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-4 sm:px-0"
            style={{ animationDelay: '200ms' }}
          >
            <a
              href="#kontakt"
              onClick={(e) => handleAnchorClick(e, '#kontakt')}
              className="btn btn-primary inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold overflow-hidden"
            >
              <span style={{ display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom' }}>
                {!isMounted ? (
                  ctaMobileWords[0]
                ) : (
                  <AnimatePresence mode="wait">
                    <m.span
                      key={titleNumber}
                      style={{ display: 'inline-block' }}
                      initial={{ opacity: 0, y: '110%' }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '-70%' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {ctaMobileWords[titleNumber % ctaMobileWords.length]}
                    </m.span>
                  </AnimatePresence>
                )}
              </span>
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleAnchorClick(e, '#portfolio')}
              className="btn btn-ghost inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold"
            >
              Realizacje
            </a>
          </div>
        </div>

        {/* Device mockup — animates in last */}
        <div
          className="hero-mockup mt-12 sm:mt-14 flex justify-center pb-0 animate-float"
          style={{ perspective: '1400px', animationDelay: '1s' }}
        >
          <div className="hero-device-tilt w-full">
            <div
              style={{
                borderRadius: '24px',
                backgroundColor: '#FFFFFF',
                maxWidth: '1100px',
                maxHeight: 'clamp(180px, 40vw, 400px)',
                margin: '0 auto',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.02), 0 16px 48px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                willChange: 'transform',
                position: 'relative',
              }}
            >
              {isMounted && <DeviceMockups />}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, transparent, #FFFFFF)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
