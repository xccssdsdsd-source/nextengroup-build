'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import BackgroundPaths from './BackgroundPaths'

const DeviceMockups = dynamic(() => import('./DeviceMockups'), { ssr: false })

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
    <>
      <section
        ref={sectionRef}
        suppressHydrationWarning
        className={`relative bg-white overflow-hidden ${isMobile ? 'pt-20 pb-8' : 'py-12 md:py-16 lg:py-20 min-h-screen'}`}
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

        <div className="relative z-10 px-6 md:px-12">
          <div className="w-full text-center">
            <h1
              className="font-sans leading-[0.95] tracking-[-0.04em] mx-auto mt-12 text-[#0A0A0F]"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.8rem)' : 'clamp(1.4rem, 3.5vw, 2.8rem)', maxWidth: '95vw' }}
            >
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0, ease: easeOut }}
                >
                  Budujemy Twój biznes przez
                </motion.span>
              </div>
              <div className="relative h-[1.2em] overflow-hidden mt-2">
                {titles.map((title, i) => (
                  <motion.span
                    key={i}
                    className="absolute block bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent w-full"
                    initial={{ y: 150, opacity: 0 }}
                    animate={{
                      y: i === titleNumber ? 0 : i < titleNumber ? -150 : 150,
                      opacity: i === titleNumber ? 1 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.p
              className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base leading-[1.7] text-[#374151]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: easeOut }}
            >
              Getbuild to rozwiązania IT dokładnie dopasowane do Twojego biznesu. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe oraz wdrażamy inteligentnych agentów AI, którzy realnie odciążają Twój zespół i zwiększają efektywność operacyjną.
            </motion.p>

            <motion.div
              className="mt-6 sm:mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: easeOut }}
            >
              <motion.a
                href="#kontakt"
                onClick={handleContactClick}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary inline-flex items-center justify-center px-7 py-4 text-sm w-full sm:w-auto"
              >
                Umów 15 min rozmowę
              </motion.a>
              <motion.a
                href="#portfolio"
                onClick={handlePortfolioClick}
                whileTap={{ scale: 0.96 }}
                className="btn btn-ghost inline-flex items-center justify-center px-7 py-4 text-sm w-full sm:w-auto"
              >
                Zobacz realizacje
              </motion.a>
            </motion.div>

          </div>

          {!isMobile && (
            <motion.div
              className="mt-8 lg:mt-12 flex justify-center"
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
                    maxWidth: '1200px',
                    maxHeight: 'clamp(400px, 75vh, 950px)',
                    boxShadow: '0 -8px 60px rgba(37,99,235,0.15), 0 -2px 0 rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}
                >
                  {isMounted && <DeviceMockups />}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

    </>
  )
}
