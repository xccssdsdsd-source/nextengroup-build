'use client'

import { PiListBold, PiXBold } from 'react-icons/pi'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'
import { subscribeScroll } from '@/lib/scrollTicker'

const allLinks: readonly (readonly [string, string])[] = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['Pakiety', '#pakiety'],
  ['FAQ', '#faq'],
]

const linkClass = 'nav-link text-[12.5px] font-medium text-[var(--ink)]'
const mobileLinkClass = 'nav-mobile-link-tap rounded-xl px-4 py-2.5 text-[14px] font-medium text-[var(--ink)] transition-colors duration-150 hover:bg-[var(--bg-surface)] hover:text-[var(--brand)]'

const CTA_LABEL = 'Zobacz wizualizację'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

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
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Two nav states driven off one shared ticker: a denser material past the
  // fold, and a dark variant whenever a navy section sits under the pills —
  // white-on-navy read as pasted on, and page content used to run visibly
  // through the gaps between the islands.
  // One shared ticker drives four things that all depend on scroll position:
  // the denser past-the-fold material, the dark variant over navy panels, the
  // read-progress hairline, and which pill is marked as current.
  useEffect(() => {
    const root = document.documentElement
    let scrolled: boolean | null = null
    let dark: boolean | null = null
    let current: string | null = null
    let lastProgress = -1

    const update = () => {
      const isScrolled = window.scrollY > 40
      if (isScrolled !== scrolled) {
        scrolled = isScrolled
        root.dataset.navScrolled = String(isScrolled)
      }

      const probe = 44
      let isDark = false
      const panels = document.querySelectorAll<HTMLElement>('.section-shell--navy')
      for (const panel of panels) {
        const rect = panel.getBoundingClientRect()
        if (rect.top <= probe && rect.bottom >= probe) {
          isDark = true
          break
        }
      }
      if (isDark !== dark) {
        dark = isDark
        root.dataset.navOver = isDark ? 'dark' : 'light'
      }

      const bar = progressRef.current
      if (bar) {
        const span = document.documentElement.scrollHeight - window.innerHeight
        const p = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0
        if (Math.abs(p - lastProgress) > 0.0015) {
          lastProgress = p
          bar.style.transform = `scaleX(${p.toFixed(4)})`
        }
      }

      // The section that owns the upper third of the viewport is the one the
      // reader is actually in — measuring against the very top marks the next
      // section current while its heading is still off screen.
      const line = window.innerHeight * 0.34
      let found: string | null = null
      for (const [, href] of allLinks) {
        const el = document.getElementById(href.slice(1))
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) {
          found = href
          break
        }
      }
      if (found !== current) {
        current = found
        setActive(found)
      }
    }

    update()
    const unsubscribe = subscribeScroll(update)
    window.addEventListener('resize', update)
    return () => {
      unsubscribe()
      window.removeEventListener('resize', update)
      delete root.dataset.navScrolled
      delete root.dataset.navOver
    }
  }, [])

  return (
    <>
      <div
        className={`nav-scrim${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="nav-veil" aria-hidden="true" />
      <div className="nav-read" aria-hidden="true">
        <span ref={progressRef} className="nav-read__bar" />
      </div>
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
          <a href="/" className="nav-island flex max-w-[calc(100vw-5.75rem)] min-w-0 items-center gap-2 rounded-full py-2 pl-2 pr-3 sm:gap-3 sm:pr-4">
            <Image src="/getbuild-logo.webp" alt="Getbuild" width={36} height={36} className="h-9 w-9 flex-shrink-0 rounded-full object-contain" priority />
            <div className="min-w-0">
              <div className="truncate font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--ink)] sm:text-sm sm:tracking-[0.2em]" style={{ fontFamily: 'var(--font-heading)' }}>Getbuild.pl</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2.5 lg:flex">
            {allLinks.map(([label, href]) =>
              href.startsWith('#') ? (
                <a
                  key={href}
                  href={anchorHref(href)}
                  onClick={(e) => handleAnchorClick(e, href)}
                  className={`nav-island nav-pill rounded-full px-4 py-2.5 ${linkClass}`}
                  aria-current={active === href ? 'true' : undefined}
                >
                  {label}
                </a>
              ) : (
                <Link key={href} href={href} className={`nav-island nav-pill rounded-full px-4 py-2.5 ${linkClass}`}>
                  {label}
                </Link>
              )
            )}
          </div>

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            {/* The wrapper owns the breakpoint: a bare `.btn` in globals.css
                outranks Tailwind's `hidden` utility, so the anchor cannot hide
                itself. */}
            <span className="hidden sm:block">
              <a
                href={anchorHref('#kontakt')}
                onClick={(e) => handleAnchorClick(e, '#kontakt')}
                className="btn btn-primary btn-sheen nav-tap nav-cta h-[52px] flex-none px-5 py-2 text-[13px]"
              >
                {CTA_LABEL}
              </a>
            </span>
            <button
              type="button"
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              onClick={() => setOpen(prev => !prev)}
              className="nav-island inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--bg-surface)] lg:hidden"
            >
              <span key={open ? 'close' : 'open'} className="nav-icon-swap inline-flex">
                {open ? <PiXBold size={17} /> : <PiListBold size={17} />}
              </span>
            </button>
          </div>

          {/* Mobile menu */}
          <div className={`nav-mobile-menu absolute inset-x-0 top-full overflow-hidden lg:hidden${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
            <div className="mt-3 rounded-2xl border border-[var(--line)] bg-white p-3">
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
              <div className="mt-2 border-t border-[var(--line)] pt-2">
                <a
                  href={anchorHref('#kontakt')}
                  onClick={(e) => handleAnchorClick(e, '#kontakt')}
                  className="btn btn-primary btn-sheen nav-tap flex w-full justify-center px-5 py-3 text-sm"
                  style={{ transitionDelay: open ? `${allLinks.length * 0.055}s` : '0s' }}
                >
                  {CTA_LABEL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
