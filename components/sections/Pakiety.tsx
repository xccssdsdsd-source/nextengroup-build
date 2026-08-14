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
      'Link, który wygrywa rozmowę o wyłączność',
      'Oferta, realizacje, opinie, FAQ, kontakt',
      'Zapytania lądują w Twojej skrzynce',
      'Czyta się na telefonie klienta w sekundę',
      'Widoczność w Google i w odpowiedziach AI',
      '30 dni wsparcia po publikacji',
    ],
    featured: false,
  },
  {
    name: 'Agent z obsługą 24/7',
    price: '2299 zł',
    for: 'Agent, do którego dzwonią po godzinach',
    features: [
      'Wszystko z pakietu obok',
      'Agent AI odpowiada, kiedy Ty śpisz',
      'Pyta o budżet i termin — dostajesz gotowy lead',
      'Klient dostaje potwierdzenie od razu',
      'Ty dostajesz powiadomienie w tej samej chwili',
      'Klient sam rezerwuje termin prezentacji',
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
      'Wszystko z pakietów obok',
      'Pełna strona z kilkoma podstronami',
      'Panel ofert po polsku — dodajesz sam, w minutę',
      'Nie płacisz nikomu za zmianę ceny w ofercie',
      'Blog, który pracuje na Twoją widoczność',
      'Aktualizujemy wiedzę agenta AI',
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
          W każdym pakiecie: szybkość, bezpieczeństwo, wersja mobilna i techniczne podstawy SEO
          oraz GEO. Nie gwarantujemy konkretnej pozycji w Google.
        </p>
      </div>
    </section>
  )
}
