const items = [
  'Strony premium',
  'Automatyzacje AI',
  'Leady i CRM',
  'Copy sprzedażowe',
  'Analityka i optymalizacja',
]

export default function Ticker() {
  const repeated = [...items, ...items].join('   ·   ')

  return (
    <section className="overflow-hidden bg-[#0A0A0A] py-4 mt-0 md:mt-2 lg:mt-4" aria-label="Zakres usług">
      <div className="ticker-wrap">
        <div className="ticker-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
          <span className="px-6 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {repeated}
          </span>
          <span aria-hidden="true" className="px-6 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {repeated}
          </span>
        </div>
      </div>
    </section>
  )
}
