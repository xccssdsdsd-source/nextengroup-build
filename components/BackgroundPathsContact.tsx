'use client'

const paths = [
  { d: 'M -50 300 Q 140 200 350 170 Q 560 140 850 80', color: '#22D3EE', width: 0.9 },
  { d: 'M -50 360 Q 120 240 310 210 Q 520 180 850 140', color: '#5EEAFF', width: 0.5 },
  { d: 'M 850 150 Q 650 250 450 320 Q 250 390 -50 480', color: '#0E7490', width: 0.7 },
]

export default function BackgroundPathsContact() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ contentVisibility: 'auto' }}>
      <svg
        viewBox="0 0 850 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          @keyframes flowPath {
            from { stroke-dashoffset: 1800; }
            to { stroke-dashoffset: 0; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .bp-c-0 { animation: flowPath 18s linear infinite; }
            .bp-c-1 { animation: flowPath 22s linear infinite; }
            .bp-c-2 { animation: flowPath 20s linear infinite; }
          }
          .bp-c-0, .bp-c-1, .bp-c-2 { opacity: 0.18; }
        `}</style>
        {paths.map((p, i) => (
          <g key={i}>
            <path d={p.d} fill="none" stroke={p.color} strokeWidth={p.width} strokeLinecap="round" opacity={0.1} />
            <path d={p.d} fill="none" stroke={p.color} strokeWidth={p.width} strokeLinecap="round" strokeDasharray="300 1500" className={`bp-c-${i}`} />
          </g>
        ))}
      </svg>
    </div>
  )
}
