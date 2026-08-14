import InteractiveSiteShowcase from '@/components/ui/InteractiveSiteShowcase'

export default function Solution() {
  return (
    <section id="uslugi" className="section-shell section-shell--studio defer-paint">
      <span className="section-mesh" data-parallax-slow aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            Dodajesz ofertę. Klient pyta. <span className="serif-accent">Masz kontakt.</span>
          </h2>
          <p className="section-copy">Kliknij i przejdź tę drogę tak, jak przejdzie ją Twój klient.</p>
        </div>
        <InteractiveSiteShowcase />
      </div>
    </section>
  )
}
