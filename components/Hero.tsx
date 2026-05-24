'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

const DeviceMockups = dynamic(() => import('./DeviceMockups'), { ssr: false })

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const words = [
  { text: 'ROZWIĄZANIA IT', cls: 'text-[#0A0A0F]' },
  { text: 'DOPASOWANE DO', cls: 'text-[#2563EB]' },
  { text: 'CIEBIE', cls: 'text-[#2563EB]' },
]

export default function Hero() {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const check = window.matchMedia('(min-width: 1024px)')
    setIsMobile(!check.matches)
  }, [])

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      suppressHydrationWarning
      className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40 bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.6), transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 72% 50%, rgba(37,99,235,0.08), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <ContainerScroll
        titleComponent={
          <div className="max-w-xl w-full text-left pb-8" style={{ textAlign: 'left' }}>

            <h1
              className="font-sans uppercase leading-[0.95] tracking-[-0.04em] lg:hidden"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: 'clamp(1.8rem, 8vw, 2.6rem)' }}
            >
              {words.map(({ text, cls }, i) => (
                <motion.span
                  key={text}
                  className={`block ${cls} ${i >= 1 ? 'whitespace-nowrap' : ''}`}
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
              style={{ fontFamily: 'var(--font-syne)', fontWeight: '900', fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)' }}
            >
              {words.map(({ text, cls }, i) => (
                <motion.span
                  key={text}
                  className={`block ${cls} ${i >= 1 ? 'whitespace-nowrap' : ''}`}
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

            <motion.p
              className="mt-4 text-[13px] text-[#6b7280]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.60, ease }}
            >
              Realizacja w 24 do 72h. Wdrożenie pod klucz. Wsparcie po starcie.
            </motion.p>

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
        }
      >
        {!isMobile && <DeviceMockups />}
      </ContainerScroll>
    </section>
  )
}
