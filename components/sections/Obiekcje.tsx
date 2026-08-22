'use client'

import { useState } from 'react'
import { PiPlusBold } from 'react-icons/pi'
import { requestScrollFlush } from '@/lib/scrollTicker'

const items = [
  {
    q: 'A jeśli wizualizacja mi się nie spodoba?',
    a: 'Nie płacisz i się rozstajemy. Bez faktury, bez zaliczki, bez zobowiązania. Do Twojego „tak” całe ryzyko jest po naszej stronie.',
  },
  {
    q: 'Czy moja strona będzie widoczna w ChatGPT i Perplexity?',
    a: 'Budujemy ją tak, żeby modele językowe miały co zacytować: czysty kod, dane strukturalne, jasna odpowiedź na pytanie klienta w treści. To ten sam fundament, który pozycjonuje Cię w Google — dziś pracuje w dwóch miejscach naraz. Pozycji nie gwarantujemy nigdzie.',
  },
  {
    q: 'Nie mam czasu na kolejny projekt.',
    a: 'Potrzebujemy piętnastu minut rozmowy i materiałów, które już masz. Wizualizację widzisz w 24 godziny.',
  },
  {
    q: 'Czy dam radę sam dodawać oferty?',
    a: 'Panel jest po polsku i wygląda jak formularz: zdjęcia, cena, metraż, pokoje, status. Dostajesz instrukcję, a w ramach opieki po prostu do nas piszesz.',
  },
  {
    q: 'Mam już oferty na portalu — będę je wpisywał drugi raz?',
    a: 'Na start tak. Import XML albo połączenie z Twoim systemem wyceniamy po rozmowie — nie obiecujemy integracji, zanim sprawdzimy, z czym pracujesz.',
  },
  {
    q: 'Zostanę sam ze stroną po wdrożeniu?',
    a: 'Nie. Opieka i hosting kosztują 30–99 zł miesięcznie od dnia publikacji, zależnie od konfiguracji strony: hosting, kopie, aktualizacje bezpieczeństwa i drobne poprawki bez limitu zgłoszeń.',
  },
  {
    q: 'Ile to trwa od początku do końca?',
    a: 'Landing od 72 godzin, gdy materiały są gotowe. Pełny pakiet z panelem — termin ustalamy na rozmowie, bo zależy od liczby podstron.',
  },
]

export default function Obiekcje() {
  const [open, setOpen] = useState<number | null>(0)

  // Opening or closing an answer moves every row below it without a scroll
  // event ever firing, which is how rows that had not been revealed yet ended
  // up stranded at opacity 0 — present, clickable and invisible. Poking the
  // shared ticker re-runs the reveal sweep against the new layout.
  const toggle = (i: number) => {
    setOpen((current) => (current === i ? null : i))
    requestScrollFlush()
  }

  return (
    <section id="faq" className="section-shell defer-paint">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Pytania, które i tak sobie <span className="serif-accent">zadajesz</span></h2>
        </div>

        <div className="faq" data-stagger-group data-reveal-pattern="soft">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={it.q} className="faq__item" data-open={isOpen ? 'true' : 'false'}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="faq__q-text">
                      <span className="faq__idx tnum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      {it.q}
                    </span>
                    <PiPlusBold size={18} className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                {/* React 18 drops a boolean `inert` with a warning instead of
                    writing it, so the collapsed answer was still exposed to
                    assistive tech. `visibility: hidden` in the stylesheet does
                    the same job, transitions with the panel and needs no
                    attribute at all. */}
                <div id={`faq-p-${i}`} className="faq__panel">
                  <div className="faq__panel-inner">
                    <p className="t-body">{it.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
