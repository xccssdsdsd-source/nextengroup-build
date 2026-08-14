const steps = [
  {
    time: 'Dzień 0',
    title: 'Piętnaście minut rozmowy',
    body: 'Mówisz, jak pracujesz i w jakim rejonie. Bez pytań o kolory i technologię.',
    cost: '0 zł',
  },
  {
    time: 'Do 24 godzin',
    title: 'Widzisz gotową stronę',
    body: 'Nie szkic — prawdziwa strona z Twoimi treściami, na telefonie i na komputerze.',
    cost: '0 zł',
  },
  {
    time: 'Kolejne dni',
    title: 'Poprawiamy, aż będzie Twoja',
    body: 'Tyle razy, ile trzeba. Kończymy, gdy powiesz „tak”.',
    cost: '0 zł',
  },
  {
    time: 'Od 72 godzin',
    title: 'Strona zarabia',
    body: 'Wklejasz dwa rekordy w domenie — resztę robimy my. Dostajesz panel, instrukcję i wsparcie.',
    cost: 'Teraz płacisz',
  },
]

export default function Proces() {
  return (
    <section id="proces" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Cztery kroki</span>
          <h2 className="section-title">
            Płacisz dopiero wtedy, gdy <span className="serif-accent">powiesz „tak”</span>
          </h2>
          <p className="section-copy">Najpierw widzisz efekt. Potem decydujesz.</p>
        </div>

        <ol className="steps" data-stagger-group data-scene data-scene-marks=".step__dot" data-scene-from="0.72">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <div className="step__rail" aria-hidden="true">
                <span className="step__dot" />
              </div>
              <div className="step__body">
                <span className="step-number step__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="step__meta">
                  <span className="chip">{s.time}</span>
                  <span className="chip chip--neutral">{s.cost}</span>
                </div>
                <h3 className="t-h3 step__title">
                  <span className="step__idx tnum">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h3>
                <p className="t-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
