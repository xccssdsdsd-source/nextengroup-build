import s from './SiteMockups.module.css'

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9.5 18 20 6.5" /></svg>
)

const nav = ['Oferty', 'Zapytania', 'Kalendarz', 'Statystyki']

const offers = [
  { addr: 'Gdynia, Orłowo', spec: '132 m² · 4 pokoje', price: '1 890 000 zł', status: 'Aktywna', tone: '' },
  { addr: 'Gdańsk, Oliwa', spec: '226 m² · 6 pokoi', price: '3 120 000 zł', status: 'Rezerwacja', tone: s.pillHold },
  { addr: 'Gdynia, Redłowo', spec: '96 m² · 3 pokoje', price: '1 190 000 zł', status: 'Aktywna', tone: '' },
  { addr: 'Sopot, Kamienny Potok', spec: '74 m² · 3 pokoje', price: '985 000 zł', status: 'Sprzedane', tone: s.pillSold },
]

export const PanelMockup = () => (
  <div className={s.frame} aria-hidden="true">
    <div className={`${s.stage} ${s.stageWide}`}>
      <div className={s.bar}>
        <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
        <span className={s.url}>panel.twojastrona.pl</span>
      </div>

      <div className={s.panel}>
        <aside className={s.side}>
          <span className={s.sideBrand}><span className={s.sideMark} />Panel</span>
          <span className={s.sideNav}>
            {nav.map((n, i) => (
              <span key={n} className={`${s.navItem}${i === 0 ? ` ${s.navOn}` : ''}`}>
                <span className={s.navGlyph} />
                {n}
                {i === 1 ? <span className={s.navBadge}>3</span> : null}
              </span>
            ))}
          </span>
        </aside>

        <div className={s.main}>
          <div className={s.mainHead}>
            <span className={s.mainTitle}>Twoje oferty</span>
            <span className={s.addBtn}><span className={s.addPlus}>+</span>Dodaj ofertę<span className={s.ripple} /></span>
          </div>

          <div className={s.rowsWrap}>
            <div className={s.rows}>
              <div className={`${s.row} ${s.rowNew}`}>
                <span className={s.rowThumb} />
                <span className={s.rowMain}>
                  <span className={s.rowAddr}>Sopot, Dolny Sopot</span>
                  <span className={s.rowSpec}>184 m² · 5 pokoi</span>
                </span>
                <span className={s.rowPrice}>2 450 000 zł</span>
                <span className={s.pillWrap}>
                  <span className={`${s.pill} ${s.pillWork}`}>Publikowanie</span>
                  <span className={`${s.pill} ${s.pillLive}`}>Aktywna</span>
                </span>
              </div>

              {offers.map((o) => (
                <div key={o.addr} className={s.row}>
                  <span className={s.rowThumb} />
                  <span className={s.rowMain}>
                    <span className={s.rowAddr}>{o.addr}</span>
                    <span className={s.rowSpec}>{o.spec}</span>
                  </span>
                  <span className={s.rowPrice}>{o.price}</span>
                  <span className={s.pillWrap}><span className={`${s.pill} ${o.tone}`}>{o.status}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <svg className={s.cursor} viewBox="0 0 24 24" fill="#fff" stroke="#0b1220" strokeWidth="1.4" strokeLinejoin="round"><path d="M5 2.4 5 21.2 9.9 16.6 12.9 23.2 15.9 21.8 13 15.4 19.6 15.1Z" /></svg>
      </div>
    </div>
  </div>
)

const allOffers = [
  { price: '2 450 000 zł', spec: 'Sopot · 184 m²', tag: 'Nowa' },
  { price: '1 890 000 zł', spec: 'Orłowo · 132 m²', tag: null },
  { price: '780 000 zł', spec: 'Gdańsk · 52 m²', tag: null },
  { price: '3 120 000 zł', spec: 'Oliwa · 226 m²', tag: null },
  { price: '640 000 zł', spec: 'Gdynia · 44 m²', tag: null },
  { price: '2 780 000 zł', spec: 'Sopot · 198 m²', tag: null },
]

const housesOnly = [
  { price: '2 450 000 zł', spec: 'Sopot · 184 m²', tag: 'Nowa' },
  { price: '3 120 000 zł', spec: 'Oliwa · 226 m²', tag: null },
  { price: '1 890 000 zł', spec: 'Orłowo · 132 m²', tag: null },
  { price: '2 780 000 zł', spec: 'Sopot · 198 m²', tag: null },
  { price: '2 190 000 zł', spec: 'Redłowo · 168 m²', tag: null },
  { price: '1 640 000 zł', spec: 'Wrzeszcz · 141 m²', tag: null },
]

const Tile = ({ price, spec, tag }: { price: string; spec: string; tag: string | null }) => (
  <span className={s.tile}>
    <span className={s.thumb}>{tag ? <span className={s.tag}>{tag}</span> : null}</span>
    <span className={s.tPrice}>{price}</span>
    <span className={s.tSpec}>{spec}</span>
  </span>
)

export const CatalogMockup = () => (
  <div className={s.frame} aria-hidden="true">
    <div className={`${s.stage} ${s.stageWide}`}>
      <div className={s.bar}>
        <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
        <span className={s.url}>twojastrona.pl/oferty</span>
      </div>

      <div className={s.cat}>
        <div className={s.catHead}>
          <span className={s.catTitle}>Oferty</span>
          <span className={s.swap}>
            <span className={s.swapOut}>48 ofert</span>
            <span className={s.swapIn}>23 oferty</span>
          </span>
        </div>

        <div className={s.catFilters}>
          <span className={s.chips}>
            <span className={s.ink} />
            <span className={s.chip}>Wszystkie</span>
            <span className={s.chip}>Domy</span>
            <span className={s.chip}>Apartamenty</span>
            <span className={s.chip}>Działki</span>
          </span>
          <span className={s.range}>
            <span className={s.track}><span className={s.fill} /><span className={s.knob} /></span>
            <span className={s.swap}>
              <span className={s.swapOut}>do 5 mln</span>
              <span className={s.swapIn}>do 2,5 mln</span>
            </span>
          </span>
        </div>

        <div className={s.tilesWrap}>
          <div className={`${s.tiles} ${s.tilesOut}`}>
            {allOffers.map((o) => <Tile key={o.spec} {...o} />)}
          </div>
          <div className={`${s.tiles} ${s.tilesIn}`}>
            {housesOnly.map((o) => <Tile key={o.spec} {...o} />)}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const ChatMockup = () => (
  <div className={s.frame} aria-hidden="true">
    <div className={s.stage}>
      <div className={s.chatBar}>
        <span className={s.avatar}>AI</span>
        <span className={s.chatWho}>
          <span className={s.chatName}>Asystent Anny</span>
          <span className={s.chatStatus}><span className={s.live} />online · odpowiada od razu</span>
        </span>
      </div>

      <div className={s.chatBody}>
        <span className={`${s.msg} ${s.msgUser}`}>Czy ten dom w Orłowie ma garaż?</span>
        <span className={s.botCell}>
          <span className={`${s.msg} ${s.msgBot} ${s.msgBot1}`}>Tak — garaż na dwa auta i ogród 410 m².</span>
          <span className={s.typing}><i /><i /><i /></span>
        </span>
        <span className={`${s.msg} ${s.msgBot} ${s.msgBot2}`}>Mogę umówić oglądanie w sobotę o 12:00?</span>
        <span className={s.slot}>
          <span className={s.slotTick}><Check /></span>
          <span className={s.slotText}>
            <span className={s.slotWhen}>Sobota, 12:00</span>
            <span className={s.slotWhat}>Prezentacja w kalendarzu Anny</span>
          </span>
        </span>
      </div>

      <div className={s.chatInput}>
        Napisz wiadomość…
        <span className={s.send}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </div>
  </div>
)

export const FormMockup = () => (
  <div className={s.frame} aria-hidden="true">
    <div className={`${s.stage} ${s.form}`}>
      <div className={s.formHead}>
        <span className={s.formTitle}>Zapytaj o tę nieruchomość</span>
        <span className={s.formSub}>Odpowiadam osobiście, zwykle w godzinę.</span>
      </div>

      <div className={s.fields}>
        <span className={s.field}>
          <span className={s.fLabel}>Imię</span>
          <span className={`${s.fVal} ${s.type1}`}>Marta Nowak</span>
          <span className={`${s.ring} ${s.ring1}`} />
        </span>
        <span className={s.field}>
          <span className={s.fLabel}>Telefon</span>
          <span className={`${s.fVal} ${s.type2}`}>+48 601 204 118</span>
          <span className={`${s.ring} ${s.ring2}`} />
        </span>
        <span className={s.field}>
          <span className={s.fLabel}>Wiadomość</span>
          <span className={`${s.fVal} ${s.type3}`}>Czy mogę obejrzeć w sobotę?</span>
          <span className={`${s.ring} ${s.ring3}`} />
        </span>

        <span className={s.submit}>
          <span className={s.subIdle}>Wyślij zapytanie</span>
          <span className={s.subWait}><span className={s.spinner} />Wysyłam…</span>
          <span className={s.subDone}><Check />Wysłane</span>
        </span>
      </div>

      <span className={s.toast}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>
        Zapytanie na Twojej skrzynce
      </span>
    </div>
  </div>
)
