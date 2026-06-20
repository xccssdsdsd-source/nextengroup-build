'use client'

import { useEffect, useState } from 'react'

const curve = (i: number, pos: number) =>
  `M-${380 - i * 5 * pos} -${189 + i * 6}C-${380 - i * 5 * pos} -${189 + i * 6} -${312 - i * 5 * pos} ${216 - i * 6} ${152 - i * 5 * pos} ${343 - i * 6}C${616 - i * 5 * pos} ${470 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6}`

const paths = [
  { d: curve(1, 1),   w: 1.4, dur: 20, delay: 0 },
  { d: curve(6, 1),   w: 1.0, dur: 26, delay: 0.6 },
  { d: curve(12, 1),  w: 0.8, dur: 32, delay: 1.2 },
  { d: curve(19, 1),  w: 0.6, dur: 38, delay: 1.8 },
  { d: curve(28, 1),  w: 0.4, dur: 44, delay: 2.4 },
  { d: curve(3, -1),  w: 1.2, dur: 24, delay: 0.3 },
  { d: curve(10, -1), w: 0.9, dur: 30, delay: 0.9 },
  { d: curve(18, -1), w: 0.7, dur: 36, delay: 1.5 },
  { d: curve(26, -1), w: 0.5, dur: 42, delay: 2.1 },
  { d: curve(34, -1), w: 0.35, dur: 50, delay: 2.7 },
]

export default function BackgroundPaths() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback
      if (idle) idle(() => setReady(true))
      else setTimeout(() => setReady(true), 200)
    }
    if (document.readyState === 'complete') start()
    else {
      window.addEventListener('load', start, { once: true })
      return () => window.removeEventListener('load', start)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.4s ease' }}
    >
      <style>{`
        @keyframes bp-flow {
          from { stroke-dashoffset: 2400; }
          to { stroke-dashoffset: 0; }
        }
        .bp-path { opacity: 0.5; }
        @media (prefers-reduced-motion: reduce) {
          .bp-path { animation: none !important; opacity: 0.1 !important; }
        }
      `}</style>
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {ready && paths.map((p, i) => (
          <g key={i}>
            <path d={p.d} stroke="#22D3EE" strokeWidth={p.w} strokeLinecap="round" fill="none" opacity={0.1} />
            <path
              className="bp-path"
              d={p.d}
              stroke="#22D3EE"
              strokeWidth={p.w}
              strokeLinecap="round"
              fill="none"
              strokeDasharray="420 1980"
              style={{ animation: `bp-flow ${p.dur}s linear ${p.delay}s infinite` }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
