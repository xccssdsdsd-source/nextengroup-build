'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const DeviceMockups = dynamic(() => import('./DeviceMockups'), { ssr: false })

const easeOut = 'easeOut'

const words = [
  { text: 'ROZWIĄZANIA IT', cls: 'text-[#0A0A0F]' },
  { text: 'DOPASOWANE DO', cls: 'bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent' },
  { text: 'TWOJEJ FIRMY', cls: 'bg-gradient-to-r from-[#1e40af] to-[#2563EB] bg-clip-text text-transparent' },
]

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const deviceRotate = useTransform(scrollYProgress, [0, 0.6], [isMobile ? 12 : 25, 0])
  const deviceScale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1])
  const statsY = useTransform(scrollYProgress, [0.3, 0.7], [80, 0])
  const statsOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const descOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.4])
  const buttonsOpacity = useTransform(scrollYProgress, [0.15, 0.35], [1, 0.4])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.15])
  const headingScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.85])

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden"
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

      <div className="relative z-10 px-6 md:px-12">
        <motion.div
          ref={contentRef}
          className="w-full text-center"
          style={{ opacity: headingOpacity, scale: headingScale }}
        >
          <h1
            className="font-sans uppercase leading-[0.95] tracking-[-0.04em] lg:hidden mx-auto"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', maxWidth: '95vw' }}
          >
            {words.map(({ text, cls }, i) => (
              <div key={text} className="overflow-hidden">
                <motion.span
                  className={`block ${cls}`}
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: i * 0.15, ease: easeOut }}
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </h1>
          <h1
            className="font-sans uppercase leading-[0.95] tracking-[-0.04em] hidden lg:block mx-auto"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', maxWidth: '95vw' }}
          >
            {words.map(({ text, cls }, i) => (
              <div key={text} className="overflow-hidden">
                <motion.span
                  className={`block ${cls}`}
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: i * 0.15, ease: easeOut }}
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p
            className="mt-6 sm:mt-8 max-w-md mx-auto text-base leading-[1.7] text-[#374151]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: easeOut }}
            style={{ opacity: descOpacity }}
          >
            Getbuild projektuje i wdraża rozwiązania IT skrojone pod Twój biznes. Tworzymy strony WWW, automatyzujemy procesy i wdrażamy agentów AI, którzy realnie odciążają zespół.
          </motion.p>

          <motion.div
            className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: easeOut }}
            style={{ opacity: buttonsOpacity }}
          >
            <motion.a
              href="#kontakt"
              onClick={handleContactClick}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center justify-center px-7 py-4 text-sm w-full sm:w-auto"
            >
              Umów 15 min rozmowę
            </motion.a>
            <motion.a
              href="/realizacje"
              whileTap={{ scale: 0.96 }}
              className="btn-ghost inline-flex items-center justify-center px-7 py-4 text-sm w-full sm:w-auto"
            >
              Zobacz realizacje
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 sm:pt-8 sm:flex sm:items-center sm:justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
            style={{ y: statsY, opacity: statsOpacity }}
          >
            {[['Strony WWW', ''], ['Automatyzacje AI', ''], ['Agenci AI', '']].map(([val, label], i) => (
              <div key={val} className="flex items-center gap-4 sm:gap-6">
                <div>
                  <div className="text-[13px] sm:text-xl font-black tracking-[-0.03em] text-[#0A0A0F] leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>{val}</div>
                  {label && <div className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">{label}</div>}
                </div>
                {i < 2 && <div className="hidden sm:block h-10 w-px bg-gray-100" />}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16 flex justify-center"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            ref={deviceRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.72, ease: easeOut }}
            style={{ rotateX: deviceRotate, scale: deviceScale }}
          >
          <div
            className="w-[90%]"
            style={{
              borderRadius: '20px',
              backgroundColor: '#0d1117',
              height: 'auto',
              maxWidth: isMobile ? '100%' : '1000px',
              maxHeight: isMobile ? 'clamp(250px, 50vh, 400px)' : 'clamp(400px, 70vh, 900px)',
              boxShadow: '0 -8px 60px rgba(37,99,235,0.15), 0 -2px 0 rgba(255,255,255,0.06)',
              overflow: 'hidden',
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
