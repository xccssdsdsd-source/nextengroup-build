'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-300"
      style={scrolled ? {
        background: 'rgba(2,8,16,0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #1a6fff)', color: '#020810', fontFamily: 'var(--font-syne)' }}
          >
            N
          </div>
          <span className="font-syne font-800 text-sm tracking-widest text-[#e8f0ff] uppercase" style={{ fontWeight: 800 }}>
            Next Group
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[['Usługi', '#uslugi'], ['Realizacje', '#portfolio'], ['Opinie', '#opinie'], ['FAQ', '#faq']].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-figtree text-[#4a6080] hover:text-[#e8f0ff] transition-colors duration-200 relative group"
              style={{ fontWeight: 400 }}
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00d4ff] group-hover:w-full transition-[width] duration-300" />
            </a>
          ))}
        </div>

        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-[#00d4ff] border border-[#00d4ff]/40 hover:bg-[#00d4ff]/08 transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-syne)',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          }}
        >
          Bezpłatny projekt →
        </a>
      </div>
    </nav>
  )
}
