import InteractiveSiteShowcase from '@/components/ui/InteractiveSiteShowcase'

export default function Solution() {
  return (
    <section id="uslugi" className="section-shell section-shell--studio defer-paint">
      <span className="section-mesh" data-parallax-slow aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Co dostajesz</span>
          <h2 className="section-title">
            Co tworzymy na <span className="serif-accent">Twojej stronie internetowej</span>
          </h2>
          <p className="section-copy">Kliknij i sprawdź każdy element tak, jak zrobi to Twój klient.</p>
        </div>
        <InteractiveSiteShowcase />
      </div>
    </section>
  )
}
