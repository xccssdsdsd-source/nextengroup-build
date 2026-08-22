import Image from 'next/image'
import Stars from '@/components/ui/Stars'

type Review = {
  // One entry per paragraph, printed in full. A testimonial that has been
  // trimmed to fit a card is no longer the sentence the client signed.
  quote: string[]
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
    quote: [
      'Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.',
    ],
    name: 'Patryk Zacharek',
    role: 'Właściciel, PM Apartments',
    photo: '/owner-pm-apartments.webp',
    case: 'Wdrożone w 72h',
  },
  {
    quote: [
      'Z pełnym przekonaniem polecam współpracę z Getbuild.pl. Firma stworzyła dla mnie stronę internetową MS Design Studio. Cały proces przebiegał sprawnie, komunikacja była na bardzo wysokim poziomie, a wszelkie uwagi były szybko wdrażane. Efekt końcowy spełnił moje oczekiwania zarówno pod względem estetyki, jak i funkcjonalności.',
    ],
    name: 'Magdalena Sioła',
    role: 'MS Design Studio',
    photo: '/owner-msdesignstudio.webp',
    case: 'Wdrożone w 24h',
  },
  {
    quote: [
      'Z pełnym przekonaniem polecam współpracę z twórcą mojej strony internetowej. Cały proces przebiegł naprawdę sprawnie, szybko i bez żadnych problemów. Od samego początku bardzo dobry kontakt, konkretne podejście do klienta i przede wszystkim pełne zaangażowanie w realizację projektu.',
      'Strona została wykonana rzetelnie, fachowo i zgodnie z wcześniejszymi ustaleniami. Wszystkie moje uwagi i sugestie były na bieżąco uwzględniane, a w razie potrzeby mogłem liczyć na fachową poradę i pomoc. Widać duże doświadczenie, znajomość tematu i dbałość o każdy szczegół.',
      'Bardzo doceniam również uczciwość i terminowość. Wszystko zostało wykonane tak, jak się umawialiśmy, bez niepotrzebnych komplikacji i przeciągania terminów. Współpraca była naprawdę przyjemna i profesjonalna, co nie zawsze jest oczywiste przy tego typu projektach.',
      'Jestem bardzo zadowolony z efektu końcowego i z czystym sumieniem mogę polecić tę osobę każdemu, kto szuka kogoś rzetelnego, uczciwego, fachowego i zaangażowanego w swoją pracę. Jeśli będę w przyszłości potrzebował kolejnych zmian lub nowych rozwiązań, na pewno ponownie skorzystam z tej współpracy. Polecam z pełnym przekonaniem!',
    ],
    name: 'Robert',
    role: 'Właściciel, Chodkiewicza 2',
    initials: 'R',
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
            Trzy opinie od klientów, których strony można otworzyć w tej samej zakładce — każda w całości, tak jak została wystawiona po wdrożeniu.
          </p>
        </div>

        {/* Rows, not a three-card row. The reviews are different lengths and
            each is printed whole, so a grid of equal-height cards would either
            stretch the short ones or clip the long one. */}
        <div className="reviews" data-stagger-group>
          {reviews.map((r) => (
            <figure key={r.name} className="card testimonial-card review" data-anime-card>
              <figcaption className="review__by">
                <span className="review__id">
                  {r.photo ? (
                    <Image src={r.photo} alt="" width={44} height={44} className="review__avatar" />
                  ) : (
                    <span className="review__avatar review__avatar--mono" aria-hidden="true">{r.initials}</span>
                  )}
                  <span className="review__name">
                    <strong>{r.name}</strong>
                    <span>{r.role}</span>
                  </span>
                </span>
                <Stars className="review__stars" label="Ocena 5 na 5" />
                <a href="#portfolio" className="review__case">{r.case}</a>
              </figcaption>

              <blockquote className="review__quote">
                <span className="serif-accent review__mark" aria-hidden="true">„</span>
                {r.quote.map((para) => (
                  <p key={para} className="review__para">{para}</p>
                ))}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
