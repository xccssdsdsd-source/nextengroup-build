'use client'

const paths = [
  { d: 'M -80 250 Q 180 150 450 120 Q 720 90 1100 50', color: '#A855F7', width: 0.9, delay: 0, dur: 12 },
  { d: 'M -80 280 Q 170 170 430 140 Q 700 110 1100 80', color: '#A855F7', width: 0.6, delay: 0.5, dur: 12 },
  { d: 'M -80 310 Q 160 190 410 160 Q 680 130 1100 110', color: '#D8B4FE', width: 0.5, delay: 1.0, dur: 12 },
  { d: 'M -80 340 Q 150 210 390 180 Q 660 150 1100 140', color: '#9D4EDD', width: 0.7, delay: 1.6, dur: 13 },
  { d: 'M 1100 200 Q 750 280 450 350 Q 150 420 -80 520', color: '#A855F7', width: 0.8, delay: 3.5, dur: 14 },
  { d: 'M 1100 240 Q 770 310 470 380 Q 170 450 -80 550', color: '#D8B4FE', width: 0.5, delay: 4.1, dur: 14 },
  { d: 'M 500 -40 Q 520 200 540 420 Q 560 580 500 700', color: '#D8B4FE', width: 0.5, delay: 6.0, dur: 11 },
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
            0% { stroke-dashoffset: 1800; opacity: 0; }
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
            strokeDasharray={1800}
            strokeDashoffset={1800}
            style={{
              animation: `flowPath ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
