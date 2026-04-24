const footerLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
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

        <p className="text-sm text-[#8aa3c4]">
          © {new Date().getFullYear()} Nexten Group. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
