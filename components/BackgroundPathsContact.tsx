'use client'

const paths = [
  { d: 'M -50 300 Q 140 200 350 170 Q 560 140 850 80', color: '#FBBF24', width: 0.9 },
  { d: 'M -50 360 Q 120 240 310 210 Q 520 180 850 140', color: '#F59E0B', width: 0.5 },
  { d: 'M 850 150 Q 650 250 450 320 Q 250 390 -50 480', color: '#DEB887', width: 0.7 },
]

export default function BackgroundPathsContact() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 850 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 1600; }
            100% { stroke-dashoffset: 0; }
          }
          .path-0 { animation: flowPath 18s linear infinite; opacity: 0.6; }
          .path-1 { animation: flowPath 22s linear infinite; opacity: 0.5; }
          .path-2 { animation: flowPath 20s linear infinite; opacity: 0.6; }
        `}</style>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray="1600"
            className={`path-${i}`}
          />
        ))}
      </svg>
    </div>
  )
}
