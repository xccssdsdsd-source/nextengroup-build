import Image from 'next/image'
import Link from 'next/link'

const cols = [
  {
    title: 'Oferta',
    links: [
      ['Strony WWW', '/strony-www'],
      ['Agenci AI', '/agenci-ai'],
      ['Realizacje', '/realizacje'],
      ['Pakiety', '#pakiety'],
    ],
  },
  {
    title: 'Wiedza',
    links: [
      ['Blog', '/blog'],
      ['Wiedza AI', '/wiedza-ai'],
      ['Audyt SEO', '/audyt-seo'],
      ['SEO dla firm', '/seo-dla-firm'],
    ],
  },
  {
    title: 'Formalne',
    links: [
      ['Polityka prywatności', '/polityka-prywatnosci'],
      ['Regulamin', '/regulamin'],
    ],
  },
]

export default function Stopka() {
  return (
    <footer className="footer">
      <div className="container footer__inner" data-fade-in>
        <div className="footer__brand">
          <Image src="/getbuild-logo.webp" alt="Getbuild" width={36} height={36} className="footer__logo" />
          <p className="t-small footer__tag">
            Strony i panele ofert dla agentów nieruchomości. Wizualizacja w 24 godziny,
            płatność po Twoim „tak”.
          </p>
        </div>

        <nav className="footer__cols" aria-label="Stopka">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="footer__col-title">{c.title}</h2>
              <ul>
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    {href.startsWith('#')
                      ? <a href={href}>{label}</a>
                      : <Link href={href}>{label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="container footer__bottom">
        <span className="t-small">© {new Date().getFullYear()} Getbuild.pl</span>
        <a className="t-small" href="mailto:getbuild.pl@gmail.com">getbuild.pl@gmail.com</a>
      </div>
    </footer>
  )
}
