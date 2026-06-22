'use client'

const curve = (i: number, pos: number) =>
  `M-${380 - i * 5 * pos} -${189 + i * 6}C-${380 - i * 5 * pos} -${189 + i * 6} -${312 - i * 5 * pos} ${216 - i * 6} ${152 - i * 5 * pos} ${343 - i * 6}C${616 - i * 5 * pos} ${470 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6}`

const threads = [
  { d: curve(6, 1),   w: 0.8, dashDur: 52, fadeDur: 22, delay: 0,  color: '#22D3EE' },
  { d: curve(20, 1),  w: 0.6, dashDur: 64, fadeDur: 28, delay: 9,  color: '#5EEAFF' },
  { d: curve(12, -1), w: 0.7, dashDur: 58, fadeDur: 25, delay: 5,  color: '#5EEAFF' },
  { d: curve(28, -1), w: 0.5, dashDur: 72, fadeDur: 31, delay: 14, color: '#22D3EE' },
]

export default function GlobalPathsClient() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, contain: 'strict' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes gp-flow {
          0%   { stroke-dashoffset: 2400; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes gp-pulse {
          0%, 100% { opacity: 0.05; }
          50%       { opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gp-path { animation: none !important; opacity: 0.08 !important; }
        }
      `}</style>
      <svg
        className="gp-svg w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
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
