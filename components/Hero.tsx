'use client'

import type { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

const DeviceMockups = dynamic(() => import('./DeviceMockups'), { ssr: false })

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const words = [
  { text: 'Rozwiązania IT', cls: 'text-[#0A0A0A]' },
  { text: 'dopasowane do', cls: 'gradient-text' },
  { text: 'Ciebie', cls: 'text-[#0A0A0A]' },
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
          background: 'radial-gradient(ellipse 60% 50% at 0% 0%, rgba(240,244,255,0.25), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[20%] top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute left-[-10%] top-[20%] h-[280px] w-[280px] rounded-full bg-sky-200/20 blur-[90px]" />
        <div className="absolute bottom-[-8%] right-[8%] h-[220px] w-[220px] rounded-full bg-blue-100/30 blur-[80px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0055FF]/20 bg-[#0055FF]/[0.06] px-3 py-1.5 sm:px-4 sm:py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055FF]" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">Strony WWW i automatyzacje</span>
          </motion.div>

          <h1
            className="font-sans text-[clamp(44px,11.5vw,90px)] uppercase leading-[0.88] tracking-[-0.05em] sm:leading-[0.86] sm:tracking-[-0.06em]"
            style={{ fontFamily: 'var(--font-barlow)' }}
          >
            {words.map(({ text, cls }, i) => (
              <motion.span
                key={text}
                className={`block ${cls}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              >
                {text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-5 sm:mt-7 max-w-xl text-[15px] sm:text-base leading-[1.75] text-[#6B7280]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Getbuild projektuje i wdraża rozwiązania IT skrojone pod Twój biznes. Tworzymy strony WWW, automatyzujemy procesy i wdrażamy agentów AI, którzy realnie odciążają zespół.
          </motion.p>

          <motion.div
            className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <motion.a
              href="#kontakt"
              onClick={handleContactClick}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex w-full items-center justify-center px-7 py-4 text-sm sm:w-auto"
            >
              Zarezerwuj 15 min rozmowę
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
            className="mt-4 text-[13px] text-[#9CA3AF]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            Realizacja w 24 do 72h. Wdrożenie pod klucz. Wsparcie po starcie.
          </motion.p>

          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-6 sm:pt-8 sm:flex sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
          >
            {[['Strony WWW', ''], ['Automatyzacje AI', ''], ['Agenci AI', '']].map(([val, label], i) => (
              <div key={val} className="flex items-center gap-4 sm:gap-6">
                <div>
                  <div className="text-[13px] sm:text-xl font-black tracking-[-0.03em] text-[#0A0A0A] leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>{val}</div>
                  {label && <div className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-[#6B7280]">{label}</div>}
                </div>
                {i < 2 && <div className="hidden sm:block h-10 w-px bg-gray-200" />}
              </div>
            ))}
          </motion.div>
        </div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.22, ease }}
            className="hidden lg:block min-w-0 relative"
          >
            <div className="absolute inset-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
            <div className="mx-auto h-[520px] w-full max-w-[900px] sm:h-[600px] lg:h-[680px] relative z-10" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <DeviceMockups />
            </div>
          </motion.div>
        )}
      </div>

      <a href="#proces" onClick={handleProcessClick} className="mx-auto mt-12 hidden w-fit flex-col items-center gap-1.5 text-[#9CA3AF] transition-[color,opacity] duration-300 hover:text-[#0055FF] lg:flex">
        <span className="text-[10px] uppercase tracking-[0.28em]">Przewiń</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </a>
    </section>
  )
}
