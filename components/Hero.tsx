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
      className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-8 sm:pt-40 lg:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 50%), linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 55%)',
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
        <motion.div style={{ y: y1 }} className="aurora-1 absolute -right-[8%] -top-[10%] h-[700px] w-[700px] rounded-full bg-[rgba(14,165,233,0.22)] blur-[100px]" />
        <motion.div style={{ y: y2 }} className="aurora-2 absolute left-[5%] top-[15%] h-[500px] w-[500px] rounded-full bg-[rgba(99,102,241,0.14)] blur-[90px]" />
        <motion.div style={{ y: y3 }} className="aurora-3 absolute -bottom-[20%] left-[35%] h-[600px] w-[600px] rounded-full bg-[rgba(14,165,233,0.1)] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/[0.06] px-4 py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0EA5E9]">Strony WWW & Automatyzacje</span>
          </motion.div>

          <h1
            className="max-w-[9ch] font-sans text-[clamp(58px,9vw,128px)] uppercase leading-[0.86] tracking-[-0.06em]"
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
            {[['24h', 'Pierwsza wizualizacja'], ['100%', 'Mobile-first'], ['AI', 'Automatyzacje']].map(([val, label]) => (
              <div key={val}>
                <div className="text-xl font-bold tracking-[-0.04em] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>{val}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-[#6B7280]">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.22, ease }}
          className="hidden lg:block min-w-0"
          style={{ filter: 'drop-shadow(0 32px 64px rgba(14,165,233,0.2)) drop-shadow(0 8px 20px rgba(0,0,0,0.12))' }}
        >
          <div className="mx-auto h-[520px] w-full max-w-[900px] sm:h-[600px] lg:h-[680px]">
            <DeviceMockups />
          </div>
        </motion.div>
      </div>

      <a href="#uslugi" className="mx-auto mt-12 hidden w-fit flex-col items-center gap-1.5 text-[#9CA3AF] transition-[color,opacity] duration-300 hover:text-[#0EA5E9] lg:flex">
        <span className="text-[10px] uppercase tracking-[0.28em]">Przewiń</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </a>
    </section>
  )
}
