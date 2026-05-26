'use client'

const paths = [
  { d: 'M -60 350 Q 200 220 480 180 Q 760 140 1200 80', color: '#F97316', width: 1.0, delay: 0, dur: 12 },
  { d: 'M -60 380 Q 190 240 460 200 Q 740 160 1200 110', color: '#F97316', width: 0.6, delay: 0.4, dur: 12 },
  { d: 'M -60 410 Q 180 260 440 220 Q 720 180 1200 140', color: '#FBBF24', width: 0.5, delay: 0.9, dur: 12 },
  { d: 'M -60 440 Q 170 280 420 240 Q 700 200 1200 170', color: '#F59E0B', width: 0.7, delay: 1.5, dur: 13 },
  { d: 'M 1200 250 Q 850 350 550 420 Q 250 490 -60 600', color: '#F97316', width: 0.8, delay: 3.2, dur: 14 },
  { d: 'M 1200 290 Q 870 380 570 450 Q 270 520 -60 630', color: '#FBBF24', width: 0.5, delay: 3.9, dur: 14 },
  { d: 'M 600 -30 Q 630 220 660 460 Q 690 620 600 750', color: '#FBBF24', width: 0.5, delay: 5.8, dur: 11 },
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
            0% { stroke-dashoffset: 2000; opacity: 0; }
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
            strokeDasharray={2000}
            strokeDashoffset={2000}
            style={{
              animation: `flowPath ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
