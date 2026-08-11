'use client'

import { PiCheckBold } from 'react-icons/pi'
import type { MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const packages = [
  {
    name: 'Wizytówka agenta',
    price: '1997 zł',
    for: 'Agent indywidualny, jedna główna usługa',
    features: [
      'Struktura oparta na tym, jak pracujesz',
      'Oferta, realizacje, opinie, FAQ, kontakt',
      'Formularz z powiadomieniem',
      'Wersja mobilna i szybkie ładowanie',
      'Analityka',
      '30 dni wsparcia po publikacji',
    ],
    featured: false,
  },
  {
    name: 'Agent z obsługą 24/7',
    price: '2299 zł',
    for: 'Agent, do którego dzwonią po godzinach',
    features: [
      'Wszystko z pakietu niżej',
      'Agent AI z wiedzą o Twoim biurze',
      'Rozbudowany formularz kwalifikujący',
      'Automatyczne potwierdzenie dla klienta',
      'Natychmiastowe powiadomienie o zapytaniu',
      'Rezerwacja terminu prezentacji',
      '30 dni wsparcia po publikacji',
    ],
    featured: true,
    badge: 'Najczęściej wybierany',
  },
  {
    name: 'Biuro z panelem ofert',
    price: '2997 zł',
    for: 'Biuro nieruchomości i agent z własną bazą',
    features: [
      'Wszystko z pakietu obok',
      'Pełna strona z kilkoma podstronami',
      'Panel ofert nieruchomości po polsku',
      'Samodzielna edycja ofert i realizacji',
      'Blog i baza wiedzy',
      'Aktualizowanie wiedzy agenta AI',
      '60 dni wsparcia po publikacji',
    ],
    featured: false,
  },
]

export default function Pakiety() {
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('kontakt')
  }

  return (
    <section id="pakiety" className="section-shell section-shell--tint defer-paint">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="section-kicker">Ile to kosztuje</span>
          <h2 className="section-title">Cena jest na stronie, bo nie mamy jej po co ukrywać</h2>
          <p className="section-copy">
            Jedna płatność, bez abonamentu za samą stronę. Po okresie wsparcia możesz zostać
            na stałej opiece i hostingu za 29–99 zł miesięcznie — tak długo, jak jej potrzebujesz.
          </p>
        </div>

        <div className="pkgs" data-stagger-group>
          {packages.map((p) => (
            <article key={p.name} className={`pkg-card pkg${p.featured ? ' pkg-card--featured' : ''}`} data-anime-card>
              {p.badge ? <span className="pkg__badge">{p.badge}</span> : null}
              <h3 className="pkg__name">{p.name}</h3>
              <p className="pkg__for">{p.for}</p>
              <p className="pkg__price tnum">{p.price}<span>jednorazowo</span></p>
              <a href="#kontakt" onClick={go} className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'} pkg__cta`}>
                Zobacz wizualizację
              </a>
              <ul className="pkg__list">
                {p.features.map((f) => (
                  <li key={f}><PiCheckBold size={15} aria-hidden="true" />{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="pkgs__note">
          W każdym pakiecie: analiza Twojej oferty, responsywność, szybkość, bezpieczeństwo
          i techniczne podstawy SEO. Nie gwarantujemy konkretnej pozycji w Google.
        </p>
      </div>
    </section>
  )
}
