import ChatWidget from '@/components/ChatWidget'

const abilities = [
  { k: '22:14', v: '„Czy ten dom w Orłowie ma garaż i jaka jest cena za metr?"', who: 'klient' },
  { k: 'Natychmiast', v: 'Odpowiada z Twoich danych o ofercie — bez zgadywania.', who: 'agent' },
  { k: 'Po chwili', v: 'Pyta o budżet i termin, zbiera kontakt, proponuje wolny termin z Twojego kalendarza.', who: 'agent' },
  { k: 'Rano', v: 'Masz w skrzynce komplet: kto pytał, o co, i na kiedy umówiona prezentacja.', who: 'ty' },
]

export default function AgentAI() {
  return (
    <section id="agent-ai" className="section-shell section-shell--navy defer-paint">
      <span className="section-mesh section-mesh--navy" data-parallax-slow aria-hidden="true" />
      <div className="container">
        <div className="ai-grid">
          <div className="ai-copy">
            <span className="section-kicker">
              Agent AI <span className="counter-247 tnum">24/7</span>
            </span>
            <h2 className="section-title">
              Pytania nie przychodzą w godzinach pracy. <span className="serif-accent">Odpowiedzi mogą.</span>
            </h2>
            <p className="section-copy">
              To nie jest chatbot z gotowymi formułkami. Zna Twoje nieruchomości, Twój rejon
              i Twój sposób pracy — a kiedy rozmowa robi się konkretna, przekazuje ją Tobie
              razem z kompletem informacji.
            </p>

            <ol
              className="ai-timeline"
              data-stagger-group
              data-reveal-pattern="soft"
              data-scene
              data-scene-marks=".ai-step__dot"
              data-scene-from="0.75"
            >
              {abilities.map((a) => (
                <li key={a.k} className={`ai-step ai-step--${a.who}`}>
                  <span className="ai-step__dot" aria-hidden="true" />
                  <span className="ai-step__k tnum">{a.k}</span>
                  <span className="ai-step__v">{a.v}</span>
                </li>
              ))}
            </ol>

            <p className="ai-note">
              Agent AI jest w każdym pakiecie. Poniżej działa ten sam mechanizm —
              tylko nauczony naszej oferty zamiast Twojej. Zadaj mu pytanie.
            </p>
          </div>

          <div className="ai-chat">
            <ChatWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
