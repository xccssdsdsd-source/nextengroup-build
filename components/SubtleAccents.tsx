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
          {/* Linia 1 — blue ↗ */}
          <linearGradient id="l1" x1="-250" y1="820" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0"    />
            <stop offset="20%"  stopColor="#2563EB" stopOpacity="0.28" />
            <stop offset="80%"  stopColor="#2563EB" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0"    />
          </linearGradient>

          {/* Linia 2 — cyan ↘ */}
          <linearGradient id="l2" x1="-250" y1="80" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0EA5E9" stopOpacity="0"    />
            <stop offset="20%"  stopColor="#0EA5E9" stopOpacity="0.24" />
            <stop offset="80%"  stopColor="#0EA5E9" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0"    />
          </linearGradient>

          {/* Linia 3 — indigo strome ↑ */}
          <linearGradient id="l3" x1="820" y1="-100" x2="1100" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#6366F1" stopOpacity="0"    />
            <stop offset="25%"  stopColor="#6366F1" stopOpacity="0.20" />
            <stop offset="75%"  stopColor="#6366F1" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0"    />
          </linearGradient>
        </defs>

        <line x1="-250" y1="820" x2="1440" y2="0"    stroke="url(#l1)" strokeWidth="2"   opacity="0.035" />
        <line x1="-250" y1="80"  x2="1440" y2="900"  stroke="url(#l2)" strokeWidth="2"   opacity="0.035" />
        <line x1="820"  y1="-100" x2="1100" y2="1000" stroke="url(#l3)" strokeWidth="1.5" opacity="0.035" />
      </svg>
    </div>
  )
}
