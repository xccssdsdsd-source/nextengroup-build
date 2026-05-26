'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const DeviceMockups = dynamic(() => import('./DeviceMockups'), { ssr: false })

const easeOut = 'easeOut'

const words = [
  { text: 'ROZWIĄZANIA IT', cls: 'text-[#0A0A0F]' },
  { text: 'DOPASOWANE DO', cls: 'bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent' },
  { text: 'TWOJEJ FIRMY', cls: 'bg-gradient-to-r from-[#1e40af] to-[#2563EB] bg-clip-text text-transparent' },
]

const services = [
  { title: 'Strony WWW', path: '/strony-internetowe-dla-firm' },
  { title: 'Automatyzacje AI', path: '/seo-dla-firm' },
  { title: 'Agenci AI', path: '/audyt-seo' },
]

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
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

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

        <div className="relative z-10 px-6 md:px-12">
          <div className="w-full text-center">
            <h1
              className="font-sans uppercase leading-[0.95] tracking-[-0.04em] mx-auto"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: isMobile ? 'clamp(1.2rem, 5vw, 1.8rem)' : 'clamp(1.4rem, 3.5vw, 2.8rem)', maxWidth: '95vw' }}
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
              className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base leading-[1.7] text-[#374151]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: easeOut }}
            >
              Getbuild to zespół doświadczonych specjalistów, którzy projektują i wdrażają kompleksowe rozwiązania IT skrojone dokładnie pod potrzeby Twojego biznesu. Tworzymy nowoczesne strony internetowe, automatyzujemy czasochłonne procesy biznesowe oraz wdrażamy inteligentnych agentów AI, którzy realnie odciążają Twój zespół i zwiększają efektywność operacyjną.
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

            {!isMobile && (
              <motion.div
                className="mt-8 sm:mt-10 hidden md:flex items-center justify-center border-t border-gray-100 pt-6 sm:pt-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
              >
                {services.map(({ title }, i) => (
                  <div key={title} className="flex items-center gap-6">
                    <div>
                      <div className="text-xl font-black tracking-[-0.03em] text-[#0A0A0F] leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>{title}</div>
                    </div>
                    {i < services.length - 1 && <div className="h-10 w-px bg-gray-100" />}
                  </div>
                ))}
              </motion.div>
            )}
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

      {isMobile && (
        <section className="bg-white px-6 py-8 border-t border-gray-100">
          <div className="flex flex-col gap-4">
            {services.map(({ title, path }) => (
              <motion.a
                key={title}
                href={path}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="block p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <div className="text-lg font-black tracking-[-0.03em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>{title}</div>
              </motion.a>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
