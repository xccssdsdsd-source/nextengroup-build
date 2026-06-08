'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const easeOut = 'easeOut'
const carouselWords = ['strony internetowe', 'automatyzację AI', 'agentów AI']

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
      className="relative overflow-hidden pt-36 sm:pt-40 md:pt-48 bg-white"
    >
      <BackgroundPaths />

      <div className="relative z-10 px-5 sm:px-6 md:px-12 mx-auto max-w-7xl">

        <div className="w-full text-center">
          <h1
            className="mx-auto mb-5 sm:mb-6"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(20px, 4.5vw, 42px)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              overflowWrap: 'break-word',
              color: '#111827'
            }}
          >
            <span className="block text-balance">Strony, które pozyskują klientów.</span>
            <span className="block text-balance">Automatyzacje, które obsługują ich za Ciebie.</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-5 sm:mb-6">
            <p className="text-sm sm:text-base leading-relaxed text-[#6B7280]">
              Budujemy Twój biznes przez{' '}
              {!isMounted ? (
                <span style={{ color: '#2563EB', fontWeight: 600 }}>
                  {carouselWords[0]}
                </span>
              ) : (
                <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <AnimatePresence mode="wait">
                    <m.span
                      key={titleNumber}
                      style={{ color: '#2563EB', fontWeight: 600, display: 'inline-block' }}
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

          <div
            className="hero-fade-in mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-4 sm:px-0"
            style={{ animationDelay: '110ms' }}
          >
            <a
              href="#kontakt"
              onClick={(e) => handleAnchorClick(e, '#kontakt')}
              className="btn btn-primary inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold"
            >
              Kontakt
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

        {/* Device mockup — perspective wrapper + CSS tilt-in animation */}
        <div
          className="hero-fade-in mt-12 sm:mt-14 flex justify-center pb-0"
          style={{ perspective: '1400px', animationDelay: '170ms' }}
        >
          <div className="hero-device-tilt w-full">
            <div
              style={{
                borderRadius: '20px',
                backgroundColor: '#F3F4F6',
                maxWidth: '1100px',
                maxHeight: 'clamp(180px, 40vw, 400px)',
                margin: '0 auto',
                boxShadow: '0 0 80px rgba(37,99,235,0.1), 0 40px 80px rgba(0,0,0,0.1)',
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
