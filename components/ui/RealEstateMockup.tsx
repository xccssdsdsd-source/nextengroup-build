import styles from './RealEstateMockup.module.css'

const Frame = ({ src, className }: { src?: string; className?: string }) => (
  <div className={`${styles.ph} ${className ?? ''}`} data-parallax>
    {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : null}
  </div>
)

const listings = [
  { price: '2 450 000', addr: 'Sopot, Dolny Sopot', specs: '184 m² · 5 pokoi · dz. 620 m²', tag: 'Nowa' },
  { price: '1 890 000', addr: 'Gdynia, Orłowo', specs: '132 m² · 4 pokoje · dz. 410 m²', tag: null },
  { price: '3 120 000', addr: 'Gdańsk, Oliwa', specs: '226 m² · 6 pokoi · dz. 880 m²', tag: 'Sprzedane' },
]

const spec = [
  ['Powierzchnia', '184 m²'],
  ['Działka', '620 m²'],
  ['Pokoje', '5'],
  ['Rok budowy', '2019'],
]

export default function RealEstateMockup({ photos = {} }: { photos?: Record<string, string> }) {
  return (
    <div className={styles.screen}>
      <div className={styles.bar} data-mock-bar>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <div className={styles.urlbar}>
          <svg className={styles.lock} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          atrium-nieruchomosci.pl
        </div>
      </div>

      <div className={styles.viewport}>
      <div className={styles.track} data-scrub-track>
        <section className={`${styles.panel} ${styles.panelHero}`}>
          <span className={styles.heroShotWrap} data-parallax>
            {photos.hero ? <img className={styles.heroShot} src={photos.hero} alt="" decoding="async" fetchPriority="high" /> : null}
          </span>
          <span className={styles.heroScrim} aria-hidden="true" />
          <div className={styles.navOver}>
            <div className={styles.navLinks}><span>Oferty</span><span>O nas</span><span>Sprzedaj</span></div>
            <div className={styles.brand}>Atrium</div>
            <div className={`${styles.navLinks} ${styles.navRight}`}><span>Kontakt</span><span>PL</span></div>
          </div>
          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}>Trójmiasto · rynek premium</span>
            <h1 className={styles.heroTitle}>Domy i apartamenty<br />na Wybrzeżu</h1>
            <div className={styles.heroFoot}>
              <span className={styles.heroCta}>Zobacz 48 ofert</span>
              <span className={styles.heroMeta}>Sopot · Gdynia · Gdańsk</span>
            </div>
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
                  <Frame src={photos[l.addr]} className={styles.listingShot} />
                  {l.tag ? <span className={`${styles.badge} ${l.tag === 'Sprzedane' ? styles.badgeSold : ''}`}>{l.tag}</span> : null}
                </div>
                <div className={styles.listingBody}>
                  <div className={styles.addr}>{l.addr}</div>
                  <div className={styles.price}>{l.price} <span>zł</span></div>
                  <div className={styles.specs}>{l.specs}</div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.gridFoot}>
            <span>Pokazane 3 z 48 ofert</span>
            <span className={styles.gridMore}>Zobacz wszystkie</span>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.detail}>
            <div className={styles.detailMedia}>
              <Frame src={photos.detail} className={styles.detailImg} />
              <div className={styles.detailThumbs}>
                <Frame src={photos.t1} className={styles.detailThumb} />
                <Frame src={photos.t2} className={styles.detailThumb} />
                <Frame src={photos.t3} className={styles.detailThumb} />
              </div>
            </div>
            <div className={styles.detailSide}>
              <span className={styles.detailTag}>Dom wolnostojący</span>
              <div className={styles.detailPrice}>2 450 000 <span>zł</span></div>
              <div className={styles.detailAddr}>Sopot, Dolny Sopot · ul. Grunwaldzka</div>
              <div className={styles.specGrid}>
                {spec.map(([k, v]) => (
                  <div key={k}>
                    <div className={styles.specKey}>{k}</div>
                    <div className={styles.specVal}>{v}</div>
                  </div>
                ))}
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
