'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const easeOut = 'easeOut'
const dynamicSubtitles = ['agentów AI', 'strony internetowe', 'automatyzacje AI']

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const timer = setInterval(() => {
      setTitleNumber(prev => (prev + 1) % dynamicSubtitles.length)
    }, 2500)
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
      className="relative overflow-hidden pt-36 sm:pt-40 md:pt-48"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(219,234,254,0.55), transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 72% 50%, rgba(37,99,235,0.06), transparent)' }}
      />
      <BackgroundPaths />

      <div className="relative z-10 px-5 sm:px-6 md:px-12 mx-auto max-w-7xl">

        <div className="w-full text-center">
          <h1
            className="mx-auto mb-5 sm:mb-6"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 6.5vw, 56px)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              overflowWrap: 'break-word',
              color: '#0A0A0F'
            }}
          >
            <span className="block text-balance">Strony, które pozyskują klientów.</span>
            <span className="block text-balance">Automatyzacje, które obsługują ich za Ciebie.</span>
          </h1>

          <div
            className="relative mx-auto mb-5 sm:mb-6 min-h-[60px]"
            style={{ contain: 'paint' }}
          >
            {!isMounted ? (
              <p className="text-sm sm:text-base leading-relaxed text-[#6B7280]">
                Budujemy Twój biznes przez {dynamicSubtitles[0]}
              </p>
            ) : (
              <AnimatePresence mode="wait">
                <m.p
                  key={titleNumber}
                  className="text-sm sm:text-base leading-relaxed text-[#6B7280]"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.38, ease: easeOut }}
                >
                  Budujemy Twój biznes przez {dynamicSubtitles[titleNumber]}
                </m.p>
              </AnimatePresence>
            )}
          </div>

          <div
            className="hero-fade-in mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-4 sm:px-0"
            style={{ animationDelay: '110ms' }}
          >
            <a
              href="#kontakt"
              onClick={(e) => handleAnchorClick(e, '#kontakt')}
              className="btn btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto"
              style={{ minWidth: '220px' }}
            >
              Kontakt
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleAnchorClick(e, '#portfolio')}
              className="btn btn-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto"
            >
              Realizacje
            </a>
          </div>
        </div>

        {/* Device mockup — perspective wrapper + CSS tilt-in animation */}
        <div
          className="hero-fade-in mt-12 sm:mt-14 flex justify-center pb-0"
          style={{ perspective: '1400px', animationDelay: '170ms' }}
        >
          <div className="hero-device-tilt w-full">
            <div
              style={{
                borderRadius: '20px',
                backgroundColor: '#0d1117',
                maxWidth: '1100px',
                maxHeight: 'clamp(180px, 40vw, 400px)',
                margin: '0 auto',
                boxShadow: '0 -12px 60px rgba(37,99,235,0.18), 0 -2px 0 rgba(255,255,255,0.06), 0 30px 60px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              {isMounted && <DeviceMockups />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
