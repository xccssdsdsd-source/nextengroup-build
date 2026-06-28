'use client'

import { m, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const gradientStyle = {
  background: 'linear-gradient(95deg, #5EEAFF 0%, #22D3EE 55%, #0E7490 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

interface StatItem {
  value: number | null
  suffix?: string
  label: string
}

const stats: StatItem[] = [
  { value: null, label: 'Liczba poprawek' },
  { value: 100, suffix: '%', label: 'Zadowolonych klientów' },
  { value: 24, suffix: 'h', label: 'Pierwsza wizualizacja' },
  { value: 0, suffix: ' zł', label: 'Konsultacja i wycena' },
]

function CountUp({ target, suffix, active, delay }: {
  target: number
  suffix?: string
  active: boolean
  delay: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
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
    <section ref={ref} className="px-5 pb-14 sm:pb-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--border)]" style={{ background: 'var(--border)' }}>
          {stats.map((stat, i) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="group relative flex flex-col items-center justify-center gap-2.5 px-6 py-10 bg-[#0D1117] text-center overflow-hidden transition-colors duration-300 hover:bg-[#0F1520]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 40%, rgba(34,211,238,0.07), transparent 68%)' }}
              />

              <div className="text-[2.8rem] sm:text-[3.5rem] font-extrabold leading-none tracking-tighter">
                {stat.value === null ? (
                  <m.span
                    style={gradientStyle}
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ∞
                  </m.span>
                ) : (
                  <span style={gradientStyle}>
                    <CountUp target={stat.value} suffix={stat.suffix} active={inView} delay={i * 0.1 + 0.15} />
                  </span>
                )}
              </div>

              <p className="text-[12px] sm:text-[13px] font-medium text-[#7C879B] leading-snug max-w-[130px]">
                {stat.label}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
