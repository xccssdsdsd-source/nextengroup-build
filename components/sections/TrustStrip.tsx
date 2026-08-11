import { PiClockCountdownBold, PiCoinBold, PiGaugeBold, PiLightningBold } from 'react-icons/pi'

const stats = [
  { icon: PiClockCountdownBold, value: '24h', final: 24, suffix: 'h', label: 'Pierwsza wizualizacja', note: 'od zebrania materiałów' },
  { icon: PiLightningBold, value: '72h', final: 72, suffix: 'h', label: 'Najszybsze wdrożenie', note: 'PM Apartments, realnie' },
  { icon: PiGaugeBold, value: '96+', final: 96, suffix: '+', label: 'Lighthouse wydajność', note: 'na każdej realizacji' },
  { icon: PiCoinBold, value: '0 zł', final: null, suffix: '', label: 'Zanim zaakceptujesz', note: 'bez zaliczki, bez ryzyka' },
]

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Kluczowe liczby">
      <div className="container">
        <dl className="trust-strip__grid" data-stagger-group>
          {stats.map((s) => (
            <div key={s.label} className="trust-strip__item">
              {s.final !== null ? (
                <dt className="trust-strip__value tnum" data-counter-final={s.final} data-counter-suffix={s.suffix}>{s.value}</dt>
              ) : (
                <dt className="trust-strip__value tnum">{s.value}</dt>
              )}
              <dd className="trust-strip__label">
                <span className="trust-strip__row">
                  <s.icon size={14} className="trust-strip__icon" aria-hidden="true" />
                  {s.label}
                </span>
                <span className="trust-strip__note">{s.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
