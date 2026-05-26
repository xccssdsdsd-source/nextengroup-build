'use client'

const paths = [
  { d: 'M -60 350 Q 200 220 480 180 Q 760 140 1200 80', color: '#F97316', width: 1.0 },
  { d: 'M -60 410 Q 180 260 440 220 Q 720 180 1200 140', color: '#FBBF24', width: 0.5 },
  { d: 'M 1200 250 Q 850 350 550 420 Q 250 490 -60 600', color: '#F59E0B', width: 0.7 },
]

export default function BackgroundPathsPortfolio() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 2000; }
            100% { stroke-dashoffset: 0; }
          }
          .path-0 { animation: flowPath 22s linear infinite; opacity: 0.6; }
          .path-1 { animation: flowPath 26s linear infinite; opacity: 0.5; }
          .path-2 { animation: flowPath 24s linear infinite; opacity: 0.6; }
        `}</style>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray="2000"
            className={`path-${i}`}
          />
        ))}
      </svg>
    </div>
  )
}
