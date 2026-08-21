'use client'

import { PiCheckBold } from 'react-icons/pi'
import type { MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const packages = [
  {
    name: 'Landing page agenta',
    pre: 'około',
    price: '1997 zł',
    for: 'Agent indywidualny, jedna główna usługa',
    features: [
      'Link, który wygrywa rozmowę o wyłączność',
      'Oferta, realizacje, opinie, FAQ, kontakt',
      'Agent AI odpowiada, kiedy Ty śpisz',
      'Pyta o budżet i termin — dostajesz gotowy lead',
      'Klient sam rezerwuje termin prezentacji',
      'Widoczność w Google i w odpowiedziach AI',
      '30 dni wsparcia po publikacji',
    ],
    featured: false,
  },
  {
    name: 'Biuro z panelem ofert',
    price: '2997 zł',
    for: 'Biuro lub agent z własną bazą ofert',
    features: [
      'Wszystko z pakietu obok',
      'Pełna strona z kilkoma podstronami',
      'Panel ofert po polsku — dodajesz sam, w minutę',
      'Nie płacisz nikomu za zmianę ceny w ofercie',
      'Blog, który pracuje na Twoją widoczność',
      'Agent AI zna Twoje aktualne oferty',
      '60 dni wsparcia po publikacji',
    ],
    featured: true,
    badge: 'Najczęściej wybierany',
  },
  {
    name: 'Deweloper i biuro',
    price: '4997 zł',
    for: 'Deweloper i biuro nieruchomości',
    features: [
      'Wszystko z pakietów obok',
      'Strona inwestycji — mieszkania dodajesz w tym samym panelu',
      'Potwierdzenie zgłoszenia leci do klienta automatycznie',
      'Powiadomienie o gorącym leadzie — do Ciebie i do zespołu',
      'Przypomnienia o prezentacjach idą bez Twojego udziału',
      'Prośba o opinię wychodzi sama po transakcji',
      'Zakres automatyzacji i harmonogram ustalamy przed startem',
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
        <div className="section-head">
          <h2 className="section-title">
            Cena jest na stronie, bo nie mamy jej <span className="serif-accent">po co ukrywać</span>
          </h2>
          <p className="section-copy">
            Jedna płatność, bez abonamentu za samą stronę. Opieka i hosting później — 29–99 zł
            miesięcznie, tylko jeśli chcesz.
          </p>
        </div>

        <div className="pkgs" data-stagger-group>
          {packages.map((p) => (
            <article key={p.name} className={`pkg-card pkg${p.featured ? ' pkg-card--featured' : ''}`} data-anime-card>
              {p.badge ? <span className="pkg__badge">{p.badge}</span> : null}
              <h3 className="pkg__name">{p.name}</h3>
              <p className="pkg__for">{p.for}</p>
              <p className="pkg__price tnum">
                {p.pre ? <span className="pkg__price-pre">{p.pre}</span> : null}
                {p.price}
                <span>jednorazowo</span>
              </p>
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
          W każdym pakiecie: szybkość, bezpieczeństwo, wersja mobilna i techniczne podstawy SEO
          oraz GEO. Nie gwarantujemy konkretnej pozycji w Google.
        </p>
      </div>
    </section>
  )
}
