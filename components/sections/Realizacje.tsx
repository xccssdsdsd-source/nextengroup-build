import Image from 'next/image'
import { PiArrowUpRightBold } from 'react-icons/pi'

const lead = {
  name: 'PM Apartments',
  tagline: 'Wykończenia pod klucz · Wrocław',
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
}

const others = [
  { name: 'MS Design Studio', tagline: 'Wizualizacje 3D wnętrz i architektury', href: 'https://msdesignstudio.pl/', preview: '/portfolio/msdesignstudio-preview.webp', width: 1440, height: 900, time: '24 godziny', best: 'Lighthouse 97' },
  { name: 'Dorimari', tagline: 'Wnętrza i wyposażenie', href: 'https://dorimari.pl/', preview: '/portfolio/dorimari-preview.webp', width: 1849, height: 929, time: 'Przebudowa', best: 'Lighthouse 97' },
  { name: 'Chodkiewicza 2', tagline: 'Apartament i lokal użytkowy, Sieradz', href: 'https://chodkiewicza2.pl/', preview: '/portfolio/chodkiewicza2-preview.webp', width: 1440, height: 900, time: 'Tydzień', best: 'Lighthouse 97' },
]

export default function Realizacje() {
  return (
    <section id="portfolio" className="section-shell defer-paint">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Nasze realizacje</h2>
        </div>

        <a href={lead.href} target="_blank" rel="noopener noreferrer" className="case" data-fade-in>
          <div className="case__media" data-parallax-media>
            <Image src={lead.preview} alt={`Strona ${lead.name}`} width={lead.width} height={lead.height} sizes="(max-width: 900px) 100vw, 640px" className="case__img" />
          </div>
          <div className="case__body">
            <div className="case__head">
              <div>
                <h3 className="t-h3">{lead.name}</h3>
                <p className="t-small">{lead.tagline}</p>
              </div>
              <span className="chip">Wdrożone w {lead.time}</span>
            </div>
            <dl className="case__scores">
              {lead.scores.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd className="tnum">{s.v}</dd>
                </div>
              ))}
            </dl>
            <div className="case__owner">
              <Image src={lead.owner.photo} alt="" width={40} height={40} className="case__avatar" />
              <div>
                <strong>{lead.owner.name}</strong>
                <span>{lead.owner.role}</span>
              </div>
              <span className="link-arrow case__link">
                Zobacz stronę <PiArrowUpRightBold size={16} aria-hidden="true" />
              </span>
            </div>
          </div>
        </a>

        <div className="cases-row" data-stagger-group>
          {others.map((o) => (
            <a key={o.name} href={o.href} target="_blank" rel="noopener noreferrer" className="card card--interactive case-mini" data-anime-card>
              <Image src={o.preview} alt={`Strona ${o.name}`} width={o.width} height={o.height} sizes="(max-width: 900px) 100vw, 380px" className="case-mini__img" />
              <div className="case-mini__body">
                <h3 className="case-mini__name">{o.name}</h3>
                <p className="t-small">{o.tagline}</p>
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
