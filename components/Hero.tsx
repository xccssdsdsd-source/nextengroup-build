'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import FlowNetwork from './FlowNetwork'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Hero() {
  const [previewTrigger, setPreviewTrigger] = useState(0)

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(26,111,255,0.24),transparent_24%),radial-gradient(circle_at_16%_20%,rgba(0,212,255,0.1),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-0 grain-drift opacity-30" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <motion.h1
            className="max-w-[9ch] font-sans text-[clamp(58px,9vw,128px)] uppercase leading-[0.86] tracking-[-0.06em] text-white"
            style={{ fontFamily: 'var(--font-barlow)' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease }}
          >
            Strony,
            <br />
            <span className="gradient-text">które</span>
            <br />
            sprzedają.
          </motion.h1>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.12, ease }}
          >
            <a
              href="#kontakt"
              onClick={() => setPreviewTrigger(value => value + 1)}
              className="btn-primary inline-flex items-center justify-center px-7 py-4 text-sm"
            >
              Darmowa wizualizacja
            </a>
            <a
              href="#portfolio"
              className="btn-ghost inline-flex items-center justify-center px-7 py-4 text-sm"
            >
              Zobacz realizacje
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.82, delay: 0.16, ease }}
          className="min-w-0"
        >
          <div className="mx-auto h-[520px] w-full max-w-[900px] sm:h-[600px] lg:h-[680px]">
            <FlowNetwork trigger={previewTrigger} />
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
