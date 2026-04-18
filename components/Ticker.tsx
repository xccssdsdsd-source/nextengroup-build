export default function Ticker() {
  const items = 'Strony WWW · Automatyzacje AI · Chatboty AI · Lead Generation · UI/UX Design · Integracje · '
  const repeated = items.repeat(6)

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
        <span
          className="text-sm text-[#4a6080] tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-figtree)', fontWeight: 400 }}
        >
          {repeated}
        </span>
        <span
          className="text-sm text-[#4a6080] tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-figtree)', fontWeight: 400 }}
        >
          {repeated}
        </span>
      </div>
    </div>
  )
}
