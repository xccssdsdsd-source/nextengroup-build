'use client'

import type { MouseEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import DeviceMockups from './DeviceMockups'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const words = [
  { text: 'Strony,', cls: 'text-[#0A0A0A]' },
  { text: 'które', cls: 'gradient-text' },
  { text: 'sprzedają.', cls: 'text-[#0A0A0A]' },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 700], [0, -90])
  const y2 = useTransform(scrollY, [0, 700], [0, -45])
  const y3 = useTransform(scrollY, [0, 700], [0, 60])

  const handlePreviewClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      suppressHydrationWarning
      className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-8 sm:pt-40 lg:pb-28 bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 65% 0%, rgba(0,85,255,0.07), transparent 70%)',
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
        <div className="absolute right-[20%] top-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#0055FF]/20 bg-[#0055FF]/[0.06] px-4 py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0055FF]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0055FF]">Strony WWW & Automatyzacje</span>
          </motion.div>

          <h1
            className="font-sans text-[clamp(24px,7vw,128px)] uppercase leading-[0.86] tracking-[-0.06em]"
            style={{ fontFamily: 'var(--font-barlow)' }}
          >
            {words.map(({ text, cls }, i) => (
              <motion.span
                key={text}
                className={`block ${cls}`}
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.13, ease }}
              >
                {text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-[1.8] text-[#6B7280]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44, ease }}
          >
            Projektujemy rozwiązania, które łączą procesy dla firm usługowych.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.56, ease }}
          >
            <motion.a
              href="#kontakt"
              onClick={handlePreviewClick}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex w-full items-center justify-center px-7 py-4 text-sm sm:w-auto"
            >
              Darmowa wizualizacja
            </motion.a>
            <motion.a
              href="#portfolio"
              whileTap={{ scale: 0.96 }}
              className="btn-ghost inline-flex w-full items-center justify-center px-7 py-4 text-sm sm:w-auto"
            >
              Zobacz realizacje
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center gap-6 border-t border-neutral-100 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
          >
            {[['24h', 'Pierwsza wizualizacja'], ['100%', 'Mobile-first'], ['AI', 'Automatyzacje']].map(([val, label], i) => (
              <div key={val} className="flex items-center gap-6">
                <div>
                  <div className="text-4xl font-black tracking-[-0.04em] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>{val}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-[#6B7280]">{label}</div>
                </div>
                {i < 2 && <div className="h-10 w-px bg-gray-200" />}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.22, ease }}
          className="hidden lg:block min-w-0 relative"
        >
          <div className="absolute inset-0 rounded-full w-[500px] h-[500px] bg-blue-500/10 blur-[100px]" />
          <div className="mx-auto h-[520px] w-full max-w-[900px] sm:h-[600px] lg:h-[680px] relative z-10" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <DeviceMockups />
          </div>
        </motion.div>
      </div>

      <a href="#uslugi" className="mx-auto mt-12 hidden w-fit flex-col items-center gap-1.5 text-[#9CA3AF] transition-[color,opacity] duration-300 hover:text-[#0055FF] lg:flex">
        <span className="text-[10px] uppercase tracking-[0.28em]">Przewiń</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </a>
    </section>
  )
}
