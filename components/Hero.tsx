'use client'

import type { MouseEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import DeviceMockups from './DeviceMockups'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const words = [
  { text: 'Strony,', cls: 'text-white' },
  { text: 'które', cls: 'gradient-text' },
  { text: 'sprzedają.', cls: 'text-white' },
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
    <section suppressHydrationWarning className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ y: y1 }} className="aurora-1 absolute -right-[8%] -top-[10%] h-[700px] w-[700px] rounded-full bg-[rgba(26,111,255,0.2)] blur-[130px]" />
        <motion.div style={{ y: y2 }} className="aurora-2 absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[rgba(0,212,255,0.1)] blur-[110px]" />
        <motion.div style={{ y: y3 }} className="aurora-3 absolute -bottom-[20%] left-[30%] h-[600px] w-[600px] rounded-full bg-[rgba(80,40,220,0.1)] blur-[140px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(26,111,255,0.18),transparent_30%),radial-gradient(ellipse_at_16%_20%,rgba(0,212,255,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 grain-drift opacity-30" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
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
            className="mt-6 max-w-xl text-sm leading-7 text-[#9db4d2] sm:text-base"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44, ease }}
          >
            Projektujemy rozwiązania, które łączą procesy dla firm usługowych.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
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
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.22, ease }}
          className="hidden lg:block min-w-0"
        >
          <div className="mx-auto h-[520px] w-full max-w-[900px] sm:h-[600px] lg:h-[680px]">
            <DeviceMockups />
          </div>
        </motion.div>
      </div>

      <a href="#uslugi" className="mx-auto mt-10 hidden w-fit flex-col items-center gap-1 text-[#6883a7] transition-[color,opacity] duration-300 hover:text-[#8fefff] lg:flex">
        <span className="text-[11px] uppercase tracking-[0.24em]">Przewiń</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} />
        </motion.div>
      </a>
    </section>
  )
}
