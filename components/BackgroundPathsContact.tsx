'use client'

const paths = [
  { d: 'M -50 300 Q 140 200 350 170 Q 560 140 850 80', color: '#FBBF24', width: 0.9, delay: 0, dur: 11 },
  { d: 'M -50 330 Q 130 220 330 190 Q 540 160 850 110', color: '#FBBF24', width: 0.6, delay: 0.4, dur: 11 },
  { d: 'M -50 360 Q 120 240 310 210 Q 520 180 850 140', color: '#F59E0B', width: 0.5, delay: 0.8, dur: 11 },
  { d: 'M -50 390 Q 110 260 290 230 Q 500 200 850 170', color: '#DEB887', width: 0.7, delay: 1.3, dur: 12 },
  { d: 'M 850 150 Q 650 250 450 320 Q 250 390 -50 480', color: '#FBBF24', width: 0.8, delay: 2.9, dur: 13 },
  { d: 'M 850 190 Q 670 280 470 350 Q 270 420 -50 510', color: '#F59E0B', width: 0.5, delay: 3.5, dur: 13 },
  { d: 'M 400 -20 Q 420 180 440 380 Q 460 520 400 650', color: '#DEB887', width: 0.5, delay: 5.3, dur: 10 },
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
            0% { stroke-dashoffset: 1600; opacity: 0; }
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
            strokeDasharray={1600}
            strokeDashoffset={1600}
            style={{
              animation: `flowPath ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
