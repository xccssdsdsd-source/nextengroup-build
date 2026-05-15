const footerLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 px-6 py-14 sm:px-8 sm:py-16 border-t border-white/6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Getbuild.pl" className="h-9 w-9 rounded-lg object-contain" />
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ fontFamily: 'var(--font-syne)' }}>
              Getbuild.pl
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/30">
              Strony WWW & Automatyzacje
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="text-[12px] text-white/25">
          © {new Date().getFullYear()} Getbuild.pl. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
