import { PiArrowsHorizontalBold, PiCheckBold, PiMinusBold, PiQuestionBold, PiXBold } from 'react-icons/pi'

type MarkCell = { kind: 'mark'; v: 'yes' | 'no' | 'partial' | 'depends' }
type TextCell = { kind: 'text'; v: string }
type Cell = MarkCell | TextCell

const mark = (v: MarkCell['v']): MarkCell => ({ kind: 'mark', v })
const text = (v: string): TextCell => ({ kind: 'text', v })

const cols = ['Getbuild', 'Kreator (Wix, WordPress)', 'Generator AI (Lovable, v0)', 'Agencja', 'Freelancer'] as const

// `win` marks which column(s) actually earn the highlighted tint for that row.
// Every row defaults to Getbuild — except the one row where that would be
// dishonest: on price, the kreator and the generator AI genuinely are cheaper,
// and saying otherwise is exactly the kind of tabela that loses a reader's trust.
const rows: { label: string; cells: [Cell, Cell, Cell, Cell, Cell]; win?: number[] }[] = [
  {
    label: 'Widzisz gotową stronę, zanim zapłacisz',
    cells: [mark('yes'), mark('partial'), mark('partial'), mark('no'), mark('no')],
  },
  {
    label: 'Pierwsza wersja w 24 godziny',
    cells: [mark('yes'), mark('no'), mark('partial'), mark('no'), mark('no')],
  },
  {
    label: 'Cała Twoja rola to dwa rekordy DNS i podpis',
    cells: [mark('yes'), mark('no'), mark('no'), mark('yes'), mark('partial')],
  },
  {
    label: 'Panel ofert nieruchomości po polsku',
    cells: [mark('yes'), mark('partial'), mark('no'), mark('yes'), mark('depends')],
  },
  {
    label: 'Agent AI nauczony Twoich ofert',
    cells: [mark('yes'), mark('no'), mark('partial'), mark('no'), mark('no')],
  },
  {
    label: 'Poprawki bez limitu do akceptacji',
    cells: [mark('yes'), mark('no'), mark('no'), mark('no'), mark('no')],
  },
  {
    label: 'Techniczne SEO i przygotowanie pod wyszukiwarki AI',
    cells: [mark('yes'), mark('partial'), mark('no'), mark('yes'), mark('partial')],
  },
  {
    label: 'Lighthouse 90+ na starcie',
    cells: [mark('yes'), mark('partial'), mark('partial'), mark('yes'), mark('depends')],
  },
  {
    label: 'Wiadomo, kto odbierze telefon za pół roku',
    cells: [mark('yes'), mark('no'), mark('no'), mark('partial'), mark('no')],
  },
  {
    label: 'Koszt startowy',
    cells: [
      text('1997–3099 zł jednorazowo'),
      text('od ok. 300 zł rocznie + Twój czas'),
      text('ok. 100 zł mies. → ok. 1500 zł rocznie'),
      text('zwykle od 8000 zł'),
      text('zwykle 2000–6000 zł'),
    ],
    win: [1],
  },
  {
    label: 'Twój czas potrzebny na projekt',
    cells: [
      text('ok. 1 godzina'),
      text('kilkadziesiąt godzin'),
      text('kilkadziesiąt godzin'),
      text('kilka godzin spotkań'),
      text('kilka godzin'),
    ],
  },
]

const markLabel: Record<MarkCell['v'], string> = {
  yes: 'tak',
  no: 'nie',
  partial: 'częściowo',
  depends: 'zależy od wykonawcy',
}

const Mark = ({ v }: { v: MarkCell['v'] }) => {
  if (v === 'yes') return <PiCheckBold size={17} className="mark mark--yes" aria-label={markLabel.yes} />
  if (v === 'no') return <PiXBold size={17} className="mark mark--no" aria-label={markLabel.no} />
  if (v === 'partial') return <PiMinusBold size={17} className="mark mark--partial" aria-label={markLabel.partial} />
  return <PiQuestionBold size={17} className="mark mark--depends" aria-label={markLabel.depends} />
}

export default function Przewagi() {
  return (
    <section id="przewagi" className="section-shell defer-paint">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">Dlaczego my</span>
          <h2 className="section-title">Pięć dróg do strony. Cztery z nich już znasz.</h2>
          <p className="section-copy">
            Nie wygrywamy każdego wiersza — kreator jest tańszy, jeśli masz czas, a generator AI
            kosztuje mało na start i około 1500 zł rocznie, gdy doliczyć abonament i całą resztę.
            Wygrywamy tam, gdzie to naprawdę się liczy: czasem, jakością i tym, jak mało pracy
            zostaje po Twojej stronie.
          </p>
        </div>

        <div className="compare-wrap" data-fade-in data-scene data-scene-marks="tbody .compare__own" data-scene-from="0.7">
          <div className="compare-scroll" tabIndex={0} role="group" aria-label="Tabela porównania, przewijana w poziomie">
          <table className="compare">
            <caption className="sr-only">Porównanie Getbuild z kreatorem, generatorem AI, agencją i freelancerem</caption>
            <thead>
              <tr>
                <th scope="col">Co jest ważne dla agenta</th>
                {cols.map((c, i) => (
                  <th key={c} scope="col" className={i === 0 ? 'compare__own' : undefined}>
                    {i === 0 ? <span className="compare__badge">To my</span> : null}
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const winners = r.win ?? [0]
                return (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {r.cells.map((c, i) => {
                      const isOwn = i === 0
                      const isWin = winners.includes(i)
                      const cls = [isOwn ? 'compare__own' : '', isWin ? (isOwn ? 'compare__win' : 'compare__win compare__win--alt') : '']
                        .filter(Boolean)
                        .join(' ')
                      return (
                        <td key={cols[i]} className={cls || undefined}>
                          {c.kind === 'mark' ? <Mark v={c.v} /> : <span className="tnum compare__text">{c.v}</span>}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>
        </div>

        <p className="compare__hint" aria-hidden="true">
          <PiArrowsHorizontalBold size={13} /> przesuń tabelę w bok
        </p>

        <p className="compare__legend">
          <PiCheckBold size={14} className="mark mark--yes" aria-hidden="true" /> tak
          <PiMinusBold size={14} className="mark mark--partial" aria-hidden="true" /> częściowo
          <PiQuestionBold size={14} className="mark mark--depends" aria-hidden="true" /> zależy od wykonawcy
          <PiXBold size={14} className="mark mark--no" aria-hidden="true" /> zwykle nie
        </p>

        <p className="compare__verdict">
          <span className="serif-accent">
            Kreator jest tańszy. Agencja jest większa. My jesteśmy jedyni, którzy pokażą Ci gotową
            stronę, zanim poproszą o pieniądze.
          </span>
        </p>
      </div>
    </section>
  )
}
