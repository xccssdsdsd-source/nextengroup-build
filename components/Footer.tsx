const footerLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

const footerLegal = [
  ['Polityka prywatności', '/polityka-prywatnosci'],
  ['Regulamin', '/regulamin'],
  ['Wiedza o AI', '/wiedza-ai'],
  ['LinkedIn', 'https://www.linkedin.com/company/getbuild'],
] as const

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 px-6 py-8 sm:px-8 sm:py-16 border-t border-white/6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.webp" alt="Getbuild agencja usług cyfrowych" className="h-9 w-9 rounded-lg object-contain" />
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                Getbuild
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/30">
                Agencja usług cyfrowych
              </div>
            </div>
          </div>
          <p className="text-[12px] leading-5 text-white/40">
            Projektujemy i wdrażamy rozwiązania IT. Tworzymy strony WWW, automatyzacje AI i agentów AI wspierających Twój biznes.
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-3">Nawigacja</p>
              <div className="space-y-2">
                {footerLinks.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-[13px] font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-3">Kontakt i prawne</p>
              <p className="text-[13px] text-white/40 mb-2">Polska</p>
              <div className="space-y-2">
                {footerLegal.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    target={label === 'LinkedIn' ? '_blank' : undefined}
                    rel={label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    className="block text-[13px] font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl border-t border-white/10 mt-10 pt-6">
        <p className="text-[12px] text-white/25">
          © {new Date().getFullYear()} Getbuild. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
