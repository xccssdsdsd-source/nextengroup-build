'use client'

import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, CircleDollarSign, Mail, UserRound } from 'lucide-react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

type FlowNetworkProps = {
  trigger: number
}

export default function FlowNetwork({ trigger }: FlowNetworkProps) {
  const [phase, setPhase] = useState<'idle' | 'incoming' | 'scanning' | 'result'>('idle')

  useEffect(() => {
    if (!trigger) {
      return
    }

    setPhase('incoming')

    const scanTimer = window.setTimeout(() => setPhase('scanning'), 700)
    const resultTimer = window.setTimeout(() => setPhase('result'), 1700)

    return () => {
      window.clearTimeout(scanTimer)
      window.clearTimeout(resultTimer)
    }
  }, [trigger])

  const tags = useMemo(
    () => [
      {
        label: 'ANALIZA INTENCJI',
        className: 'left-1/2 top-3 -translate-x-1/2'
      },
      {
        label: 'KLASYFIKACJA',
        className: 'left-4 top-1/2 -translate-y-1/2'
      },
      {
        label: 'PRIORYTET',
        className: 'right-4 top-1/2 -translate-y-1/2'
      }
    ],
    []
  )

  return (
    <div className="relative h-full overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(4,12,24,0.98)_0%,rgba(2,7,16,1)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_100px_rgba(0,0,0,0.42),0_0_120px_rgba(0,140,255,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(61,148,255,0.2),transparent_20%),radial-gradient(circle_at_20%_18%,rgba(130,208,255,0.1),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(11,69,255,0.14),transparent_28%)]" />
      <div className="absolute inset-0 grain-overlay opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,234,255,0.4),transparent)]" />

      <div className="relative flex h-full flex-col px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <h3 className="max-w-[16ch] text-xl font-semibold tracking-[-0.04em] text-[#edf8ff] sm:text-2xl">
          Strona przechwytuje kontakt i porządkuje lead
        </h3>

        <div className="relative flex flex-1 items-center justify-center pb-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(61,148,255,0.12),transparent_18%)]" />

          <AnimatePresence>
            {phase === 'incoming' && (
              <motion.div
                key={`mail-${trigger}`}
                initial={{ opacity: 0, x: 220, scale: 0.8, rotate: -10 }}
                animate={{
                  opacity: [0, 1, 1],
                  x: [220, 70, 0],
                  scale: [0.8, 1, 0.55],
                  rotate: [-10, -4, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease }}
                className="absolute left-1/2 top-1/2 z-20 ml-2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-[#87d7ff]/30 bg-[linear-gradient(180deg,rgba(14,28,48,0.96),rgba(7,15,30,0.92))] text-[#ddf6ff] shadow-[0_0_40px_rgba(61,148,255,0.25)]"
              >
                <Mail size={24} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              scale: phase === 'scanning' ? [1, 1.06, 0.98, 1.04, 1] : [1, 1.025, 1],
              boxShadow:
                phase === 'scanning'
                  ? [
                      '0 0 0 1px rgba(126,207,255,0.18), 0 0 50px rgba(61,148,255,0.18), inset 0 0 28px rgba(160,228,255,0.14)',
                      '0 0 0 1px rgba(126,207,255,0.34), 0 0 90px rgba(61,148,255,0.42), inset 0 0 44px rgba(160,228,255,0.22)',
                      '0 0 0 1px rgba(126,207,255,0.18), 0 0 50px rgba(61,148,255,0.18), inset 0 0 28px rgba(160,228,255,0.14)'
                    ]
                  : [
                      '0 0 0 1px rgba(126,207,255,0.18), 0 0 42px rgba(61,148,255,0.14), inset 0 0 24px rgba(160,228,255,0.12)',
                      '0 0 0 1px rgba(126,207,255,0.24), 0 0 74px rgba(61,148,255,0.22), inset 0 0 32px rgba(160,228,255,0.18)',
                      '0 0 0 1px rgba(126,207,255,0.18), 0 0 42px rgba(61,148,255,0.14), inset 0 0 24px rgba(160,228,255,0.12)'
                    ]
            }}
            transition={{
              duration: phase === 'scanning' ? 0.55 : 2.8,
              repeat: phase === 'scanning' ? 1 : Infinity,
              ease: 'easeInOut'
            }}
            className="relative z-10 flex h-[230px] w-[230px] items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(206,240,255,0.32)_0%,rgba(126,207,255,0.2)_16%,rgba(36,92,175,0.18)_34%,rgba(7,17,35,0.82)_63%,rgba(3,9,20,0.96)_100%)] backdrop-blur-md sm:h-[260px] sm:w-[260px]"
          >
            <div className="absolute inset-[14px] rounded-full border border-white/10" />
            <div className="absolute inset-[30px] rounded-full border border-[#8be2ff]/10" />
            <motion.div
              animate={{
                opacity: phase === 'scanning' ? [0.3, 0.8, 0.3] : [0.22, 0.4, 0.22],
                rotate: [0, 180, 360]
              }}
              transition={{
                opacity: {
                  duration: phase === 'scanning' ? 0.45 : 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                },
                rotate: {
                  duration: phase === 'scanning' ? 0.9 : 9,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
              className="absolute inset-[42px] rounded-full border border-dashed border-[#87d7ff]/35"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.92, 1.04, 0.92] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(199,239,255,0.95)_0%,rgba(107,194,255,0.75)_36%,rgba(61,148,255,0.18)_70%,transparent_100%)] blur-[2px]"
            />

            <AnimatePresence>
              {phase === 'scanning' &&
                tags.map((tag, index) => (
                  <motion.div
                    key={tag.label}
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0.8, 1, 1, 0.92],
                      y: [8, 0, 0, -8]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: index * 0.08, ease }}
                    className={`absolute z-20 rounded-full border border-[#90e9ff]/30 bg-[#071524]/88 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-[#c8f4ff] shadow-[0_0_24px_rgba(61,148,255,0.2)] ${tag.className}`}
                  >
                    {tag.label}
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {phase === 'result' && (
              <>
                <ResultCard
                  key={`result-left-${trigger}`}
                  className="left-[10%] top-1/2 -translate-y-1/2 sm:left-[14%]"
                  delay={0}
                  icon={<UserRound size={22} />}
                  accent={<CircleDollarSign size={34} className="text-[#65f3a4]" />}
                />
                <ResultCard
                  key={`result-right-${trigger}`}
                  className="right-[10%] top-1/2 -translate-y-1/2 sm:right-[14%]"
                  delay={0.12}
                  icon={<CalendarDays size={22} />}
                  accent={<span className="text-[13px] font-black tracking-[0.24em] text-[#edf8ff]">READY</span>}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function ResultCard({
  className,
  delay,
  icon,
  accent,
}: {
  className: string
  delay: number
  icon: ReactNode
  accent: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72, x: 0, y: '-50%' }}
      animate={{
        opacity: 1,
        scale: 1,
        x: className.includes('left') ? -42 : 42,
        y: '-50%'
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.65, delay, ease }}
      className={`absolute z-20 flex h-[132px] w-[108px] flex-col items-center justify-center rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(13,25,44,0.92),rgba(6,14,27,0.94))] shadow-[0_18px_60px_rgba(0,0,0,0.34),0_0_30px_rgba(61,148,255,0.12)] backdrop-blur-md ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-[#8feaff]/18 bg-[#0a1b31] text-[#e7f9ff]">
        {icon}
      </div>
      <div className="mt-4 flex items-center justify-center">{accent}</div>
    </motion.div>
  )
}
