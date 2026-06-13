'use client'

const paths = [
  { d: 'M -80 250 Q 180 150 450 120 Q 720 90 1100 50', color: '#22D3EE', width: 0.9 },
  { d: 'M -80 310 Q 160 190 410 160 Q 680 130 1100 110', color: '#5EEAFF', width: 0.5 },
  { d: 'M 1100 200 Q 750 280 450 350 Q 150 420 -80 520', color: '#0E7490', width: 0.7 },
]

export default function BackgroundPathsProcess() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1100 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 1800; }
            100% { stroke-dashoffset: 0; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .bp-p-0 { animation: flowPath 20s linear infinite; }
            .bp-p-1 { animation: flowPath 24s linear infinite; }
            .bp-p-2 { animation: flowPath 22s linear infinite; }
          }
          .bp-p-0, .bp-p-1, .bp-p-2 { opacity: 0.18; }
        `}</style>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray="1800"
            className={`bp-p-${i}`}
          />
        ))}
      </svg>
    </div>
  )
}
