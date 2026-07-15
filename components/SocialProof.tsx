'use client'

import { m, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const numberStyle = {
  color: 'var(--accent-bright)',
}

interface StatItem {
  value: number | null
  suffix?: string
  label: string
}

const stats: StatItem[] = [
  { value: null, label: 'Poprawek bez limitu' },
  { value: 72, suffix: 'h', label: 'Realny czas na pierwszy projekt' },
  { value: 24, suffix: 'h', label: 'Pierwsza wizualizacja' },
  { value: 0, suffix: ' zł', label: 'Konsultacja i wycena' },
]

function CountUp({ target, suffix, active, delay }: {
  target: number
  suffix?: string
  active: boolean
  delay: number
}) {
  const [count, setCount] = useState(target)

  useEffect(() => {
    if (!active) return
    setCount(0)
    const controls = animate(0, target, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v: number) { setCount(Math.round(v)) },
    })
    return controls.stop
  }, [active, target, delay])

  return <>{count}{suffix}</>
}

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="social-proof-section px-5 pb-14 sm:pb-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <m.div
          className="section-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>Dlaczego my</span>
          <h2 className="section-title" suppressHydrationWarning>Współpraca bez ryzyka</h2>
        </m.div>

        <div data-fade-in className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--border)]" style={{ background: 'var(--border)', boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -28px rgba(0,0,0,0.85)' }}>
          {stats.map((stat, i) => {
            return (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="group relative flex flex-col items-center justify-center gap-3 px-6 py-10 text-center overflow-hidden transition-colors duration-300"
                style={{ background: 'linear-gradient(180deg, #0F141D 0%, #0C1017 55%, #0A0E15 100%)' }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 50% 40%, rgba(58,175,232,0.07), transparent 68%)' }}
                />

                <div className="text-[2.6rem] sm:text-[3.25rem] font-extrabold leading-none tracking-tighter">
                  {stat.value === null ? (
                    <span style={numberStyle}>∞</span>
                  ) : (
                    <span style={numberStyle}>
                      <CountUp target={stat.value} suffix={stat.suffix} active={inView} delay={i * 0.1 + 0.15} />
                    </span>
                  )}
                </div>

                <p className="text-[12px] sm:text-[13px] font-medium text-[#7C879B] leading-snug max-w-[140px]">
                  {stat.label}
                </p>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
