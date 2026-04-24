'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto max-w-7xl rounded-[22px] border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border-white/12 bg-[#040d1b]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_64px_rgba(0,0,0,0.38),0_6px_18px_rgba(0,0,0,0.22)] backdrop-blur-2xl'
            : 'border-white/8 bg-[#040d1b]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" className="h-10 w-10 flex-shrink-0 rounded-xl object-contain" style={{filter:'invert(1)',mixBlendMode:'screen'}} />
            <div className="min-w-0">
              <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.22em] text-white">
                Nexten Group
              </div>
              <div className="truncate text-[11px] uppercase tracking-[0.18em] text-white/38">
                Strony WWW i automatyzacje AI
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-[#8aa3c4] transition-colors duration-200 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#kontakt"
              className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              Darmowa wizualizacja
            </a>
            <button
              type="button"
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              onClick={() => setOpen(prev => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-4 rounded-[20px] border border-white/10 bg-[#040e1e]/96 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:hidden">
            <div className="flex flex-col gap-2">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-transparent px-4 py-3 text-sm text-[#dbe9ff] transition-colors duration-200 hover:border-white/8 hover:bg-white/[0.03]"
                >
                  {label}
                </a>
              ))}
            </div>

            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 inline-flex w-full justify-center px-5 py-3 text-sm"
            >
              Umów rozmowę
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
