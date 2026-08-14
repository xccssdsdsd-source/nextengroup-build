const pains = [
  {
    q: 'Klient pyta ChatGPT o agenta w Twoim mieście. Nie ma Cię w odpowiedzi.',
    a: 'Modele językowe cytują strony, nie profile na portalu. Nie masz strony — nie istniejesz w kanale, z którego Twoja konkurencja bierze już klientów.',
  },
  {
    q: 'Sprzedający pyta, czemu wyłączność ma dać akurat Tobie.',
    a: 'Wysyłasz link do profilu, który wygląda jak trzydzieści innych w mieście.',
  },
  {
    q: 'Twoja oferta za 3 miliony ma ten sam kafelek co kawalerka.',
    a: 'Portal narzuca układ, kolejność i miniaturę. Prowizja jest Twoja, decyzje nie.',
  },
  {
    q: 'Telefon dzwoni po 20:00 z pytaniem o metraż.',
    a: 'Odbierasz przy kolacji albo oddajesz klienta temu, kto odebrał.',
  },
  {
    q: 'Poprzednia strona kosztowała i nic nie zmieniła.',
    a: 'Zapłaciłeś z góry, czekałeś miesiąc i dziś nie pokazujesz jej klientom.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            Każde z tych zdań kosztuje Cię <span className="serif-accent">prowizję</span>
          </h2>
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
