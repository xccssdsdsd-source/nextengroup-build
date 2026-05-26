'use client'

const paths = [
  { d: 'M -40 280 Q 160 180 400 150 Q 640 120 900 60', color: '#06B6D4', width: 0.9, delay: 0, dur: 11 },
  { d: 'M -40 310 Q 150 200 380 170 Q 620 140 900 90', color: '#06B6D4', width: 0.6, delay: 0.4, dur: 11 },
  { d: 'M -40 340 Q 140 220 360 190 Q 600 160 900 120', color: '#0891B2', width: 0.5, delay: 0.8, dur: 11 },
  { d: 'M -40 370 Q 130 240 340 210 Q 580 180 900 150', color: '#22D3EE', width: 0.7, delay: 1.3, dur: 12 },
  { d: 'M 900 180 Q 700 280 500 350 Q 300 420 -40 500', color: '#06B6D4', width: 0.8, delay: 2.9, dur: 13 },
  { d: 'M 900 220 Q 720 310 520 380 Q 320 450 -40 530', color: '#0891B2', width: 0.5, delay: 3.5, dur: 13 },
  { d: 'M 450 -20 Q 470 180 490 380 Q 510 520 450 650', color: '#22D3EE', width: 0.5, delay: 5.3, dur: 10 },
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
            0% { stroke-dashoffset: 1700; opacity: 0; }
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
            strokeDasharray={1700}
            strokeDashoffset={1700}
            style={{
              animation: `flowPath ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
