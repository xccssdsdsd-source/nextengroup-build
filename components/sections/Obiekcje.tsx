'use client'

import { useState } from 'react'
import { PiPlusBold } from 'react-icons/pi'

const items = [
  {
    q: 'A jeśli wizualizacja mi się nie spodoba?',
    a: 'Nie płacisz i się rozstajemy — nie ma faktury, zaliczki ani zobowiązania. Do momentu, w którym sam powiesz „to jest to", cała praca jest po naszej stronie. Poprawiamy bez limitu w ramach ustalonego zakresu, więc zwykle nie dochodzi do sytuacji, w której rozchodzimy się bez efektu.',
  },
  {
    q: 'Nie mam czasu na kolejny projekt i długie ustalenia.',
    a: 'Potrzebujemy od Ciebie jednej rozmowy na piętnaście minut i materiałów, które i tak masz: zdjęcia ofert, opis siebie, kontakt. Resztę układamy my. Pierwszą wizualizację widzisz w 24 godziny — nie po dwóch tygodniach zbierania wymagań.',
  },
  {
    q: 'Czy dam radę sam dodawać oferty?',
    a: 'Panel jest po polsku i wygląda jak formularz: zdjęcia, cena, metraż, liczba pokoi, status. Jest w pełnym pakiecie za 2997 zł i dostajesz do niego instrukcję. Jeśli coś przestanie być oczywiste, przez okres wsparcia po prostu piszesz do nas.',
  },
  {
    q: 'Mam już oferty na portalu — będę je wpisywał drugi raz?',
    a: 'Dziś tak: oferty dodajesz w panelu. Import z pliku XML albo połączenie z systemem, którego już używasz, jest możliwe, ale wyceniamy je indywidualnie po rozmowie — nie chcemy obiecywać integracji, zanim sprawdzimy, z czym konkretnie pracujesz.',
  },
  {
    q: 'Nie widzę u Was strony żadnego biura nieruchomości.',
    a: 'Bo jej nie mamy i nie będziemy udawać, że jest inaczej. Mamy trzy wdrożenia z sąsiedniej półki: wykończenia pod klucz, wizualizacje 3D i wnętrza. Terminy i wyniki Lighthouse przy każdej z nich są prawdziwe i sprawdzalne. Projekt widoczny na górze tej strony to nasza koncepcja strony dla biura — nie działający serwis klienta.',
  },
  {
    q: 'Co jest po wdrożeniu? Zostanę sam ze stroną?',
    a: 'Masz 30 dni wsparcia przy pakietach 1997 i 2299 zł, a 60 dni przy pełnym. Potem możesz zostać na stałej opiece i hostingu za 29–99 zł miesięcznie — to obejmuje hosting, kopie zapasowe, aktualizacje bezpieczeństwa, drobne poprawki bez limitu zgłoszeń i aktualizację wiedzy agenta AI.',
  },
  {
    q: 'Czy strona wejdzie na pierwsze miejsce w Google?',
    a: 'Nie obiecujemy konkretnej pozycji i uważaj na każdego, kto to robi. Techniczne podstawy SEO są wbudowane w każdy pakiet — struktura, szybkość, dane strukturalne, mapa strony. To warunek konieczny, nie gwarancja. O pozycji decyduje jeszcze konkurencja w Twoim mieście i to, co robisz z treścią.',
  },
  {
    q: 'Ile to naprawdę trwa od początku do końca?',
    a: 'Prosty landing potrafimy wdrożyć od 72 godzin, gdy materiały są gotowe i zakres jest ustalony. Pełny pakiet z panelem ofert to więcej pracy — realny termin ustalamy na rozmowie, bo zależy od liczby podstron i tego, jak szybko wracasz z uwagami.',
  },
]

export default function Obiekcje() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section-shell defer-paint">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">A co jeśli…</span>
          <h2 className="section-title">Osiem pytań, które i tak sobie zadajesz</h2>
          <p className="section-copy">
            Zebraliśmy je z realnych rozmów. Odpowiadamy też tam, gdzie odpowiedź jest
            dla nas niewygodna — bo to jedyny sposób, żeby ta strona była coś warta.
          </p>
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
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq__q-text">
                      <span className="faq__idx tnum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      {it.q}
                    </span>
                    <PiPlusBold size={18} className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-p-${i}`} className="faq__panel" inert={!isOpen}>
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
