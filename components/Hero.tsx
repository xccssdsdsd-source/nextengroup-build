'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

const BackgroundPaths = dynamic(() => import('./BackgroundPaths'))
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
  const [isTouch, setIsTouch] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  /* ── Mouse-following gradient — desktop only (technique from nextjs-animations repo) ── */
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22 })
  const gradientBg = useMotionTemplate`radial-gradient(700px circle at ${springX}% ${springY}%, rgba(34,211,238,0.06) 0%, transparent 65%)`

  useEffect(() => {
    setIsMounted(true)
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
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

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (isTouch) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <section
      ref={heroRef}
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
      onMouseMove={handleMouseMove}
    >
      <BackgroundPaths />

      {/* Mouse-following gradient overlay — desktop only */}
      {!isTouch && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: gradientBg }}
          aria-hidden="true"
        />
      )}

      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10"
        style={{ paddingTop: 'var(--nav-h)', paddingBottom: '1.5rem' }}
      >
        <div
          style={{
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
                fontSize: 'clamp(28px, 3.2vw, 48px)',
                lineHeight: '1.09',
                letterSpacing: '-0.025em',
                color: '#EAF0F7',
              }}
            >
              <span className="block text-balance" style={{ marginBottom: '0.06em' }}>
                {['Strony,', 'które', 'pozyskują', 'klientów.'].map((word, i) => (
                  <span key={i} className="hero-word-mask" style={{ marginRight: '0.22em' }}>
                    <span className="hero-word" style={{ animationDelay: `${i * 0.045}s` }}>{word}</span>
                  </span>
                ))}
              </span>
              <span className="block text-balance">
                {['Automatyzacje,', 'które', 'obsługują', 'ich', 'za', 'Ciebie.'].map((word, i) => (
                  <span key={i} className="hero-word-mask" style={{ marginRight: '0.22em' }}>
                    <span className="hero-word" style={{ animationDelay: `${(i + 4) * 0.045}s` }}>{word}</span>
                  </span>
                ))}
              </span>
            </h1>

            <div className="hero-from-right mt-4 flex justify-start" style={{ animationDelay: '90ms' }}>
              <p className="text-sm sm:text-base leading-relaxed text-[#A6B2C4]">
                Budujemy Twój biznes przez{' '}
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isMounted ? titleNumber : 'ssr'}
                      style={{ color: '#5EEAFF', fontWeight: 600, display: 'inline-block' }}
                      initial={isMounted ? { opacity: 0, y: '110%' } : false}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '-70%' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {carouselWords[isMounted ? titleNumber : 0]}
                    </motion.span>
                  </AnimatePresence>
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
                Kontakt
              </a>
              <a href="#portfolio" onClick={(e) => handleAnchorClick(e, '#portfolio')} className="btn btn-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto font-semibold">
                Realizacje
              </a>
            </div>
          </div>

          {/* ── MOCKUP COLUMN — DeviceMockups has its own scroll+tilt parallax ── */}
          <div className="hero-mockup-col">
            <DeviceMockups />
          </div>
        </div>
      </div>
    </section>
  )
}
