import { PiBuildingOfficeBold, PiSquaresFourBold, PiChatCircleTextBold } from 'react-icons/pi'

const pillars = [
  {
    icon: PiBuildingOfficeBold,
    kicker: 'Strona',
    title: 'Miejsce, które sprzedaje Ciebie, zanim spotkasz klienta',
    body: 'Strona zbudowana wokół tego, jak faktycznie pracujesz: Twoje realizacje, Twój sposób prowadzenia transakcji, opinie sprzedających. Sprzedający wchodzi z linku i wie, dlaczego ma zadzwonić właśnie do Ciebie.',
    bullets: ['Własny układ prezentacji nieruchomości', 'Wersja mobilna traktowana jak główna', 'Lighthouse 96+ na każdej realizacji'],
    solves: 'Rozwiązuje problem 01 i 02',
    featured: false,
  },
  {
    icon: PiSquaresFourBold,
    kicker: 'Panel ofert',
    title: 'Dodajesz nieruchomość sam, w kilka minut',
    body: 'Panel po polsku, w pełnym pakiecie. Wrzucasz zdjęcia, wpisujesz cenę i metraż, ustawiasz status. Oferta pojawia się na stronie od razu — bez dzwonienia do kogokolwiek i bez czekania na wolny wieczór programisty.',
    bullets: ['Galeria, cena, metraż, pokoje, rok budowy', 'Statusy: aktywna, rezerwacja, sprzedane', 'Filtry i wyszukiwarka po stronie klienta'],
    solves: 'Rozwiązuje problem 04',
    featured: true,
  },
  {
    icon: PiChatCircleTextBold,
    kicker: 'Agent AI',
    title: 'Odpowiada o 22:00, gdy Ty już nie odbierasz',
    body: 'Zna Twoje oferty i sposób pracy. Odpowiada na pytania o metraż, cenę, rejon i dostępność, a gdy rozmowa robi się poważna — zbiera dane i umawia prezentację w Twoim kalendarzu.',
    bullets: ['Wiedza o Twoich nieruchomościach', 'Kwalifikacja pytającego', 'Umawianie prezentacji w kalendarzu'],
    solves: 'Rozwiązuje problem 03',
    featured: false,
  },
]

export default function Solution() {
  return (
    <section id="uslugi" className="section-shell defer-paint">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Co dostajesz</span>
          <h2 className="section-title">Trzy rzeczy, które razem robią różnicę</h2>
          <p className="section-copy">
            Osobno każda z nich jest przydatna. Razem zamykają całą drogę klienta: od momentu,
            gdy pierwszy raz widzi Twoje nazwisko, do chwili, gdy stoi z Tobą w mieszkaniu.
          </p>
        </div>

        <div className="pillars" data-stagger-group>
          {pillars.map(({ icon: Icon, ...p }, i) => (
            <article
              key={p.kicker}
              className={`card card--interactive pillar${p.featured ? ' pillar--featured' : ''}`}
              data-anime-card
            >
              <span className="card-head">
                <span className="card-head__icon"><Icon size={17} aria-hidden="true" /></span>
                <span className="card-head__label">{p.kicker}</span>
                <span className="card-head__rule" aria-hidden="true" />
                <span className="card-head__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <h3 className="t-h3 pillar__title">{p.title}</h3>
              <p className="t-body pillar__body">{p.body}</p>
              <ul className="pillar__list">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <span className="pillar__solves">{p.solves}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
