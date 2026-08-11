const steps = [
  {
    time: 'Dzień 0',
    title: 'Rozmowa, nie brief',
    body: 'Piętnaście minut o tym, jak pracujesz, w jakim rejonie działasz i co Cię dziś najbardziej kosztuje. Nie pytamy o kolory ani o technologię — od tego jesteśmy my.',
    cost: 'Bezpłatnie',
  },
  {
    time: 'Do 24 godzin',
    title: 'Widzisz pierwszą wizualizację',
    body: 'Nie moodboard i nie szkic — realny kierunek strony z Twoimi treściami, do obejrzenia na telefonie i na komputerze. Każdy z trzech dotychczasowych klientów dostał ją w tym czasie.',
    cost: 'Nadal 0 zł',
  },
  {
    time: 'Kolejne dni',
    title: 'Poprawiamy do skutku',
    body: 'Poprawki bez limitu w ramach ustalonego zakresu. Zmieniamy tyle razy, ile trzeba, żebyś chciał wysłać ten link sprzedającemu. Dopiero Twoja akceptacja kończy ten etap.',
    cost: 'Wciąż 0 zł',
  },
  {
    time: 'Od 72 godzin',
    title: 'Publikacja — Twoja rola to dwa rekordy',
    body: 'Cała Twoja część techniczna to wklejenie dwóch rekordów w panelu domeny i podpisanie umowy. Hosting, certyfikat, przeniesienie treści i publikację bierzemy na siebie. Prosty landing potrafimy wdrożyć nawet od 72 godzin. Dostajesz panel, instrukcję i wsparcie — 30 dni przy mniejszych pakietach, 60 dni przy pełnym.',
    cost: 'Teraz płacisz',
  },
]

export default function Proces() {
  return (
    <section id="proces" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Jak to robimy</span>
          <h2 className="section-title">
            Płacisz dopiero wtedy, gdy <span className="serif-accent">powiesz „tak"</span>
          </h2>
          <p className="section-copy">
            Kolejność jest odwrócona w stosunku do tego, co znasz. Najpierw widzisz efekt,
            potem decydujesz. Do momentu akceptacji nie wystawiamy żadnej faktury.
          </p>
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
