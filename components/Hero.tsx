'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import FlowNetwork from './FlowNetwork'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stats = [
  { value: '24h', label: 'na pierwszą wizualizację' },
  { value: '+', label: 'mocniejsza prezentacja oferty' },
  { value: 'AI', label: 'obsługa leadów bez chaosu' },
] as const

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(26,111,255,0.24),transparent_24%),radial-gradient(circle_at_15%_22%,rgba(0,212,255,0.1),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-0 grain-drift opacity-30" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="section-kicker">
              Strony WWW + automatyzacje AI
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 max-w-[11ch] font-sans text-[clamp(54px,9vw,126px)] uppercase leading-[0.88] tracking-[-0.06em] text-white"
            style={{ fontFamily: 'var(--font-barlow)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease }}
          >
            Strony,
            <br />
            <span className="gradient-text">które</span>
            <br />
            sprzedają.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-8 text-[#9db4d2] sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.16, ease }}
          >
            Projektujemy nowoczesne strony i procesy AI, które porządkują zapytania,
            budują zaufanie i pomagają szybciej zamieniać ruch w klientów.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.24, ease }}
          >
            <a href="#kontakt" className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 text-sm">
              Darmowa wycena
              <ArrowRight size={16} />
            </a>
            <a href="#portfolio" className="btn-ghost inline-flex items-center justify-center px-7 py-4 text-sm">
              Zobacz realizacje
            </a>
          </motion.div>

          <motion.div
            className="mt-9 grid gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.32, ease }}
          >
            {stats.map(stat => (
              <div
                key={stat.label}
                className="rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold leading-none text-[#7deeff]" style={{ fontFamily: 'var(--font-barlow)' }}>
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.16em] text-[#7f98b8]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
          className="min-w-0"
        >
          <div className="mx-auto h-[640px] w-full max-w-[860px] sm:h-[700px] lg:h-[760px]">
            <FlowNetwork />
          </div>
        </motion.div>
      </div>

      <a
        href="#uslugi"
        className="mx-auto mt-10 hidden w-fit flex-col items-center gap-1 text-[#6883a7] transition-colors hover:text-[#8fefff] lg:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.24em]">Przewiń</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </a>
    </section>
  )
}
