'use client'

import { m, useInView } from 'framer-motion'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { raw: 24, suffix: 'h', label: 'Do pierwszej wizualizacji' },
  { raw: 96, suffix: '+', label: 'Lighthouse score' },
  { raw: 100, suffix: '%', label: 'Zadowolenia klientów' },
  { raw: -1, suffix: '∞', label: 'Bezpłatnych poprawek' },
]

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number
  suffix: string
  inView: boolean
}) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView || target < 0) return
    const duration = 1400
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(ease * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, target])

  if (target < 0) return <span style={numStyle}>∞</span>
  return (
    <span style={numStyle}>
      {value}
      {suffix}
    </span>
  )
}

const numStyle: CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  background: 'linear-gradient(95deg, #5eeaff 0%, #22d3ee 55%, #0e7490 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  lineHeight: 1.1,
  display: 'inline-block',
}

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      aria-label="Kluczowe liczby"
      suppressHydrationWarning
      style={{
        padding: '0 1.5rem 2.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        className="mx-auto max-w-7xl"
        style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(14,116,144,0.04) 100%)',
          border: '1px solid rgba(34,211,238,0.12)',
          borderRadius: '1.25rem',
          padding: '1.75rem 2rem',
        }}
      >
        <m.ul
          className="grid grid-cols-2 gap-6 list-none p-0 m-0 md:grid-cols-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((s, i) => (
            <li
              key={s.label}
              className="flex flex-col items-center text-center gap-1"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <AnimatedCounter target={s.raw} suffix={s.suffix} inView={inView} />
              <span
                style={{
                  fontSize: '0.72rem',
                  color: '#7A8899',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {s.label}
              </span>
            </li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
