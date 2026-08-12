const pains = [
  {
    q: 'Sprzedający pyta, czemu akurat Tobie ma dać wyłączność.',
    a: 'Wysyłasz link do profilu, który wygląda jak trzydzieści innych w mieście.',
  },
  {
    q: 'Twoja oferta za 3 miliony ma ten sam kafelek co kawalerka.',
    a: 'Portal narzuca układ, kolejność i miniaturę. Ty nie decydujesz o niczym.',
  },
  {
    q: 'Telefon dzwoni po 20:00 z pytaniem o metraż.',
    a: 'Odbierasz przy kolacji albo tracisz kontakt. I tak w kółko.',
  },
  {
    q: 'Dodanie oferty zajmuje pół wieczoru.',
    a: 'Strona, której nie umiesz sam zaktualizować, przestaje być Twoja.',
  },
  {
    q: 'Poprzednia strona kosztowała i nic nie zmieniła.',
    a: 'Zapłaciłeś z góry, czekałeś miesiąc, dostałeś coś, czego nie pokazujesz klientom.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Zacznijmy od prawdy</span>
          <h2 className="section-title">
            Jeśli choć jedno z tych zdań brzmi <span className="serif-accent">znajomo</span> — reszta tej strony jest dla Ciebie.
          </h2>
          <p className="section-copy">Pięć sytuacji, które kosztują agenta prowizję albo wieczór.</p>
        </div>

        <ol className="pain-list" data-stagger-group>
          {pains.map((p, i) => (
            <li key={p.q} className="pain">
              <span className="pain__num tnum" data-parallax-slow>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="pain__q">{p.q}</h3>
                <p className="pain__a">{p.a}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
