'use client'

const paths = [
  { d: 'M -100 500 Q 300 350 600 300 Q 900 250 1300 100', color: '#3B82F6', width: 1.2, delay: 0, dur: 9 },
  { d: 'M -100 520 Q 280 360 580 310 Q 880 260 1300 110', color: '#3B82F6', width: 0.7, delay: 0.3, dur: 9 },
  { d: 'M -100 540 Q 260 370 560 320 Q 860 270 1300 120', color: '#60A5FA', width: 0.5, delay: 0.6, dur: 9 },
  { d: 'M -100 560 Q 240 380 540 330 Q 840 280 1300 130', color: '#BFDBFE', width: 0.9, delay: 0.9, dur: 9 },
  { d: 'M -100 600 Q 200 420 500 370 Q 800 320 1300 200', color: '#2563EB', width: 1.0, delay: 1.5, dur: 10 },
  { d: 'M -100 620 Q 180 430 480 380 Q 780 330 1300 210', color: '#3B82F6', width: 0.7, delay: 1.8, dur: 10 },
  { d: 'M -100 640 Q 160 440 460 390 Q 760 340 1300 220', color: '#60A5FA', width: 0.5, delay: 2.1, dur: 10 },
  { d: 'M 1300 500 Q 900 350 600 300 Q 300 250 -100 100', color: '#3B82F6', width: 0.8, delay: 3.5, dur: 11 },
  { d: 'M 1300 520 Q 920 360 620 310 Q 320 260 -100 110', color: '#60A5FA', width: 0.5, delay: 3.8, dur: 11 },
  { d: 'M 1300 540 Q 940 370 640 320 Q 340 270 -100 120', color: '#BFDBFE', width: 0.7, delay: 4.1, dur: 11 },
  { d: 'M 800 -50 Q 750 200 700 400 Q 650 600 700 700', color: '#BFDBFE', width: 0.7, delay: 6.1, dur: 9 },
  { d: 'M 820 -50 Q 770 200 720 400 Q 670 600 720 700', color: '#3B82F6', width: 0.5, delay: 6.4, dur: 9 },
]

export default function BackgroundPaths() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 1200 600"
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
