'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const easeOut = 'easeOut'

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const deviceRotate = useTransform(scrollYProgress, [0, 0.5], [18, 0])
  const deviceScale = useTransform(scrollYProgress, [0, 0.5], [1.04, 1])

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToSection(href.slice(1))
  }

  // Shared button geometry — consistent rounding + generous vertical padding
  const ctaBase = { borderRadius: '12px', padding: '1rem 2rem', boxShadow: 'none' } as const

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      // Padding-top clears the sticky header so the first heading is fully visible
      className="relative bg-white overflow-x-hidden pt-28 sm:pt-32 md:pt-36"
    >
      <div className="relative z-10 px-5 sm:px-6 md:px-12 mx-auto max-w-7xl">

        {/* Headline */}
        <div className="w-full text-center">
          <h1
            className="mx-auto max-w-3xl text-balance"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 600,
              fontSize: 'clamp(2rem, 5.5vw, 3.25rem)',
              lineHeight: '1.18',
              letterSpacing: '-0.015em',
              color: '#1f2937',
            }}
          >
            Budujemy Twój biznes przez{' '}
            <span style={{ color: '#2563EB' }}>strony internetowe</span>
          </h1>

          {/* Subtitle — no dash, muted, capped to ~2 lines on desktop */}
          <motion.p
            className="mx-auto mt-7 sm:mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#6B7280]"
            initial={isMobile || !isMounted ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          >
            Nowoczesne strony, automatyzacje procesów i agencja AI. Rozwiązania IT skrojone pod Twój biznes.
          </motion.p>

          {/* CTA — one primary (full blue) + one secondary (outline), matching shape */}
          <motion.div
            className="mt-9 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-4 sm:px-0"
            initial={isMobile || !isMounted ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
          >
            <a
              href="#kontakt"
              onClick={(e) => handleAnchorClick(e, '#kontakt')}
              className="btn btn-primary inline-flex items-center justify-center text-sm w-full sm:w-auto"
              style={{ ...ctaBase, background: '#2563EB' }}
            >
              Umów 15 min rozmowę
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleAnchorClick(e, '#portfolio')}
              className="btn btn-ghost inline-flex items-center justify-center text-sm w-full sm:w-auto"
              style={ctaBase}
            >
              Zobacz realizacje
            </a>
          </motion.div>
        </div>

        {/* Device mockup — desktop 3D, mobile flat */}
        <motion.div
          className="mt-14 sm:mt-16 flex justify-center pb-0"
          style={!isMobile ? { perspective: '1400px' } : {}}
          initial={isMobile || !isMounted ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
        >
          <motion.div
            style={!isMobile ? { rotateX: deviceRotate, scale: deviceScale } : {}}
            className="w-full"
          >
            <div
              style={{
                borderRadius: isMobile ? '14px' : '20px',
                backgroundColor: '#0d1117',
                maxWidth: isMobile ? '100%' : '1100px',
                maxHeight: isMobile ? '200px' : '400px',
                margin: '0 auto',
                boxShadow: '0 24px 48px rgba(0,0,0,0.10)',
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              {isMounted && <DeviceMockups />}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
