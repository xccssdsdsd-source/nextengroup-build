const footerLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

export default function Footer() {
  return (
    <footer className="border-t border-white/6 px-6 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00d4ff,#1a6fff)] font-sans text-sm font-bold text-[#04111b]">
            N
          </div>
          <div>
            <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-white">
              Nexten Group
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#6f88ab]">
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

        <p className="text-sm text-[#6f88ab]">
          © {new Date().getFullYear()} Nexten Group. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
