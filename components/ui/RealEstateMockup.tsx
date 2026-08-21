import type { CSSProperties } from 'react'
import styles from './RealEstateMockup.module.css'

// Custom properties are not in React's CSSProperties, and the alternative —
// a class per depth — would put layout numbers in a stylesheet that cannot see
// which photograph it is describing.
const vars = (o: Record<string, string | number>) => o as CSSProperties

// `depth` is the layer's parallax multiplier and `step` its place in the
// reveal stagger; both are read by the hero's stylesheet, which owns the
// actual motion. A photograph the size of the frame may travel; a contact
// sheet of thumbnails may not, or the panel shears.
const Frame = ({
  src,
  className,
  depth = 1,
  step = 0,
}: {
  src?: string
  className?: string
  depth?: number
  step?: number
}) => (
  <div
    className={`${styles.ph} ${className ?? ''}`}
    data-parallax
    style={vars({ '--pz': depth, '--d': step })}
  >
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
      <div className={styles.bar}>
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
        <section className={`${styles.panel} ${styles.panelHero}`} data-rev="1">
          <span className={styles.heroShotWrap} data-parallax="bleed" style={vars({ '--pz': 1.5 })}>
            {photos.hero ? <img className={styles.heroShot} src={photos.hero} alt="" decoding="async" fetchPriority="high" /> : null}
          </span>
          <span className={styles.heroScrim} aria-hidden="true" />
          <div className={styles.navOver} data-rise style={vars({ '--d': 0 })}>
            <div className={styles.navLinks}><span>Oferty</span><span>O nas</span><span>Sprzedaj</span></div>
            <div className={styles.brand}>Atrium</div>
            <div className={`${styles.navLinks} ${styles.navRight}`}><span>Kontakt</span><span>PL</span></div>
          </div>
          <div className={styles.heroCopy}>
            <span className={styles.heroKicker} data-rise style={vars({ '--d': 1 })}>Trójmiasto · rynek premium</span>
            {/* Not an <h1>: this is a mock of a client site rendered inside our page.
                A real heading here gave the homepage two <h1>s and put "Domy i
                apartamenty na Wybrzeżu" into our own document outline. */}
            <div className={styles.heroTitle} data-rise style={vars({ '--d': 2 })}>Domy i apartamenty<br />na Wybrzeżu</div>
            <div className={styles.heroFoot} data-rise style={vars({ '--d': 3 })}>
              <span className={styles.heroCta}>Zobacz 48 ofert</span>
              <span className={styles.heroMeta}>Sopot · Gdynia · Gdańsk</span>
            </div>
          </div>
        </section>

        <section className={styles.panel} data-rev="2">
          {/* Deliberately not part of the reveal: the panel has to arrive
              carrying its own name, or a third of the screen is a blank sheet
              for the length of the move and the frame reads as broken. */}
          <div className={styles.sectionRow}>
            <div className={styles.sectionTitle}>Aktualne oferty</div>
            <div className={styles.filters}>
              <span className={`${styles.filter} ${styles.filterOn}`}>Wszystkie</span>
              <span className={styles.filter}>Domy</span>
              <span className={styles.filter}>Apartamenty</span>
              <span className={styles.filter}>Działki</span>
            </div>
          </div>
          <div className={styles.grid}>
            {listings.map((l, i) => (
              <article key={l.addr} className={styles.listing}>
                <div className={styles.listingImg}>
                  <Frame src={photos[l.addr]} className={styles.listingShot} depth={0.85} step={0.4 + i * 0.4} />
                  {/* The badge belongs to the photograph, not to the card: left
                      out of the reveal it hangs in mid-air over white paper
                      while the image under it is still uncovering. */}
                  {l.tag ? (
                    <span
                      className={`${styles.badge} ${l.tag === 'Sprzedane' ? styles.badgeSold : ''}`}
                      data-rise
                      style={vars({ '--d': 0.6 + i * 0.4 })}
                    >
                      {l.tag}
                    </span>
                  ) : null}
                </div>
                <div className={styles.listingBody} data-rise style={vars({ '--d': 0.7 + i * 0.4 })}>
                  <div className={styles.addr}>{l.addr}</div>
                  <div className={styles.price}>{l.price} <span>zł</span></div>
                  <div className={styles.specs}>{l.specs}</div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.gridFoot} data-rise style={vars({ '--d': 1.8 })}>
            <span>Pokazane 3 z 48 ofert</span>
            <span className={styles.gridMore}>Zobacz wszystkie</span>
          </div>
        </section>

        <section className={styles.panel} data-rev="3">
          <div className={styles.detail}>
            <div className={styles.detailMedia}>
              <Frame src={photos.detail} className={styles.detailImg} depth={1.2} />

              <div className={styles.detailThumbs}>
                <Frame src={photos.t1} className={styles.detailThumb} depth={0.45} step={0.8} />
                <Frame src={photos.t2} className={styles.detailThumb} depth={0.45} step={1} />
                <Frame src={photos.t3} className={styles.detailThumb} depth={0.45} step={1.2} />
              </div>
            </div>
            <div className={styles.detailSide}>
              <span className={styles.detailTag} data-rise style={vars({ '--d': 0.4 })}>Dom wolnostojący</span>
              <div className={styles.detailPrice} data-rise style={vars({ '--d': 0.7 })}>2 450 000 <span>zł</span></div>
              <div className={styles.detailAddr} data-rise style={vars({ '--d': 0.9 })}>Sopot, Dolny Sopot · ul. Grunwaldzka</div>
              <div className={styles.specGrid} data-rise style={vars({ '--d': 1.2 })}>
                {spec.map(([k, v]) => (
                  <div key={k}>
                    <div className={styles.specKey}>{k}</div>
                    <div className={styles.specVal}>{v}</div>
                  </div>
                ))}
              </div>
              <div className={styles.agent} data-rise style={vars({ '--d': 1.5 })}>
                <span className={styles.agentInitials} aria-hidden="true">AK</span>
                <div>
                  <div className={styles.agentName}>Anna Kowalczyk</div>
                  <div className={styles.agentRole}>Agent prowadzący · lic. 21847</div>
                </div>
              </div>
              <div className={styles.detailCta} data-rise style={vars({ '--d': 1.8 })}>Umów prezentację</div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  )
}
