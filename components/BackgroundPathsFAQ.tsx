'use client'

const paths = [
  { d: 'M -40 280 Q 160 180 400 150 Q 640 120 900 60', color: '#06B6D4', width: 0.9 },
  { d: 'M -40 340 Q 140 220 360 190 Q 600 160 900 120', color: '#0891B2', width: 0.5 },
  { d: 'M 900 180 Q 700 280 500 350 Q 300 420 -40 500', color: '#22D3EE', width: 0.7 },
]

export default function BackgroundPathsFAQ() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 1700; }
            100% { stroke-dashoffset: 0; }
          }
          .path-0 { animation: flowPath 19s linear infinite; opacity: 0.6; }
          .path-1 { animation: flowPath 23s linear infinite; opacity: 0.5; }
          .path-2 { animation: flowPath 21s linear infinite; opacity: 0.6; }
        `}</style>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray="1700"
            className={`path-${i}`}
          />
        ))}
      </svg>
    </div>
  )
}
