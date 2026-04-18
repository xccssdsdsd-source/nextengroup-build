export default function Footer() {
  return (
    <footer
      className="px-6 py-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #1a6fff)', color: '#020810', fontFamily: 'var(--font-syne)' }}
          >
            N
          </div>
          <span
            className="font-syne text-xs tracking-widest text-[#4a6080] uppercase"
            style={{ fontWeight: 700 }}
          >
            Next Group
          </span>
        </div>

        <p
          className="text-xs text-[#4a6080]"
          style={{ fontFamily: 'var(--font-figtree)' }}
        >
          © {new Date().getFullYear()} Next Group. Wszelkie prawa zastrzeżone.
        </p>

        <div className="flex items-center gap-6">
          {[['Usługi', '#uslugi'], ['Portfolio', '#portfolio'], ['FAQ', '#faq'], ['Kontakt', '#kontakt']].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-xs text-[#4a6080] hover:text-[#e8f0ff] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
