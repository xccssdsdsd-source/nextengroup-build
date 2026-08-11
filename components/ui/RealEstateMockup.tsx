import styles from './RealEstateMockup.module.css'

type Photo = { src?: string; tone: 'phA' | 'phB' | 'phC' }

const Frame = ({ photo, className }: { photo: Photo; className?: string }) => (
  <div className={`${styles.ph} ${styles[photo.tone]} ${className ?? ''}`}>
    {photo.src ? <img src={photo.src} alt="" loading="lazy" decoding="async" /> : null}
  </div>
)

const listings = [
  { price: '2 450 000 zł', addr: 'Sopot, Dolny Sopot', area: '184 m²', rooms: '5 pokoi', plot: '620 m²', tone: 'phA' as const, tag: 'Nowa' },
  { price: '1 890 000 zł', addr: 'Gdynia, Orłowo', area: '132 m²', rooms: '4 pokoje', plot: '410 m²', tone: 'phB' as const, tag: null },
  { price: '3 120 000 zł', addr: 'Gdańsk, Oliwa', area: '226 m²', rooms: '6 pokoi', plot: '880 m²', tone: 'phC' as const, tag: 'Sprzedane' },
]

export default function RealEstateMockup({ photos = {} }: { photos?: Record<string, string> }) {
  const p = (key: string, tone: Photo['tone']): Photo => ({ src: photos[key], tone })

  return (
    <div className={styles.screen}>
      <div className={styles.bar}>
        <span className={styles.dot} style={{ background: '#ff5f57' }} />
        <span className={styles.dot} style={{ background: '#febc2e' }} />
        <span className={styles.dot} style={{ background: '#28c840' }} />
        <div className={styles.urlbar}>
          <svg className={styles.lock} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          atrium-nieruchomosci.pl
        </div>
      </div>

      <div className={styles.viewport}>
      <div className={styles.track} data-scrub-track>
        <section className={styles.panel}>
          <div className={styles.nav}>
            <div className={styles.navLinks}><span>Oferty</span><span>O nas</span><span>Sprzedaj</span></div>
            <div className={styles.brand}>Atrium</div>
            <div className={`${styles.navLinks} ${styles.navRight}`}><span>Kontakt</span><span>PL</span></div>
          </div>
          <div className={styles.heroWrap}>
            <h1 className={styles.heroTitle}>Domy i apartamenty<br />na Wybrzeżu</h1>
            <p className={styles.heroSub}>Sopot · Gdynia · Gdańsk — wybrane nieruchomości z rynku wtórnego i pierwotnego</p>
            <div className={styles.heroCta}>Zobacz oferty <span>(48)</span></div>
          </div>
          <div className={styles.gallery}>
            <Frame photo={p('side1', 'phB')} className={styles.gallerySide} />
            <Frame photo={p('hero', 'phA')} className={styles.galleryMain} />
            <Frame photo={p('side2', 'phC')} className={styles.gallerySide} />
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.sectionRow}>
            <h2 className={styles.sectionTitle}>Aktualne oferty</h2>
            <div className={styles.filters}>
              <span className={`${styles.filter} ${styles.filterOn}`}>Wszystkie</span>
              <span className={styles.filter}>Domy</span>
              <span className={styles.filter}>Apartamenty</span>
              <span className={styles.filter}>Działki</span>
            </div>
          </div>
          <div className={styles.grid}>
            {listings.map((l) => (
              <article key={l.addr} className={styles.listing}>
                <div className={styles.listingImg}>
                  <Frame photo={p(l.addr, l.tone)} className={styles.listingImg} />
                  {l.tag ? <span className={`${styles.badge} ${l.tag === 'Sprzedane' ? styles.badgeSold : ''}`}>{l.tag}</span> : null}
                </div>
                <div className={styles.listingBody}>
                  <div className={styles.price}>{l.price}</div>
                  <div className={styles.addr}>{l.addr}</div>
                  <div className={styles.specs}><span>{l.area}</span><span>{l.rooms}</span><span>dz. {l.plot}</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.detail}>
            <div>
              <Frame photo={p('detail', 'phA')} className={styles.detailImg} />
              <div className={styles.detailThumbs}>
                <Frame photo={p('t1', 'phB')} className={styles.detailThumb} />
                <Frame photo={p('t2', 'phC')} className={styles.detailThumb} />
                <Frame photo={p('t3', 'phA')} className={styles.detailThumb} />
              </div>
            </div>
            <div>
              <div className={styles.detailPrice}>2 450 000 zł</div>
              <div className={styles.detailAddr}>Sopot, Dolny Sopot · ul. Grunwaldzka</div>
              <div className={styles.specGrid}>
                <div><div className={styles.specKey}>Powierzchnia</div><div className={styles.specVal}>184 m²</div></div>
                <div><div className={styles.specKey}>Działka</div><div className={styles.specVal}>620 m²</div></div>
                <div><div className={styles.specKey}>Pokoje</div><div className={styles.specVal}>5</div></div>
                <div><div className={styles.specKey}>Rok budowy</div><div className={styles.specVal}>2019</div></div>
              </div>
              <div className={styles.agent}>
                <span className={styles.agentInitials} aria-hidden="true">AK</span>
                <div>
                  <div className={styles.agentName}>Anna Kowalczyk</div>
                  <div className={styles.agentRole}>Agent prowadzący · lic. 21847</div>
                </div>
              </div>
              <div className={styles.detailCta}>Umów prezentację</div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  )
}
