'use client'

const paths = [
  { d: 'M -50 300 Q 150 200 350 180 Q 550 160 800 100', color: '#06B6D4', width: 1.0 },
  { d: 'M -50 360 Q 130 240 310 220 Q 510 200 800 160', color: '#22D3EE', width: 0.5 },
  { d: 'M 800 100 Q 600 200 400 250 Q 200 300 -50 400', color: '#0891B2', width: 0.7 },
]

export default function BackgroundPathsServices() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 1500; }
            100% { stroke-dashoffset: 0; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .bp-s-0 { animation: flowPath 18s linear infinite; }
            .bp-s-1 { animation: flowPath 22s linear infinite; }
            .bp-s-2 { animation: flowPath 20s linear infinite; }
          }
          .bp-s-0, .bp-s-1, .bp-s-2 { opacity: 0.18; }
        `}</style>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray="1500"
            className={`bp-s-${i}`}
          />
        ))}
      </svg>
    </div>
  )
}
