'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const easeOut = 'easeOut'
const titles = ['strony internetowe', 'agentów AI', 'automatyzacje AI']

const stats = [
  { value: '40+', label: 'projektów' },
  { value: '5 ★', label: 'opinie Google' },
  { value: '100%', label: 'zadowolenia' },
]

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [titleNumber, setTitleNumber] = useState(0)
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleNumber(prev => (prev + 1) % titles.length)
    }, 2500)
    return () => clearInterval(timer)
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

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className="relative bg-white overflow-x-hidden pt-24 sm:pt-28 md:pt-32"
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

        {/* Availability badge */}
        <motion.div
          className="flex justify-center mb-5 sm:mb-7"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600"
            style={{ fontFamily: 'var(--font-syne)', letterSpacing: '0.04em' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Przyjmujemy nowe projekty na 2025
          </div>
        </motion.div>

        {/* Headline */}
        <div className="w-full text-center">
          <h1
            className="mx-auto text-[#0A0A0F] mb-5 sm:mb-6"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 6.5vw, 3.5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
            }}
          >
            <span className="block mb-2 sm:mb-3">Budujemy Twój biznes przez</span>
            <span className="relative block overflow-hidden" style={{ minHeight: 'clamp(3rem, 9vw, 5rem)' }}>
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
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="mt-0 sm:mt-2 max-w-lg mx-auto text-sm sm:text-base leading-relaxed text-[#6B7280] px-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
          >
            Nowoczesne strony, automatyzacje procesów i agenci AI — rozwiązania IT skrojone pod Twój biznes.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 px-4 sm:px-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: easeOut }}
          >
            <a
              href="#kontakt"
              onClick={(e) => handleAnchorClick(e, '#kontakt')}
              className="btn btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto"
            >
              Umów 15 min rozmowę
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleAnchorClick(e, '#portfolio')}
              className="btn btn-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto"
            >
              Zobacz realizacje
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            className="mt-10 sm:mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.58, ease: easeOut }}
          >
            <div className="inline-flex items-center divide-x divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white/80 backdrop-blur-sm px-2 py-2 shadow-sm">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center px-5 sm:px-7 py-1">
                  <span
                    className="text-base sm:text-lg font-bold text-[#0A0A0F]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#9CA3AF] mt-0.5 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Device mockup — desktop 3D, mobile flat */}
        <motion.div
          className="mt-12 sm:mt-14 flex justify-center pb-0"
          style={!isMobile ? { perspective: '1400px' } : {}}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: easeOut }}
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
