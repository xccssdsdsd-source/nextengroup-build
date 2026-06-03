'use client'

const paths = [
  { d: 'M -100 500 Q 300 350 600 300 Q 900 250 1300 100', color: '#3B82F6', width: 1.2 },
  { d: 'M -100 540 Q 260 370 560 320 Q 860 270 1300 120', color: '#60A5FA', width: 0.5 },
  { d: 'M -100 600 Q 200 420 500 370 Q 800 320 1300 200', color: '#2563EB', width: 1.0 },
  { d: 'M 1300 500 Q 900 350 600 300 Q 300 250 -100 100', color: '#3B82F6', width: 0.8 },
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
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            opacity={0.12}
          />
        ))}
      </svg>
    </div>
  )
}
