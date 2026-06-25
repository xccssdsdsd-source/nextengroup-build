'use client'

import type { CSSProperties } from 'react'

const threads = [
  { d: 'M -180 -80 C 180 40 360 178 620 312 S 1120 542 1620 820', w: 0.78, dashDur: 58, delay: 0, opacity: 0.18 },
  { d: 'M -260 86 C 120 132 346 244 610 384 S 1080 616 1520 748', w: 0.56, dashDur: 72, delay: 16, opacity: 0.13 },
  { d: 'M -120 220 C 170 210 420 322 690 456 S 1120 664 1600 900', w: 0.64, dashDur: 65, delay: 9, opacity: 0.145 },
  { d: 'M 80 -120 C 288 80 520 210 820 362 S 1250 548 1600 680', w: 0.48, dashDur: 80, delay: 28, opacity: 0.1 },
]

export default function GlobalPathsClient() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, contain: 'strict' }}
      aria-hidden="true"
    >
      <svg
        className="gp-svg w-full h-full"
        viewBox="0 0 1440 760"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {threads.map((t, i) => (
          <g key={i}>
            <path
              d={t.d}
              stroke="#22D3EE"
              strokeWidth={t.w}
              strokeLinecap="round"
              fill="none"
              opacity={0.04}
            />
            <path
              className="gp-path"
              d={t.d}
              stroke="#22D3EE"
              strokeWidth={t.w}
              strokeLinecap="round"
              fill="none"
              strokeDasharray="480 1920"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.26))',
                animation: `gp-flow ${t.dashDur}s linear ${t.delay}s infinite`,
                opacity: t.opacity,
              } as CSSProperties}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
