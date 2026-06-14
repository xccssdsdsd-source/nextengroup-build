'use client'

import { useEffect, useState } from 'react'

const curve = (i: number, pos: number) =>
  `M-${380 - i * 5 * pos} -${189 + i * 6}C-${380 - i * 5 * pos} -${189 + i * 6} -${312 - i * 5 * pos} ${216 - i * 6} ${152 - i * 5 * pos} ${343 - i * 6}C${616 - i * 5 * pos} ${470 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6}`

const threads = [
  { d: curve(4, 1),   w: 1.1, dashDur: 26, fadeDur: 13, delay: 0,  color: '#22D3EE' },
  { d: curve(14, 1),  w: 0.8, dashDur: 34, fadeDur: 17, delay: 5,  color: '#5EEAFF' },
  { d: curve(26, 1),  w: 0.6, dashDur: 42, fadeDur: 21, delay: 11, color: '#22D3EE' },
  { d: curve(8, -1),  w: 1.0, dashDur: 30, fadeDur: 15, delay: 3,  color: '#5EEAFF' },
  { d: curve(20, -1), w: 0.7, dashDur: 38, fadeDur: 19, delay: 8,  color: '#22D3EE' },
  { d: curve(31, -1), w: 0.5, dashDur: 46, fadeDur: 23, delay: 15, color: '#5EEAFF' },
]

export default function GlobalPathsClient() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, contain: 'strict' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes gp-flow {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes gp-pulse {
          0%, 100% { opacity: 0.12; }
          50%       { opacity: 0.42; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gp-path { animation: none !important; opacity: 0.08 !important; }
        }
      `}</style>
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.28))' }}
      >
        {threads.map((t, i) => (
          <path
            key={i}
            className="gp-path"
            d={t.d}
            stroke={t.color}
            strokeWidth={t.w}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={2400}
            style={{
              animation: `gp-flow ${t.dashDur}s linear ${t.delay}s infinite, gp-pulse ${t.fadeDur}s ease-in-out ${t.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
