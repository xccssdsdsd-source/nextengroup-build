import Image from 'next/image'
import Stars from '@/components/ui/Stars'

type Review = {
  quote: string
  name: string
  role: string
  case: string
  photo?: string
  // Used only where the client has not sent a photograph. A monogram is
  // honest about that; a stock headshot standing in for a real person is not.
  initials?: string
}

const reviews: Review[] = [
  {
    quote: 'Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.',
    name: 'Patryk Zacharek',
    role: 'Właściciel, PM Apartments',
    photo: '/owner-pm-apartments.webp',
    case: 'Wdrożone w 72h',
  },
  {
    quote: 'Z pełnym przekonaniem polecam współpracę z Getbuild.pl. Cały proces przebiegał sprawnie, komunikacja była na bardzo wysokim poziomie, a wszelkie uwagi były szybko wdrażane. Efekt końcowy spełnił moje oczekiwania zarówno pod względem estetyki, jak i funkcjonalności.',
    name: 'Magdalena Sioła',
    role: 'MS Design Studio',
    photo: '/owner-msdesignstudio.webp',
    case: 'Wdrożone w 24h',
  },
  {
    quote: 'Cały proces przebiegł sprawnie, szybko i bez żadnych problemów. Wszystkie moje uwagi i sugestie były na bieżąco uwzględniane, a w razie potrzeby mogłem liczyć na fachową poradę i pomoc. Bardzo doceniam uczciwość i terminowość — wszystko zostało wykonane tak, jak się umawialiśmy, bez przeciągania terminów.',
    name: 'Robert Sieradz',
    role: 'Właściciel, Chodkiewicza 2',
    initials: 'RS',
    case: 'Wdrożone w tydzień',
  },
]

export default function Opinie() {
  return (
    <section id="opinie" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Podpisane imieniem, nazwiskiem i <span className="serif-accent">firmą</span></h2>
          <p className="section-copy">
            Trzy opinie od klientów, których strony można otworzyć w tej samej zakładce — każda wystawiona po wdrożeniu, żadna nie została napisana przez nas.
          </p>
        </div>

        <div className="reviews" data-stagger-group>
          {reviews.map((r) => (
            <figure key={r.name} className="card testimonial-card review" data-anime-card>
              <div className="review__top">
                <Stars className="review__stars" label="Ocena 5 na 5" />
                <a href="#portfolio" className="review__case">{r.case}</a>
              </div>
              <blockquote className="review__quote">
                <span className="serif-accent review__mark" aria-hidden="true">„</span>
                <span className="review__quote-text">{r.quote}</span>
              </blockquote>
              <figcaption className="review__by">
                {r.photo ? (
                  <Image src={r.photo} alt="" width={44} height={44} className="review__avatar" />
                ) : (
                  <span className="review__avatar review__avatar--mono" aria-hidden="true">{r.initials}</span>
                )}
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
