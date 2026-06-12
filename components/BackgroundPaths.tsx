'use client'

const mainPaths = [
  { d: 'M -100 480 Q 250 300 550 280 Q 850 260 1300 80', color: '#0D0D0D', width: 1.1, dur: 20 },
  { d: 'M -100 540 Q 290 360 580 320 Q 880 280 1300 130', color: '#111111', width: 0.55, dur: 25 },
  { d: 'M -100 600 Q 200 420 500 380 Q 800 340 1300 220', color: '#0D0D0D', width: 0.9, dur: 22 },
  { d: 'M 1300 490 Q 920 340 630 310 Q 340 280 -100 110', color: '#1A1A1A', width: 0.7, dur: 27 },
  { d: 'M -100 420 Q 300 240 600 260 Q 900 280 1300 60', color: 'rgba(59,130,246,0.3)', width: 0.4, dur: 32 },
  { d: 'M 1300 560 Q 950 400 660 360 Q 370 320 -100 170', color: 'rgba(29,78,216,0.25)', width: 0.45, dur: 30 },
]

export default function BackgroundPaths() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="bp-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <style>{`
          @keyframes bpFlow {
            0% { stroke-dashoffset: 2400; }
            100% { stroke-dashoffset: 0; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .bp-0 { animation: bpFlow ${mainPaths[0].dur}s linear infinite; }
            .bp-1 { animation: bpFlow ${mainPaths[1].dur}s linear infinite; }
            .bp-2 { animation: bpFlow ${mainPaths[2].dur}s linear infinite; }
            .bp-3 { animation: bpFlow ${mainPaths[3].dur}s linear infinite; }
            .bp-4 { animation: bpFlow ${mainPaths[4].dur}s linear infinite; }
            .bp-5 { animation: bpFlow ${mainPaths[5].dur}s linear infinite; }
          }
          .bp-0, .bp-2 { opacity: 0.22; }
          .bp-1, .bp-3 { opacity: 0.15; }
          .bp-4, .bp-5 { opacity: 0.12; }
        `}</style>
        {mainPaths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray={2400}
            className={`bp-${i}`}
            filter={i < 2 ? 'url(#bp-glow)' : undefined}
          />
        ))}
      </svg>
    </div>
  )
}
