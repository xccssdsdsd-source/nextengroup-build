const pains = [
  {
    q: 'Sprzedający pyta, dlaczego ma dać wyłączność akurat Tobie.',
    a: 'Wysyłasz link do profilu na portalu — takiego samego, jaki ma trzydziestu innych agentów w mieście. Nic tam nie mówi, dlaczego jesteś lepszym wyborem.',
  },
  {
    q: 'Twoje oferty wyglądają tak samo jak cudze.',
    a: 'Portal narzuca układ, kolejność i miniaturę. Nie masz wpływu na to, jak prezentuje się nieruchomość za 3 miliony — dostaje ten sam kafelek co kawalerka.',
  },
  {
    q: 'Telefon dzwoni po 20:00 z pytaniem o metraż.',
    a: 'Odbierasz przy kolacji albo tracisz kontakt. Te same pytania wracają: cena, piętro, czy jest garaż, czy można obejrzeć w weekend.',
  },
  {
    q: 'Dodanie oferty zajmuje pół wieczoru.',
    a: 'Zdjęcia, opis, parametry — a potem to samo jeszcze raz w innym miejscu. Strona, której nie umiesz sam zaktualizować, przestaje być Twoja.',
  },
  {
    q: 'Poprzednia strona kosztowała i nic nie zmieniła.',
    a: 'Zapłaciłeś z góry, czekałeś miesiąc, dostałeś coś, czego nie chciałeś pokazywać klientom. Drugi raz nie chcesz tak ryzykować.',
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
          <p className="section-copy">
            Nie sprzedajemy stron. Rozwiązujemy pięć konkretnych sytuacji, które kosztują agenta
            prowizję albo wieczór. Każdą z nich rozbieramy niżej na czynniki pierwsze.
          </p>
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
