import Image from 'next/image'
import { PiArrowUpRightBold } from 'react-icons/pi'

type Owner = { name: string; role: string; photo: string }

type Lead = {
  name: string
  tagline: string
  blurb: string
  href: string
  preview: string
  width: number
  height: number
  time: string
  scores: { label: string; v: number }[]
  owner?: Owner
}

// The two property cases lead the section: both sell real estate, which is the
// work this site is pitching for. The studio and the tour operator follow at
// half the weight — they are proof of range, not the argument.
const leads: Lead[] = [
  {
    name: 'Chodkiewicza 2',
    tagline: 'Apartament i lokal użytkowy · Sieradz',
    blurb: 'Właściciel sprzedaje apartament 105 m² i wynajmuje lokal użytkowy 86 m² w jednym budynku na Osiedlu Hetmańskim. Zamiast ogłoszenia na portalu ma stronę, na której cena, metraż, rzuty, mapa i formularz na obejrzenie są widoczne bez klikania.',
    href: 'https://chodkiewicza2.pl/',
    preview: '/portfolio/chodkiewicza2-preview.webp',
    width: 1440,
    height: 900,
    time: 'tydzień',
    scores: [
      { label: 'Wydajność', v: 97 },
      { label: 'Dostępność', v: 96 },
      { label: 'Dobre praktyki', v: 100 },
      { label: 'SEO', v: 92 },
    ],
  },
  {
    name: 'PM Apartments',
    tagline: 'Wykończenia pod klucz · Wrocław',
    blurb: 'Firma wykańcza mieszkania pod klucz we Wrocławiu. Poprzednia strona nie była zoptymalizowana pod wyszukiwarki i słabo działała na telefonie — nowa prowadzi klienta przez zakres usług, galerię wykończonych mieszkań i formularz kontaktowy.',
    href: 'https://pm-apartments.pl/',
    preview: '/portfolio/pm-apartments-preview.webp',
    width: 1852,
    height: 916,
    time: '72 godziny',
    scores: [
      { label: 'Wydajność', v: 96 },
      { label: 'Dostępność', v: 93 },
      { label: 'Dobre praktyki', v: 100 },
      { label: 'SEO', v: 100 },
    ],
    owner: { name: 'Patryk Zacharek', role: 'Właściciel, PM Apartments', photo: '/owner-pm-apartments.webp' },
  },
]

const others = [
  {
    name: 'MS Design Studio',
    tagline: 'Wizualizacje 3D wnętrz i architektury',
    blurb: 'Pracownia robi wizualizacje wnętrz i renderingi architektoniczne. Portfolio jest tu produktem, więc strona schodzi zdjęciom z drogi.',
    href: 'https://msdesignstudio.pl/',
    preview: '/portfolio/msdesignstudio-preview.webp',
    width: 1440,
    height: 900,
    time: '24 godziny',
    best: 'Lighthouse 97',
  },
  {
    name: 'Dorimari',
    tagline: 'Autorskie wycieczki po Sycylii',
    blurb: 'Klient prowadzi autorskie wyjazdy po Sycylii. Stara strona nie oddawała charakteru marki — przebudowaliśmy ją wokół zdjęć z tras, opisów wycieczek i harmonogramu.',
    href: 'https://dorimari.pl/',
    preview: '/portfolio/dorimari-preview.webp',
    width: 1849,
    height: 929,
    time: 'Przebudowa',
    best: 'Lighthouse 97',
  },
]

export default function Realizacje() {
  return (
    <section id="portfolio" className="section-shell defer-paint">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Nasze realizacje</h2>
        </div>

        <div className="cases-lead" data-stagger-group>
          {leads.map((lead) => (
            <a key={lead.name} href={lead.href} target="_blank" rel="noopener noreferrer" className="case" data-fade-in>
              <div className="case__media" data-parallax-media>
                <Image src={lead.preview} alt={`Strona ${lead.name}`} width={lead.width} height={lead.height} sizes="(max-width: 900px) 100vw, 620px" className="case__img" />
              </div>
              <div className="case__body">
                <div className="case__head">
                  <div>
                    <h3 className="t-h3">{lead.name}</h3>
                    <p className="t-small">{lead.tagline}</p>
                  </div>
                  <span className="chip">Wdrożone w {lead.time}</span>
                </div>
                <p className="case__blurb">{lead.blurb}</p>
                <dl className="case__scores">
                  {lead.scores.map((s) => (
                    <div key={s.label}>
                      <dt>{s.label}</dt>
                      <dd className="tnum">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="case__owner">
                  {lead.owner && (
                    <>
                      <Image src={lead.owner.photo} alt="" width={40} height={40} className="case__avatar" />
                      <div>
                        <strong>{lead.owner.name}</strong>
                        <span>{lead.owner.role}</span>
                      </div>
                    </>
                  )}
                  <span className="link-arrow case__link">
                    Zobacz stronę <PiArrowUpRightBold size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="cases-row" data-stagger-group>
          {others.map((o) => (
            <a key={o.name} href={o.href} target="_blank" rel="noopener noreferrer" className="card card--interactive case-mini" data-anime-card>
              <Image src={o.preview} alt={`Strona ${o.name}`} width={o.width} height={o.height} sizes="(max-width: 900px) 100vw, 480px" className="case-mini__img" />
              <div className="case-mini__body">
                <h3 className="case-mini__name">{o.name}</h3>
                <p className="t-small">{o.tagline}</p>
                <p className="case-mini__blurb">{o.blurb}</p>
                <div className="case-mini__meta">
                  <span className="chip chip--neutral">{o.time}</span>
                  <span className="chip chip--neutral">{o.best}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
