'use client'

const line = (i: number, position: number) =>
  `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`

const threads = [
  { d: line(7, 1),   w: 1.0, dur: 30, delay: 0 },
  { d: line(24, 1),  w: 0.8, dur: 38, delay: 6 },
  { d: line(16, -1), w: 0.9, dur: 34, delay: 3 },
]

export default function GlobalPaths() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      <style>{`
        @keyframes gp-flow2 {
          from { stroke-dashoffset: 2400; }
          to { stroke-dashoffset: 0; }
        }
        .gp-path { opacity: 0.4; }
        @media (prefers-reduced-motion: reduce) {
          .gp-path { animation: none !important; opacity: 0.07 !important; }
        }
      `}</style>
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {threads.map((t, i) => (
          <g key={i}>
            <path d={t.d} stroke="#22D3EE" strokeWidth={t.w} strokeLinecap="round" fill="none" opacity={0.1} />
            <path
              className="gp-path"
              d={t.d}
              stroke="#22D3EE"
              strokeWidth={t.w}
              strokeLinecap="round"
              fill="none"
              strokeDasharray="420 1980"
              style={{ animation: `gp-flow2 ${t.dur}s linear ${t.delay}s infinite` }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
