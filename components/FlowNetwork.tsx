'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, CheckCircle2, MessageSquareText, UserRound } from 'lucide-react'

const nodes = [
  {
    id: 'lead',
    label: 'Nowy lead',
    title: 'Wiadomosc wpada',
    icon: MessageSquareText,
    accent: '#00b4d8',
    tags: ['Cel: Wycena', 'Kanał: WWW'],
  },
  {
    id: 'ai',
    label: 'Analiza AI',
    title: 'AI ocenia termin i oferte',
    icon: Bot,
    accent: '#66e6ff',
    tags: ['Status: Analiza', 'Priorytet: Wysoki'],
  },
  {
    id: 'crm',
    label: 'CRM',
    title: 'Handlowiec dostaje gotowy wynik',
    icon: UserRound,
    accent: '#34d399',
    tags: ['Status: Przetworzono', 'CRM: Zapisano'],
  },
] as const

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function FlowNetwork() {
  const [activeStep, setActiveStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [runKey, setRunKey] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const timers = [
      window.setTimeout(() => setActiveStep(0), 140),
      window.setTimeout(() => setActiveStep(1), 1200),
      window.setTimeout(() => setActiveStep(2), 2280),
      window.setTimeout(() => setIsRunning(false), 3280),
    ]

    return () => {
      timers.forEach(window.clearTimeout)
    }
  }, [isRunning, runKey])

  const progress = activeStep <= 0 ? 0 : activeStep === 1 ? 50 : 100

  const handleRun = () => {
    setActiveStep(-1)
    setIsRunning(true)
    setRunKey(prev => prev + 1)
  }

  return (
    <div
      className="relative h-full overflow-hidden rounded-[30px] border border-white/10"
      style={{
        background:
          'linear-gradient(180deg, rgba(4, 12, 28, 0.96) 0%, rgba(3, 8, 20, 0.98) 100%)',
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.03), 0 24px 80px rgba(0,0,0,0.52), 0 0 80px rgba(0,180,216,0.08)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 18%, rgba(0,180,216,0.14), transparent 28%), radial-gradient(circle at 82% 14%, rgba(102,230,255,0.12), transparent 24%), radial-gradient(circle at 50% 100%, rgba(52,211,153,0.1), transparent 32%)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between gap-8 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#5a7598]">Lead Flow</div>
            <div className="mt-2 text-lg font-semibold text-[#eef7ff] sm:text-xl">
              Minimalistyczna symulacja workflow
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#00b4d8]/20 bg-[#00b4d8]/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#8feaff]">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: isRunning ? '#00b4d8' : 'rgba(143,234,255,0.45)',
                boxShadow: isRunning ? '0 0 14px rgba(0,180,216,0.9)' : 'none',
              }}
            />
            {isRunning ? 'Flow aktywny' : 'Flow gotowy'}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            type="button"
            onClick={handleRun}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#00b4d8]/30 px-6 py-3.5 text-sm font-semibold text-[#eafcff]"
            style={{
              background: 'linear-gradient(180deg, rgba(0,180,216,0.22) 0%, rgba(0,180,216,0.12) 100%)',
              boxShadow: '0 0 30px rgba(0,180,216,0.14)',
            }}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_58%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">▶ Uruchom Symulacje</span>
          </motion.button>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative flex w-full max-w-4xl flex-col items-start gap-10 px-2 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="absolute left-[33px] top-[68px] bottom-[68px] w-px bg-white/10 lg:left-[12%] lg:right-[12%] lg:top-1/2 lg:bottom-auto lg:h-px lg:w-auto lg:-translate-y-1/2" />

            <div className="absolute left-[33px] top-[68px] bottom-[68px] w-px overflow-hidden lg:left-[12%] lg:right-[12%] lg:top-1/2 lg:bottom-auto lg:h-px lg:w-auto lg:-translate-y-1/2">
              <motion.div
                className="absolute left-0 top-0 h-full w-full origin-top bg-[linear-gradient(180deg,rgba(0,180,216,0)_0%,rgba(0,180,216,0.95)_50%,rgba(52,211,153,0.95)_100%)] lg:origin-left lg:bg-[linear-gradient(90deg,rgba(0,180,216,0)_0%,rgba(0,180,216,0.95)_55%,rgba(52,211,153,0.95)_100%)]"
                animate={{
                  scaleY: progress === 0 ? 0 : progress / 100,
                  scaleX: progress / 100,
                  opacity: progress === 0 ? 0.28 : 1,
                }}
                transition={{ duration: 0.72, ease }}
              />

              {isRunning && (
                <motion.div
                  key={runKey}
                  className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-[#d7fbff] shadow-[0_0_24px_rgba(0,180,216,0.9)] lg:h-4 lg:w-4"
                  animate={{
                    top: ['0%', '100%', '100%'],
                    left: ['0%', '0%', '100%'],
                  }}
                  transition={{ duration: 2.6, ease: 'easeInOut', times: [0, 0.5, 1] }}
                />
              )}
            </div>

            {nodes.map((node, index) => {
              const Icon = node.icon
              const isActive = activeStep === index
              const isComplete = activeStep > index || (!isRunning && activeStep === nodes.length - 1 && index < nodes.length)

              return (
                <div key={node.id} className="relative z-10 flex w-full items-start gap-4 lg:w-[31%] lg:flex-col lg:items-center lg:text-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.06 : 1,
                      boxShadow: isActive
                        ? `0 0 0 1px ${node.accent}55, 0 0 38px ${node.accent}44`
                        : isComplete
                          ? `0 0 0 1px ${node.accent}30, 0 0 24px ${node.accent}1f`
                          : '0 0 0 1px rgba(255,255,255,0.08)',
                    }}
                    transition={{ duration: 0.35, ease }}
                    className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,24,44,0.96)_0%,rgba(6,14,28,0.96)_100%)] sm:h-[76px] sm:w-[76px]"
                  >
                    <span
                      className="absolute inset-0 rounded-[22px]"
                      style={{
                        background: isActive
                          ? `radial-gradient(circle at 50% 30%, ${node.accent}28, transparent 68%)`
                          : 'transparent',
                      }}
                    />
                    <Icon size={28} color={node.accent} />
                    {index === 2 && (
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#34d399]/30 bg-[#06161a]">
                        <CheckCircle2 size={14} color="#34d399" />
                      </span>
                    )}
                  </motion.div>

                  <div className="pt-2 lg:pt-0">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#5d7a9f]">{node.label}</div>
                    <div className="mt-2 text-base font-semibold leading-tight text-[#eef7ff] sm:text-lg">
                      {node.title}
                    </div>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`${node.id}-tags`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.28, ease }}
                          className="mt-3 flex flex-wrap gap-2 lg:justify-center"
                        >
                          {node.tags.map(tag => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#d6e6fb]"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            activeStep >= 0 ? 'Lead: odebrany' : 'Lead: oczekuje',
            activeStep >= 1 ? 'AI: przetwarza' : 'AI: standby',
            activeStep >= 2 ? 'CRM: gotowe dla handlowca' : 'CRM: czeka',
          ].map(item => (
            <div
              key={item}
              className="rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[#b8cae3]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
