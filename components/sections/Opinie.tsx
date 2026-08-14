import Image from 'next/image'

const reviews = [
  {
    quote: 'Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.',
    name: 'Patryk Zacharek',
    role: 'Właściciel, PM Apartments',
    photo: '/owner-pm-apartments.webp',
    case: 'PM Apartments, wdrożone w 72h',
  },
  {
    quote: 'Z pełnym przekonaniem polecam współpracę z Getbuild.pl. Cały proces przebiegał sprawnie, komunikacja była na bardzo wysokim poziomie, a wszelkie uwagi były szybko wdrażane. Efekt końcowy spełnił moje oczekiwania zarówno pod względem estetyki, jak i funkcjonalności.',
    name: 'Magdalena Sioła',
    role: 'MS Design Studio',
    photo: '/owner-msdesignstudio.webp',
    case: 'MS Design Studio, wdrożone w 24h',
  },
]

export default function Opinie() {
  return (
    <section id="opinie" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Podpisane imieniem, nazwiskiem i <span className="serif-accent">firmą</span></h2>
        </div>

        <div className="reviews" data-stagger-group>
          {reviews.map((r) => (
            <figure key={r.name} className="card testimonial-card review" data-anime-card>
              <blockquote className="review__quote">
                <span className="serif-accent review__mark" aria-hidden="true">„</span>
                <span className="review__quote-text">{r.quote}</span>
              </blockquote>
              <figcaption className="review__by">
                <Image src={r.photo} alt="" width={44} height={44} className="review__avatar" />
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </div>
                <a href="#portfolio" className="review__case">{r.case}</a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
