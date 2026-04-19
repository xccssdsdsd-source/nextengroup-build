'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronRight, PhoneCall, Sparkles, Zap } from 'lucide-react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const leadText =
  'Potrzebuj\u0119 instalacji fotowoltaicznej dla domu 200 m2. Bud\u017cet: 40 000 PLN. Oddzwo\u0144: 555-123'

const analysisLabels = [
  'Analizowanie kontekstu...',
  'Ekstrakcja telefonu...',
  'Lead Score: 98/100',
  'Pilno\u015b\u0107: wysoka',
] as const

const introCopy =
  'W mniej ni\u017c 5 sekund surowe zapytanie zmienia si\u0119 w gotowy lead dla handlowca.'

const previewCopy =
  'Kliknij i zobacz, jak AI przechwytuje formularz, rozumie intencj\u0119 i przekazuje handlowcowi gotowego klienta.'

const engineCopy = 'AI porz\u0105dkuje chaos w lead z warto\u015bci\u0105'
const reactionCopy = 'Reakcja w 5 s zamiast 30 minut r\u0119cznego odpisywania'

export default function FlowNetwork() {
  const [hasStarted, setHasStarted] = useState(false)
  const [activeStep, setActiveStep] = useState<-1 | 0 | 1 | 2>(-1)
  const [runKey, setRunKey] = useState(0)
  const [typedLength, setTypedLength] = useState(0)

  useEffect(() => {
    if (!hasStarted) return

    const timers = [
      window.setTimeout(() => setActiveStep(0), 180),
      window.setTimeout(() => setActiveStep(1), 1800),
      window.setTimeout(() => setActiveStep(2), 3350),
    ]

    return () => timers.forEach(window.clearTimeout)
  }, [hasStarted, runKey])

  useEffect(() => {
    if (!hasStarted) return

    setTypedLength(0)

    let frame = 0
    const interval = window.setInterval(() => {
      frame += 2
      setTypedLength(Math.min(frame, leadText.length))
      if (frame >= leadText.length) window.clearInterval(interval)
    }, 34)

    return () => window.clearInterval(interval)
  }, [hasStarted, runKey])

  const handleStart = () => {
    setHasStarted(true)
    setActiveStep(-1)
    setRunKey(prev => prev + 1)
  }

  const formVisible = activeStep >= 0
  const engineActive = activeStep >= 1
  const outcomeVisible = activeStep >= 2
  const finished = activeStep === 2

  return (
    <div
      className="relative h-full overflow-hidden rounded-[32px] border border-white/10"
      style={{
        background:
          'linear-gradient(180deg, rgba(3, 10, 24, 0.98) 0%, rgba(2, 8, 18, 1) 100%)',
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.03), 0 32px 120px rgba(0,0,0,0.55), 0 0 90px rgba(0,212,255,0.1)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 16% 22%, rgba(0,212,255,0.14), transparent 28%), radial-gradient(circle at 52% 46%, rgba(26,111,255,0.12), transparent 24%), radial-gradient(circle at 88% 24%, rgba(0,212,255,0.1), transparent 22%)',
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,234,255,0.65),transparent)]" />

      <div className="relative flex h-full flex-col p-5 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.34em] text-[#5a7598]">Live Process Flow</div>
            <h3 className="mt-3 text-xl font-semibold text-[#edf8ff] sm:text-2xl">
              Zobacz jak zarabiamy dla Ciebie czas
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[#88a3c6] sm:text-[15px]">{introCopy}</p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#8feaff]">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: hasStarted ? '#00d4ff' : 'rgba(143,234,255,0.4)',
                boxShadow: hasStarted ? '0 0 16px rgba(0,212,255,0.85)' : 'none',
              }}
            />
            {finished ? 'Lead gotowy' : hasStarted ? 'Symulacja aktywna' : 'Gotowe do startu'}
          </div>
        </div>

        <div className="relative mt-8 flex flex-1 items-center justify-center overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_100%)] px-4 py-6 sm:px-5 lg:px-7">
          <DesktopConnectors activeStep={activeStep} runKey={runKey} />
          <MobileConnectors activeStep={activeStep} runKey={runKey} />

          {!hasStarted && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="relative z-10 flex max-w-xl flex-col items-center text-center"
            >
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#7ea0c7]">
                Symulacja procesu leadowego
              </div>
              <div className="mt-5 text-balance text-sm leading-7 text-[#90abc9] sm:text-base">{previewCopy}</div>
              <motion.button
                type="button"
                onClick={handleStart}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#00d4ff]/30 px-7 py-3.5 text-sm font-semibold text-[#ecfbff]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,212,255,0.22) 0%, rgba(26,111,255,0.16) 100%)',
                  boxShadow: '0 0 34px rgba(0,212,255,0.2)',
                }}
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_58%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <Sparkles size={16} className="relative" />
                <span className="relative">Start Simulation</span>
              </motion.button>
            </motion.div>
          )}

          {hasStarted && (
            <div className="relative z-10 grid w-full max-w-6xl gap-5 lg:grid-cols-[1.08fr_0.84fr_1.08fr] lg:items-center lg:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -56 }}
                animate={{ opacity: formVisible ? 1 : 0, x: formVisible ? 0 : -56 }}
                transition={{ duration: 0.65, ease }}
                className="rounded-[26px] border border-[#7ddfff]/12 bg-[linear-gradient(180deg,rgba(7,19,37,0.98)_0%,rgba(4,13,26,0.98)_100%)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#6f8fb3]">Nowe zapytanie</div>
                    <div className="mt-2 text-lg font-semibold text-[#eef8ff]">Customer Form</div>
                  </div>
                  <div className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#8feaff]">
                    WWW
                  </div>
                </div>

                <div className="mt-5 rounded-[22px] border border-white/8 bg-[#04101f]/90 p-4">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#587493]">
                    <span className="h-2 w-2 rounded-full bg-[#00d4ff]" />
                    Formularz klienta
                  </div>
                  <div className="mt-4 min-h-[126px] text-sm leading-7 text-[#d9ebff] sm:text-[15px]">
                    {leadText.slice(0, typedLength)}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-[#72ebff]"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {['Kana\u0142: strona WWW', 'Chaos inputu: wysoki', 'Wymaga pilnej reakcji'].map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#97b3d3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="relative flex justify-center py-4 lg:py-0">
                <motion.div
                  animate={{
                    scale: engineActive ? [1, 1.05, 1] : 1,
                    boxShadow: engineActive
                      ? [
                          '0 0 0 1px rgba(0,212,255,0.18), 0 0 30px rgba(0,212,255,0.12)',
                          '0 0 0 1px rgba(0,212,255,0.38), 0 0 65px rgba(0,212,255,0.28)',
                          '0 0 0 1px rgba(0,212,255,0.18), 0 0 30px rgba(0,212,255,0.12)',
                        ]
                      : '0 0 0 1px rgba(255,255,255,0.06)',
                  }}
                  transition={{ duration: 1.2, ease: 'easeInOut', repeat: engineActive ? Infinity : 0 }}
                  className="relative flex h-[230px] w-[230px] flex-col items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(0,212,255,0.2),rgba(5,18,36,0.96)_58%,rgba(3,10,24,1)_100%)] px-4 text-center"
                >
                  <div className="absolute inset-[16px] rounded-full border border-[#00d4ff]/10" />
                  <div className="absolute inset-[34px] rounded-full border border-white/6" />
                  <div className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 p-3 text-[#93f1ff]">
                    <Zap size={24} />
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[#7ea0c7]">NG Engine</div>
                  <div className="mt-2 max-w-[150px] text-balance text-lg font-semibold leading-tight text-[#eff9ff]">
                    {engineCopy}
                  </div>

                  <AnimatePresence>
                    {engineActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mt-4 space-y-2"
                      >
                        {analysisLabels.map((item, index) => (
                          <motion.div
                            key={`${item}-${runKey}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: index * 0.16, ease }}
                            className="rounded-full border border-[#00d4ff]/15 bg-[#051425]/85 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#bbecff]"
                          >
                            {item}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 56 }}
                animate={{ opacity: outcomeVisible ? 1 : 0, x: outcomeVisible ? 0 : 56 }}
                transition={{ duration: 0.65, ease }}
                className="rounded-[28px] border border-[#2fe3ff]/18 bg-[linear-gradient(180deg,rgba(10,24,46,0.98)_0%,rgba(6,16,32,0.98)_100%)] p-4 shadow-[0_26px_90px_rgba(0,0,0,0.46)] sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#6f8fb3]">Premium CRM</div>
                    <div className="mt-2 text-lg font-semibold text-[#eff8ff]">High-value lead ready</div>
                  </div>
                  <div className="rounded-full border border-[#34f5c5]/20 bg-[#34f5c5]/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#b4ffe8]">
                    Ready to buy
                  </div>
                </div>

                <div className="mt-5 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#fdf1c8]">
                    <span className="text-lg">{'\uD83D\uDD25'}</span>
                    High-Value Lead Discovered
                  </div>
                  <div className="mt-4 text-xl font-semibold text-[#eff9ff]">Jan Kowalski</div>
                  <div className="mt-1 text-sm text-[#9bb7d8]">Solar Inquiry • Ready to Buy</div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-white/8 bg-[#071423] px-4 py-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6988aa]">Estimated Value</div>
                      <div className="mt-2 text-xl font-semibold text-[#7af2ff]">40 000 PLN</div>
                    </div>
                    <div className="rounded-[18px] border border-white/8 bg-[#071423] px-4 py-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6988aa]">Kontakt</div>
                      <div className="mt-2 text-xl font-semibold text-[#eff8ff]">555-123</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#19e6ff,#32ffc8)] px-5 py-3 text-sm font-semibold text-[#041018] shadow-[0_0_34px_rgba(50,255,200,0.25)]"
                    >
                      <PhoneCall size={16} />
                      Call Now
                    </button>
                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[#a6c2df]">
                      {reactionCopy}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {finished && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.32, ease }}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#34f5c5]/18 bg-[#34f5c5]/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-[#b6ffe9]"
                    >
                      <ChevronRight size={14} />
                      Time Saved: 15 minutes of manual sorting
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>

        {hasStarted && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                activeStep >= 0 ? 'Formularz przechwycony' : 'Czekamy na zapytanie',
                activeStep >= 1 ? 'AI czyta bud\u017cet i telefon' : 'AI w trybie standby',
                activeStep >= 2 ? 'Handlowiec dostaje lead premium' : 'CRM czeka na wynik',
              ].map(item => (
                <div
                  key={item}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[#9db8d7]"
                >
                  {item}
                </div>
              ))}
            </div>

            <motion.button
              type="button"
              onClick={handleStart}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/24 bg-[#00d4ff]/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#96efff]"
            >
              Uruchom ponownie
              <ArrowRight size={14} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}

function DesktopConnectors({ activeStep, runKey }: { activeStep: number; runKey: number }) {
  const firstActive = activeStep >= 1
  const secondActive = activeStep >= 2

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg viewBox="0 0 1200 680" className="h-full w-full">
        <defs>
          <linearGradient id="lineGlowA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,212,255,0)" />
            <stop offset="45%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#7af2ff" />
          </linearGradient>
          <linearGradient id="lineGlowB" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(122,242,255,0)" />
            <stop offset="45%" stopColor="#7af2ff" />
            <stop offset="100%" stopColor="#32ffc8" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 250 340 C 340 340, 390 340, 480 340"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <path
          d="M 720 340 C 810 340, 860 340, 950 340"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />

        {firstActive && (
          <path
            d="M 250 340 C 340 340, 390 340, 480 340"
            fill="none"
            stroke="url(#lineGlowA)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#softGlow)"
            className="flow-line"
          />
        )}
        {secondActive && (
          <path
            d="M 720 340 C 810 340, 860 340, 950 340"
            fill="none"
            stroke="url(#lineGlowB)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#softGlow)"
            className="flow-line"
          />
        )}
      </svg>

      {firstActive && (
        <motion.div
          key={`desktop-first-${runKey}`}
          className="absolute left-[21%] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#c9fbff] shadow-[0_0_22px_rgba(0,212,255,0.95)]"
          animate={{ x: [0, 300], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      )}
      {secondActive && (
        <motion.div
          key={`desktop-second-${runKey}`}
          className="absolute left-[60%] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#d7ffef] shadow-[0_0_24px_rgba(50,255,200,0.95)]"
          animate={{ x: [0, 290], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.05, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}

function MobileConnectors({ activeStep, runKey }: { activeStep: number; runKey: number }) {
  const firstActive = activeStep >= 1
  const secondActive = activeStep >= 2

  return (
    <div className="pointer-events-none absolute inset-0 lg:hidden">
      <svg viewBox="0 0 420 900" className="h-full w-full">
        <defs>
          <linearGradient id="mobileGlowA" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,212,255,0)" />
            <stop offset="45%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#7af2ff" />
          </linearGradient>
          <linearGradient id="mobileGlowB" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(122,242,255,0)" />
            <stop offset="45%" stopColor="#7af2ff" />
            <stop offset="100%" stopColor="#32ffc8" />
          </linearGradient>
        </defs>

        <path
          d="M 210 250 C 210 310, 210 320, 210 390"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        <path
          d="M 210 505 C 210 575, 210 590, 210 670"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />

        {firstActive && (
          <path
            d="M 210 250 C 210 310, 210 320, 210 390"
            fill="none"
            stroke="url(#mobileGlowA)"
            strokeWidth="3"
            strokeLinecap="round"
            className="flow-line"
          />
        )}
        {secondActive && (
          <path
            d="M 210 505 C 210 575, 210 590, 210 670"
            fill="none"
            stroke="url(#mobileGlowB)"
            strokeWidth="3"
            strokeLinecap="round"
            className="flow-line"
          />
        )}
      </svg>

      {firstActive && (
        <motion.div
          key={`mobile-first-${runKey}`}
          className="absolute left-1/2 top-[28%] h-4 w-4 -translate-x-1/2 rounded-full bg-[#c9fbff] shadow-[0_0_22px_rgba(0,212,255,0.95)]"
          animate={{ y: [0, 150], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.05, ease: 'easeInOut' }}
        />
      )}
      {secondActive && (
        <motion.div
          key={`mobile-second-${runKey}`}
          className="absolute left-1/2 top-[57%] h-4 w-4 -translate-x-1/2 rounded-full bg-[#d7ffef] shadow-[0_0_24px_rgba(50,255,200,0.95)]"
          animate={{ y: [0, 160], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.05, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}
