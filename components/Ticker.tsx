const items = [
  'Landing pages',
  'Automatyzacje AI',
  'Leady i CRM',
  'Strony premium',
  'Copy sprzedażowe',
  'Analityka i optymalizacja',
]

export default function Ticker() {
  const repeated = [...items, ...items].join('   ·   ')

  return (
    <section className="overflow-hidden border-y border-black/[0.06] bg-[#F8FAFC] py-4" aria-label="Zakres usług">
      <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
        <span className="px-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9CA3AF]">
          {repeated}
        </span>
        <span aria-hidden="true" className="px-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9CA3AF]">
          {repeated}
        </span>
      </div>
    </section>
  )
}
