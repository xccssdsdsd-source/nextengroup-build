const items = [
  'Landing pages',
  'Automatyzacje AI',
  'Leady i CRM',
  'Strony premium',
  'Copy sprzedażowe',
  'Analityka i optymalizacja',
]

export default function Ticker() {
  const repeated = [...items, ...items].join('   •   ')

  return (
    <section className="overflow-hidden border-y border-white/6 bg-white/[0.02] py-4" aria-label="Zakres usług">
      <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
        <span className="px-4 text-[11px] uppercase tracking-[0.28em] text-[#7f98b8] sm:text-xs">
          {repeated}
        </span>
        <span aria-hidden="true" className="px-4 text-[11px] uppercase tracking-[0.28em] text-[#7f98b8] sm:text-xs">
          {repeated}
        </span>
      </div>
    </section>
  )
}
