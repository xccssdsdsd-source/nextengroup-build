'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'))

const easeOut = 'easeOut'
const titles = ['strony internetowe', 'agentów AI', 'automatyzacje AI']

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [titleNumber, setTitleNumber] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const deviceRotate = useTransform(scrollYProgress, [0, 0.5], [28, 0])
  const deviceScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1])
  const deviceY = useTransform(scrollYProgress, [0, 0.4], [200, 0])

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

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const el = document.getElementById('kontakt')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handlePortfolioClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const el = document.getElementById('portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className="relative bg-white overflow-hidden pt-24 sm:pt-28 md:pt-24 lg:pt-28 pb-2 sm:pb-8 md:pb-12 lg:pb-16"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 72% 50%, rgba(37,99,235,0.05), transparent)',
        }}
      />
      <BackgroundPaths />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 mx-auto max-w-7xl">
        <div className="w-full text-center">
          <h1
            className="font-sans tracking-[-0.03em] mx-auto text-[#0A0A0F] mb-4 sm:mb-5"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: 'clamp(1.75rem, 6.5vw, 3rem)', lineHeight: '1.2' }}
          >
            <div className="font-semibold mb-4 sm:mb-6 leading-tight" style={{ color: '#0A0A0F', fontSize: 'clamp(2rem, 5.5vw, 2.8rem)' }}>
              Budujemy Twój biznes przez
            </div>
            <motion.span
              className="block bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut }}
            >
              {titles[titleNumber]}
            </motion.span>
          </h1>

          <motion.p
            className="mt-2 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-[#374151] px-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: easeOut }}
          >
            Getbuild to rozwiązania IT dokładnie dopasowane do Twojego biznesu. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe oraz wdrażamy inteligentnych agentów AI, którzy realnie odciążają Twój zespół i zwiększają efektywność operacyjną.
          </motion.p>

          <motion.div
            className="mt-4 sm:mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center sm:gap-3 px-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: easeOut }}
          >
            <a
              href="#kontakt"
              onClick={handleContactClick}
              className="btn btn-primary inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm w-full sm:w-auto"
              style={{ cursor: 'pointer' }}
            >
              Umów 15 min rozmowę
            </a>
            <a
              href="#portfolio"
              onClick={handlePortfolioClick}
              className="btn btn-ghost inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 text-sm w-full sm:w-auto"
              style={{ cursor: 'pointer' }}
            >
              Zobacz realizacje
            </a>
          </motion.div>

        </div>

        {!isMobile && (
          <motion.div
            className="mt-4 flex justify-center"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              ref={deviceRef}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.72, ease: easeOut }}
              style={{ rotateX: deviceRotate, scale: deviceScale, y: deviceY }}
            >
              <div
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#0d1117',
                  height: 'auto',
                  maxWidth: '1100px',
                  maxHeight: '380px',
                  boxShadow: '0 -8px 60px rgba(37,99,235,0.15), 0 -2px 0 rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  willChange: 'transform',
                }}
              >
                {isMounted && <DeviceMockups />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
