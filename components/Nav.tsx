'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const allLinks: readonly (readonly [string, string])[] = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
]

const linkClass = 'nav-link text-[12.5px] font-medium text-[#EAF0F7]'
const mobileLinkClass = 'rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#EAF0F7] transition-colors duration-150 hover:bg-[rgba(255,255,255,0.06)] hover:text-[#EAF0F7]'

const ctaLabels = [
  'Umów konsultację',
  'Bezpłatna konsultacja',
  'Umów krótką rozmowę',
  'Zobacz wizualizację',
  'Zapytaj o projekt',
  'Sprawdź możliwości',
] as const

// Measures against a hidden mirror rather than toggling the real button's
// own width to 'auto' — flipping the live element to 'auto' and forcing a
// reflow to read it back flushes 'auto' as a real transition keyframe,
// which breaks the CSS width transition and makes the button snap instead
// of growing/shrinking smoothly with the typing animation.
const useAutoWidth = (
  ref: React.RefObject<HTMLElement | null>,
  mirrorRef: React.RefObject<HTMLElement | null>,
  dep: unknown,
) => {
  useLayoutEffect(() => {
    const el = ref.current
    const mirror = mirrorRef.current
    if (!el || !mirror) return
    el.style.width = `${mirror.offsetWidth}px`
  }, [dep, ref, mirrorRef])
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [displayText, setDisplayText] = useState<string>(ctaLabels[0])
  const desktopCtaRef = useRef<HTMLAnchorElement>(null)
  const mobileCtaRef = useRef<HTMLAnchorElement>(null)
  const desktopCtaMirrorRef = useRef<HTMLSpanElement>(null)
  const mobileCtaMirrorRef = useRef<HTMLSpanElement>(null)

  useAutoWidth(desktopCtaRef, desktopCtaMirrorRef, displayText)
  useAutoWidth(mobileCtaRef, mobileCtaMirrorRef, open ? displayText : null)

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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const typingMs = 108
    const deletingMs = 72
    const holdMs = 2250
    let labelIndex = 0
    let timer = 0
    let cancelled = false

    const schedule = (callback: () => void, delay: number) => {
      timer = window.setTimeout(callback, delay)
    }
    const type = (position: number) => {
      if (cancelled) return
      const label = ctaLabels[labelIndex]
      setDisplayText(label.slice(0, position))
      if (position < label.length) schedule(() => type(position + 1), typingMs)
      else schedule(() => remove(label.length), holdMs)
    }
    const remove = (position: number) => {
      if (cancelled) return
      const label = ctaLabels[labelIndex]
      setDisplayText(label.slice(0, position))
      if (position > 1) schedule(() => remove(position - 1), deletingMs)
      else {
        labelIndex = (labelIndex + 1) % ctaLabels.length
        schedule(() => type(1), deletingMs)
      }
    }

    schedule(() => remove(ctaLabels[0].length), holdMs)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
          <a href="/" className="nav-island flex max-w-[calc(100vw-5.75rem)] min-w-0 items-center gap-2 rounded-full py-2 pl-2 pr-3 sm:gap-3 sm:pr-4">
            <Image src="/getbuild-logo.webp" alt="Getbuild" width={36} height={36} className="h-9 w-9 flex-shrink-0 rounded-full object-contain" priority />
            <div className="min-w-0">
              <div className="truncate font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-[#EAF0F7] sm:text-sm sm:tracking-[0.2em]" style={{ fontFamily: 'var(--font-heading)' }}>Getbuild.pl</div>
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

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            <div className="nav-cta-slot hidden sm:flex">
              <a
                ref={desktopCtaRef}
                href={anchorHref('#kontakt')}
                onClick={(e) => handleAnchorClick(e, '#kontakt')}
                className="btn btn-primary nav-tap nav-cta nav-cta--auto nav-cta--desktop inline-flex h-[52px] flex-none items-center justify-center whitespace-nowrap px-5 py-2 text-[13px]"
                aria-label="Przejdź do kontaktu"
              >
                <span className="inline-flex items-center whitespace-nowrap" aria-hidden="true">
                  {displayText}
                  <span className="typing-cursor" />
                </span>
              </a>
            </div>
            <span
              ref={desktopCtaMirrorRef}
              aria-hidden="true"
              className="btn btn-primary nav-cta nav-cta-measure pointer-events-none invisible !fixed left-0 top-0 -z-10 inline-flex h-[52px] items-center justify-center whitespace-nowrap px-5 py-2 text-[13px]"
            >
              {displayText}
              <span className="typing-cursor" />
            </span>
            <button
              type="button"
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              onClick={() => setOpen(prev => !prev)}
              className="nav-island inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[#EAF0F7] transition-colors hover:bg-[rgba(255,255,255,0.06)] lg:hidden"
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
              <div className="mt-2 flex justify-center border-t border-[rgba(255,255,255,0.06)] pt-2">
                <a
                  ref={mobileCtaRef}
                  href={anchorHref('#kontakt')}
                  onClick={(e) => handleAnchorClick(e, '#kontakt')}
                  className="btn btn-primary nav-tap nav-cta nav-cta--auto inline-flex justify-center px-5 py-3 text-sm"
                  aria-label="Przejdź do kontaktu"
                >
                  <span className="inline-flex items-center whitespace-nowrap" aria-hidden="true">
                    {displayText}
                    <span className="typing-cursor" />
                  </span>
                </a>
                <span
                  ref={mobileCtaMirrorRef}
                  aria-hidden="true"
                  className="btn btn-primary nav-cta pointer-events-none invisible !fixed left-0 top-0 -z-10 inline-flex justify-center whitespace-nowrap px-5 py-3 text-sm"
                >
                  {displayText}
                  <span className="typing-cursor" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
