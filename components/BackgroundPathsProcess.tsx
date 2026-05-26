'use client'

const paths = [
  { d: 'M -80 250 Q 180 150 450 120 Q 720 90 1100 50', color: '#A855F7', width: 0.9 },
  { d: 'M -80 310 Q 160 190 410 160 Q 680 130 1100 110', color: '#D8B4FE', width: 0.5 },
  { d: 'M 1100 200 Q 750 280 450 350 Q 150 420 -80 520', color: '#9D4EDD', width: 0.7 },
]

export default function BackgroundPathsProcess() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1100 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 1800; }
            100% { stroke-dashoffset: 0; }
          }
          .path-0 { animation: flowPath 20s linear infinite; opacity: 0.25; }
          .path-1 { animation: flowPath 24s linear infinite; opacity: 0.2; }
          .path-2 { animation: flowPath 22s linear infinite; opacity: 0.25; }
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
            className={`path-${i}`}
          />
        ))}
      </svg>
    </div>
  )
}
