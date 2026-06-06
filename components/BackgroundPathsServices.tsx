'use client'

const paths = [
  { d: 'M -50 300 Q 150 200 350 180 Q 550 160 800 100', color: '#06B6D4', width: 1.0 },
  { d: 'M -50 360 Q 130 240 310 220 Q 510 200 800 160', color: '#22D3EE', width: 0.5 },
  { d: 'M 800 100 Q 600 200 400 250 Q 200 300 -50 400', color: '#0891B2', width: 0.7 },
]

const nodes = [
  { cx: 96, cy: 268, r: 3.5 },
  { cx: 192, cy: 232, r: 2.8 },
  { cx: 286, cy: 210, r: 4.2 },
  { cx: 404, cy: 194, r: 3.2 },
  { cx: 520, cy: 176, r: 2.8 },
  { cx: 636, cy: 146, r: 4.1 },
  { cx: 742, cy: 112, r: 3.2 },
]

export default function BackgroundPathsServices() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.16) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at center, black 56%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 56%, transparent 100%)',
        }}
      />
      <div className="absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.10),transparent_70%)] blur-3xl" />
      <div className="absolute -left-24 top-32 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_72%)] blur-3xl" />
      <div className="absolute -right-28 bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_72%)] blur-3xl" />
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="relative z-10 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          @keyframes flowPath {
            0% { stroke-dashoffset: 1500; }
            100% { stroke-dashoffset: 0; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .bp-s-0 { animation: flowPath 18s linear infinite; }
            .bp-s-1 { animation: flowPath 22s linear infinite; }
            .bp-s-2 { animation: flowPath 20s linear infinite; }
          }
          .bp-s-0, .bp-s-1, .bp-s-2 { opacity: 0.18; }
          @keyframes nodePulse {
            0%, 100% { opacity: 0.28; transform: scale(1); }
            50% { opacity: 0.52; transform: scale(1.18); }
          }
          .bp-node {
            transform-box: fill-box;
            transform-origin: center;
            animation: nodePulse 6s ease-in-out infinite;
          }
          .bp-node-1 { animation-delay: 0.4s; }
          .bp-node-2 { animation-delay: 1.1s; }
          .bp-node-3 { animation-delay: 1.8s; }
          .bp-node-4 { animation-delay: 2.4s; }
          .bp-node-5 { animation-delay: 3s; }
          .bp-node-6 { animation-delay: 3.7s; }
          .bp-node-7 { animation-delay: 4.3s; }
        `}</style>
        <g opacity="0.18">
          <path d="M 96 268 L 192 232 L 286 210 L 404 194 L 520 176 L 636 146 L 742 112" fill="none" stroke="rgba(14,165,233,0.24)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 10" />
          <path d="M 96 268 L 286 210 L 404 194 L 636 146 L 742 112" fill="none" stroke="rgba(37,99,235,0.16)" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 12" />
        </g>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={p.width}
            strokeLinecap="round"
            strokeDasharray="1500"
            className={`bp-s-${i}`}
          />
        ))}
        {nodes.map((node, index) => (
          <circle
            key={index}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="rgba(255, 255, 255, 0.9)"
            stroke="rgba(59, 130, 246, 0.35)"
            strokeWidth="1"
            className={`bp-node bp-node-${index + 1}`}
          />
        ))}
      </svg>
    </div>
  )
}
