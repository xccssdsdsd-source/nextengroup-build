'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const easeOut = 'easeOut'
const titles = ['strony internetowe', 'agentów AI', 'automatyzacje AI']

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [titleNumber, setTitleNumber] = useState(0)
  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const timer = setInterval(() => {
      setTitleNumber(prev => (prev + 1) % titles.length)
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
      {/* Background gradients */}
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

        {/* Headline */}
        <div className="w-full text-center">
          <h1
            className="mx-auto text-[#0A0A0F] mb-5 sm:mb-6"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(26px, 6.5vw, 56px)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              overflowWrap: 'break-word',
            }}
          >
            <span className="block mb-2 sm:mb-3 text-balance">Budujemy Twój biznes przez</span>
            <span className="relative block" style={{ overflow: 'hidden', minHeight: 'clamp(40px, 10vw, 86px)', contain: 'paint' }}>
              {!isMounted ? (
                <span className="block bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent">
                  {titles[0]}
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    className="block bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -22 }}
                    transition={{ duration: 0.38, ease: easeOut }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="mt-0 sm:mt-2 max-w-lg mx-auto text-sm sm:text-base leading-relaxed text-[#6B7280] px-2"
            initial={isMobile || !isMounted ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
          >
            Nowoczesne strony, automatyzacje procesów i agenci AI — rozwiązania IT skrojone pod Twój biznes.
          </motion.p>

          {/* Value promise */}
          <motion.p
            className="mt-4 sm:mt-5 max-w-lg mx-auto text-sm text-[#2563EB] font-medium px-2"
            initial={isMobile || !isMounted ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: easeOut }}
          >
            Zobacz projekt przed wdrożeniem, zapłać dopiero kiedy działa
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-4 sm:px-0"
            initial={isMobile || !isMounted ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: easeOut }}
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
              href="#opinie"
              onClick={(e) => handleAnchorClick(e, '#opinie')}
              className="btn btn-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto"
            >
              Opinie klientów
            </a>
          </motion.div>
        </div>

        {/* Device mockup — desktop 3D, mobile flat */}
        <motion.div
          className="mt-12 sm:mt-14 flex justify-center pb-0"
          style={!isMobile ? { perspective: '1400px' } : {}}
          initial={isMobile || !isMounted ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: easeOut }}
        >
          <motion.div
            initial={isMobile || !isMounted ? false : { rotateX: 18, scale: 1.04, opacity: 0 }}
            animate={{ rotateX: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: easeOut }}
            className="w-full"
          >
            <div
              style={{
                borderRadius: isMobile ? '14px' : '20px',
                backgroundColor: '#0d1117',
                maxWidth: isMobile ? '100%' : '1100px',
                maxHeight: isMobile ? '200px' : '400px',
                margin: '0 auto',
                boxShadow: '0 -12px 60px rgba(37,99,235,0.18), 0 -2px 0 rgba(255,255,255,0.06), 0 30px 60px rgba(0,0,0,0.08)',
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
