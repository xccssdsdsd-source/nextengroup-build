'use client'

const paths = [
  { d: 'M -50 300 Q 150 200 350 180 Q 550 160 800 100', color: '#06B6D4', width: 1.0, delay: 0, dur: 11 },
  { d: 'M -50 330 Q 140 220 330 200 Q 530 180 800 130', color: '#06B6D4', width: 0.6, delay: 0.4, dur: 11 },
  { d: 'M -50 360 Q 130 240 310 220 Q 510 200 800 160', color: '#22D3EE', width: 0.5, delay: 0.8, dur: 11 },
  { d: 'M -50 390 Q 120 260 290 240 Q 490 220 800 190', color: '#0891B2', width: 0.7, delay: 1.3, dur: 12 },
  { d: 'M 800 100 Q 600 200 400 250 Q 200 300 -50 400', color: '#06B6D4', width: 0.8, delay: 3.0, dur: 13 },
  { d: 'M 800 130 Q 610 210 410 260 Q 210 310 -50 420', color: '#22D3EE', width: 0.5, delay: 3.4, dur: 13 },
  { d: 'M 800 160 Q 620 220 420 270 Q 220 320 -50 440', color: '#0891B2', width: 0.6, delay: 3.8, dur: 13 },
  { d: 'M 400 -20 Q 450 150 480 320 Q 510 450 450 550', color: '#22D3EE', width: 0.5, delay: 5.5, dur: 10 },
]

export default function BackgroundPathsServices() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 1500; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
        `}</style>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray={1500}
            strokeDashoffset={1500}
            style={{
              animation: `flowPath ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
