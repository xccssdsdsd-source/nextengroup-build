'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const DeviceMockups = dynamic(() => import('./DeviceMockups'), { ssr: false })

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const words = [
  { text: 'ROZWIĄZANIA IT', cls: 'text-[#0A0A0F]' },
  { text: 'DOPASOWANE DO', cls: 'bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent' },
  { text: 'TWOJEJ FIRMY', cls: 'bg-gradient-to-r from-[#1e40af] to-[#2563EB] bg-clip-text text-transparent' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)
  const { scrollYProgress } = useScroll({ target: sectionRef })

  useEffect(() => {
    const check = window.matchMedia('(min-width: 768px)')
    setIsMobile(!check.matches)
  }, [])

  const cardY = useTransform(scrollYProgress, [0, 0.5], ['80vh', '40vh'])
  const cardYMobile = useTransform(scrollYProgress, [0, 0.35], ['80vh', '55vh'])
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.6])

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className="relative bg-white"
      style={{ minHeight: '130vh', overflow: 'hidden' }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.6), transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 72% 50%, rgba(37,99,235,0.08), transparent)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        style={{ opacity: titleOpacity, overflowX: 'hidden' }}
        className="sticky top-0 z-10 h-screen flex items-center justify-start px-6 md:px-12"
      >
        <div className="w-full text-left">
          <h1
            className="font-sans uppercase leading-[0.95] tracking-[-0.04em] lg:hidden"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: 'clamp(1.6rem, 3.8vw, 3.5rem)', maxWidth: '700px', margin: '0 auto' }}
          >
            {words.map(({ text, cls }, i) => (
              <motion.span
                key={text}
                className={`block ${cls}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.12, ease }}
              >
                {text}
              </motion.span>
            ))}
          </h1>
          <h1
            className="font-sans uppercase leading-[0.95] tracking-[-0.04em] hidden lg:block"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: 'clamp(1.6rem, 3.8vw, 3.5rem)', maxWidth: '700px', margin: '0 auto' }}
          >
            {words.map(({ text, cls }, i) => (
              <motion.span
                key={text}
                className={`block ${cls}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.12, ease }}
              >
                {text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 sm:mt-8 max-w-md text-base leading-[1.7] text-[#374151]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease }}
          >
            Getbuild projektuje i wdraża rozwiązania IT skrojone pod Twój biznes. Tworzymy strony WWW, automatyzujemy procesy i wdrażamy agentów AI, którzy realnie odciążają zespół.
          </motion.p>

          <motion.div
            className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease }}
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
            className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 sm:pt-8 sm:flex sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.72, ease }}
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
        </div>
      </motion.div>

      <motion.div
        style={{ y: isMobile ? cardYMobile : cardY }}
        className={`${isMobile ? 'absolute' : 'sticky'} bottom-0 left-0 right-0 z-20`}
      >
        <div
          className="w-[90%] max-w-[1000px] mx-auto"
          style={{
            borderRadius: '20px 20px 0 0',
            backgroundColor: '#0d1117',
            height: isMobile ? '50vh' : '55vh',
            maxHeight: '55vh',
            boxShadow: '0 -8px 60px rgba(37,99,235,0.15), 0 -2px 0 rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          {!isMobile && <DeviceMockups />}
        </div>
      </motion.div>
    </section>
  )
}
