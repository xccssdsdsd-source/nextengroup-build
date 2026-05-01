const footerLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 px-6 py-12 sm:px-8 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(26,111,255,0.14),transparent_44%),radial-gradient(ellipse_at_8%_60%,rgba(0,212,255,0.06),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_8%,rgba(0,212,255,0.55)_50%,transparent_92%)]" />
      <div className="absolute inset-x-[22%] top-0 h-px blur-sm bg-[rgba(0,212,255,0.28)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-10 w-10 rounded-xl object-contain" style={{filter:'invert(1)',mixBlendMode:'screen'}} />
          <div>
            <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-white">
              Nexten Group
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#7f98b8]">
              Strony WWW i AI
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[#8aa3c4] transition-colors duration-200 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="text-sm text-[#7f98b8]">
          © {new Date().getFullYear()} Nexten Group. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
