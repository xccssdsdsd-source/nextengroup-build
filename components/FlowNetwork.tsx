'use client'

import { motion } from 'framer-motion'
import { Bot, CheckCircle2, MessagesSquare, Sparkles } from 'lucide-react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function FlowNetwork() {
  return (
    <div className="relative h-full overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(5,14,28,0.98)_0%,rgba(3,9,19,1)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_100px_rgba(0,0,0,0.42),0_0_80px_rgba(0,212,255,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,212,255,0.16),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(26,111,255,0.18),transparent_24%),radial-gradient(circle_at_58%_74%,rgba(0,212,255,0.08),transparent_26%)]" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,234,255,0.65),transparent)]" />

      <div className="relative flex h-full flex-col justify-center p-5 sm:p-7 lg:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.34em] text-[#6a88ae]">
              Live preview
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[#edf8ff] sm:text-2xl">
              Strona przechwytuje kontakt i porządkuje lead
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#8feaff]">
            <span className="h-2 w-2 rounded-full bg-[#00d4ff] shadow-[0_0_16px_rgba(0,212,255,0.9)]" />
            aktywne
          </div>
        </div>

        <div className="grid flex-1 gap-5 lg:grid-cols-[1.02fr_0.66fr_1.02fr] lg:items-center">
          <motion.article
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,18,35,0.96),rgba(5,13,24,0.98))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#6f8fb3]">
                  Formularz
                </div>
                <div className="mt-2 text-lg font-semibold text-[#eff9ff]">
                  Nowe zapytanie
                </div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00d4ff]/16 bg-[#00d4ff]/10 text-[#8fefff]">
                <MessagesSquare size={18} />
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-white/8 bg-[#05111f]/90 p-4">
              <div className="text-sm leading-7 text-[#dbeeff]">
                Potrzebuję strony, która wygląda premium i daje więcej zapytań.
              </div>

              <div className="mt-4 space-y-3">
                <AnimatedBar width="88%" delay={0} />
                <AnimatedBar width="72%" delay={0.2} />
                <AnimatedBar width="64%" delay={0.35} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {['kontakt', 'nowy lead', 'wysoki priorytet'].map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#97b3d3]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>

          <div className="relative flex h-full items-center justify-center py-4">
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 320 520"
              fill="none"
              aria-hidden="true"
            >
              <path d="M38 140C118 140 108 140 160 220" stroke="rgba(0,212,255,0.16)" strokeWidth="2" />
              <path d="M160 300C212 380 202 380 282 380" stroke="rgba(52,245,197,0.16)" strokeWidth="2" />

              <motion.circle
                r="6"
                fill="#67ecff"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <animateMotion dur="2s" repeatCount="indefinite" path="M38 140C118 140 108 140 160 220" />
              </motion.circle>

              <motion.circle
                r="6"
                fill="#8affd7"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
              >
                <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M160 300C212 380 202 380 282 380" />
              </motion.circle>
            </svg>

            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 1px rgba(0,212,255,0.18), 0 0 30px rgba(0,212,255,0.12)',
                  '0 0 0 1px rgba(0,212,255,0.34), 0 0 60px rgba(0,212,255,0.2)',
                  '0 0 0 1px rgba(0,212,255,0.18), 0 0 30px rgba(0,212,255,0.12)',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-[220px] w-[220px] flex-col items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(0,212,255,0.22),rgba(6,19,38,0.96)_58%,rgba(3,10,22,1)_100%)] px-5 text-center"
            >
              <div className="absolute inset-[16px] rounded-full border border-[#00d4ff]/10" />
              <div className="absolute inset-[34px] rounded-full border border-white/6" />
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 text-[#93f1ff]">
                <Bot size={24} />
              </div>
              <div className="mt-4 text-[11px] uppercase tracking-[0.28em] text-[#7ea0c7]">
                NG Engine
              </div>
              <div className="mt-2 max-w-[150px] text-lg font-semibold leading-tight text-[#eff9ff]">
                AI czyści chaos i układa lead
              </div>
              <div className="mt-4 space-y-2">
                {['analiza', 'kwalifikacja', 'przekazanie'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0.35, y: 4 }}
                    animate={{ opacity: [0.35, 1, 0.35], y: [4, 0, 4] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2, ease }}
                    className="rounded-full border border-[#00d4ff]/15 bg-[#051425]/85 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#bbecff]"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.article
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="rounded-[28px] border border-[#2fe3ff]/18 bg-[linear-gradient(180deg,rgba(10,24,46,0.98)_0%,rgba(6,16,32,0.98)_100%)] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#6f8fb3]">
                  Wynik
                </div>
                <div className="mt-2 text-lg font-semibold text-[#eff8ff]">
                  Lead gotowy
                </div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#34f5c5]/18 bg-[#34f5c5]/10 text-[#b4ffe8]">
                <CheckCircle2 size={18} />
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#f0fbff]">
                <Sparkles size={16} className="text-[#8fefff]" />
                Gotowe do kontaktu
              </div>
              <div className="mt-4 text-xl font-semibold text-[#eff9ff]">
                klient zainteresowany ofertą
              </div>
              <div className="mt-2 text-sm leading-7 text-[#9bb7d8]">
                Strona zbiera kontakt, AI porządkuje treść, a Ty dostajesz czytelny lead.
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Metric label="status" value="priorytet" />
                <Metric label="reakcja" value="od razu" />
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  )
}

function AnimatedBar({ width, delay }: { width: string; delay: number }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
      <motion.div
        className="h-full rounded-full bg-[linear-gradient(90deg,#19dfff,#347cff)]"
        initial={{ width: '0%' }}
        animate={{ width }}
        transition={{ duration: 1.2, delay, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1.2, ease }}
      />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-white/8 bg-[#071423] px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6988aa]">{label}</div>
      <div className="mt-2 text-xl font-semibold text-[#eff8ff]">{value}</div>
    </div>
  )
}
