'use client'

export default function SubtleAccents() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: -1 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="l1" x1="-250" y1="820" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D0D0D" stopOpacity="0" />
            <stop offset="22%" stopColor="#0D0D0D" stopOpacity="0.20" />
            <stop offset="78%" stopColor="#111111" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="l2" x1="-250" y1="80" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D0D0D" stopOpacity="0" />
            <stop offset="22%" stopColor="#0D0D0D" stopOpacity="0.16" />
            <stop offset="78%" stopColor="#222222" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#222222" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="l3" x1="820" y1="-100" x2="1100" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#888888" stopOpacity="0" />
            <stop offset="28%" stopColor="#888888" stopOpacity="0.12" />
            <stop offset="72%" stopColor="#AAAAAA" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#AAAAAA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="frameStroke" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D0D0D" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#333333" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0D0D0D" stopOpacity="0.18" />
          </linearGradient>
          <radialGradient id="glowTL" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 60) scale(520)">
            <stop offset="0%" stopColor="#0D0D0D" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0D0D0D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowBR" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1320 840) scale(560)">
            <stop offset="0%" stopColor="#444444" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#444444" stopOpacity="0" />
          </radialGradient>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .accent-line { stroke-dasharray: 1900; animation: line-draw 3.2s cubic-bezier(0.22,1,0.36,1) forwards; }
              .accent-drift { animation: accent-drift 26s ease-in-out infinite; transform-box: view-box; }
              .accent-glow { animation: accent-pulse 16s ease-in-out infinite; transform-box: view-box; transform-origin: center; }
            }
            .accent-l1 { animation-delay: 0.1s; }
            .accent-l2 { animation-delay: 0.35s; }
            .accent-l3 { animation-delay: 0.6s; }
            @keyframes line-draw { from { stroke-dashoffset: 1900; opacity: 0; } to { stroke-dashoffset: 0; opacity: 1; } }
            @keyframes accent-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
            @keyframes accent-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
          `}</style>
        </defs>

        <rect x="0" y="0" width="1440" height="900" fill="url(#glowTL)" className="accent-glow" />
        <rect x="0" y="0" width="1440" height="900" fill="url(#glowBR)" className="accent-glow" style={{ animationDelay: '8s' }} />

        <rect
          x="22" y="22" width="1396" height="856" rx="26"
          fill="none" stroke="url(#frameStroke)" strokeWidth="1"
        />

        <g className="accent-drift">
          <line x1="-250" y1="820" x2="1440" y2="0" stroke="url(#l1)" strokeWidth="1.5" className="accent-line accent-l1" />
          <line x1="-250" y1="80" x2="1440" y2="900" stroke="url(#l2)" strokeWidth="1.5" className="accent-line accent-l2" />
          <line x1="820" y1="-100" x2="1100" y2="1000" stroke="url(#l3)" strokeWidth="1.25" className="accent-line accent-l3" />
        </g>
      </svg>
    </div>
  )
}
