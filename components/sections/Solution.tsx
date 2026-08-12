import PlayInView from '@/components/ui/PlayInView'
import { CatalogMockup, ChatMockup, FormMockup, PanelMockup } from '@/components/ui/SiteMockups'

const cards = [
  {
    span: 'wide',
    label: 'Panel ofert',
    title: 'Dodajesz ofertę sam',
    line: 'Trzy minuty. Bez programisty i bez czekania.',
    visual: <PanelMockup />,
  },
  {
    span: 'narrow',
    label: 'Agent AI',
    title: 'Odpowiada, gdy Ty śpisz',
    line: 'Zna Twoje oferty. Umawia prezentacje o 22:00.',
    visual: <ChatMockup />,
  },
  {
    span: 'wide',
    label: 'Katalog z filtrami',
    title: 'Klient znajduje swoje w pięć sekund',
    line: 'Filtruje po typie, cenie i dzielnicy.',
    visual: <CatalogMockup />,
  },
  {
    span: 'narrow',
    label: 'Formularz',
    title: 'Żadne zapytanie nie ginie',
    line: 'Trafia na Twoją skrzynkę w sekundę.',
    visual: <FormMockup />,
  },
]

export default function Solution() {
  return (
    <section id="uslugi" className="section-shell defer-paint">
      <span className="section-mesh" data-parallax-slow aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Co dostajesz</span>
          <h2 className="section-title">
            Cztery ekrany, które <span className="serif-accent">robią całą robotę</span>
          </h2>
          <p className="section-copy">To nie opis. To Twoja strona w działaniu.</p>
        </div>

        <div className="showcase" data-stagger-group data-reveal-pattern="split">
          {cards.map((c) => (
            <PlayInView key={c.label} className={`card showcase-card showcase-card--${c.span}`}>
              <span className="showcase-visual">{c.visual}</span>
              <span className="showcase-copy">
                <span className="showcase-label">{c.label}</span>
                <h3 className="showcase-title">{c.title}</h3>
                <p className="showcase-line">{c.line}</p>
              </span>
            </PlayInView>
          ))}
        </div>
      </div>
    </section>
  )
}
