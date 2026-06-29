'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const anchorLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
] as const

const allLinks: readonly (readonly [string, string])[] = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
]

const linkClass = 'nav-link text-[12.5px] font-medium text-[#EAF0F7]'
const mobileLinkClass = 'rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#EAF0F7] transition-colors duration-150 hover:bg-[rgba(255,255,255,0.06)] hover:text-[#EAF0F7]'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const pathname = usePathname()
  const isHome = pathname === '/'

  // Anchor links work as smooth-scroll on the page that contains the target
  // section, and navigate to the home page anchor (/#section) otherwise.
  const anchorHref = (href: string) => (isHome ? href : `/${href}`)

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) {
      // Not on the home page — allow navigation to /#section.
      setOpen(false)
      return
    }
    event.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToSection(href.slice(1)), 60)
  }

  useEffect(() => {
    if (window.location.hash.length > 1) {
      const id = decodeURIComponent(window.location.hash.slice(1))
      setTimeout(() => scrollToSection(id), 120)
    }
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="nav-island flex min-w-0 items-center gap-3 rounded-full py-2 pl-2 pr-4">
            <Image src="/getbuild-logo.webp" alt="Getbuild" width={36} height={36} className="flex-shrink-0 rounded-full object-contain" priority />
            <div className="min-w-0">
              <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.2em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>Getbuild.pl</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2.5 lg:flex">
            {allLinks.map(([label, href]) =>
              href.startsWith('#') ? (
                <a key={href} href={anchorHref(href)} onClick={(e) => handleAnchorClick(e, href)} className={`nav-island rounded-full px-4 py-2.5 ${linkClass}`}>
                  {label}
                </a>
              ) : (
                <Link key={href} href={href} className={`nav-island rounded-full px-4 py-2.5 ${linkClass}`}>
                  {label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={anchorHref('#kontakt')}
              onClick={(e) => handleAnchorClick(e, '#kontakt')}
              className="btn btn-primary nav-tap !hidden px-5 py-2 text-[13px] sm:!inline-flex flex items-center gap-1.5 whitespace-nowrap"
              style={{ minWidth: 'auto' }}
            >
              <span className="inline-flex items-center">
                Umów spotkanie
              </span>
            </a>
            <button
              type="button"
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              onClick={() => setOpen(prev => !prev)}
              className="nav-island inline-flex h-11 w-11 items-center justify-center rounded-full text-[#EAF0F7] transition-colors hover:bg-[rgba(255,255,255,0.06)] lg:hidden"
            >
              <span key={open ? 'close' : 'open'} className="nav-icon-swap inline-flex">
                {open ? <X size={17} /> : <Menu size={17} />}
              </span>
            </button>
          </div>

          {/* Mobile menu */}
          <div className={`nav-mobile-menu absolute inset-x-0 top-full overflow-hidden lg:hidden${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
            <div className="mt-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#11161F] p-3">
              <div className="flex flex-col gap-1">
                {allLinks.map(([label, href], i) =>
                  href.startsWith('#') ? (
                    <a
                      key={href}
                      href={anchorHref(href)}
                      onClick={(e) => handleAnchorClick(e, href)}
                      className={`nav-mobile-link ${mobileLinkClass}`}
                      style={{ transitionDelay: open ? `${i * 0.055}s` : '0s' }}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link key={href} href={href} onClick={() => setOpen(false)} className={mobileLinkClass}>
                      {label}
                    </Link>
                  )
                )}
              </div>
              <div className="mt-2 border-t border-[rgba(255,255,255,0.06)] pt-2">
                <a
                  href={anchorHref('#kontakt')}
                  onClick={(e) => handleAnchorClick(e, '#kontakt')}
                  className="btn btn-primary nav-tap inline-flex w-full justify-center px-5 py-3 text-sm"
                >
                  Umów rozmowę
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

