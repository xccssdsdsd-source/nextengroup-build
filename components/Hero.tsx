'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

const DeviceMockups = dynamic(() => import('./DeviceMockups'), { ssr: false })

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const words = [
  { text: 'Rozwiązania IT', cls: 'text-[#0A0A0F]' },
  { text: 'dla Ciebie', cls: 'gradient-text' },
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

  const handleProcessClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('proces')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      suppressHydrationWarning
      className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40 bg-white"
    >
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

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">

          <h1
            className="font-sans text-[clamp(36px,9vw,64px)] uppercase leading-[1.08] tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: '800' }}
          >
            {words.map(({ text, cls }, i) => (
              <motion.span
                key={text}
                className={`block ${cls}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
              >
                {text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-5 sm:mt-7 max-w-xl text-[15px] sm:text-base leading-[1.7] text-[#6b7280]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
          >
            Getbuild projektuje i wdraża rozwiązania IT skrojone pod Twój biznes. Tworzymy strony WWW, automatyzujemy procesy i wdrażamy agentów AI, którzy realnie odciążają zespół.
          </motion.p>

          <motion.div
            className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease }}
          >
            <motion.a
              href="#kontakt"
              onClick={handleContactClick}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex w-full items-center justify-center px-7 py-4 text-sm sm:w-auto"
            >
              Umów 15 min rozmowę
            </motion.a>
            <motion.a
              href="/realizacje"
              whileTap={{ scale: 0.96 }}
              className="btn-ghost inline-flex w-full items-center justify-center px-7 py-4 text-sm sm:w-auto"
            >
              Zobacz realizacje
            </motion.a>
          </motion.div>

          <motion.p
            className="mt-4 text-[13px] text-[#6b7280]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.48, ease }}
          >
            Realizacja w 24 do 72h. Wdrożenie pod klucz. Wsparcie po starcie.
          </motion.p>

          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 sm:pt-8 sm:flex sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.60, ease }}
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

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="hidden lg:block min-w-0 relative"
          >
            <div className="absolute -inset-20 rounded-full bg-gradient-to-b from-[#2563eb0d] to-transparent blur-[80px]" />
            <div className="mx-auto h-[520px] w-full max-w-[900px] sm:h-[600px] lg:h-[680px] relative z-10" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(37,99,235,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <DeviceMockups />
            </div>
          </motion.div>
        )}
      </div>

      <a href="#proces" onClick={handleProcessClick} className="mx-auto mt-12 hidden w-fit flex-col items-center gap-1.5 text-[#6b7280] transition-[color,opacity] duration-300 hover:text-[#2563EB] lg:flex">
        <span className="text-[10px] uppercase tracking-[0.28em]">Przewiń</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </a>
    </section>
  )
}
